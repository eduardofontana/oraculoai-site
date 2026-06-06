import uuid
from collections import OrderedDict
from typing import Literal

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="OraculoAI Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "hermes"
MAX_HISTORY = 10_000  # max chars stored per session

SYSTEM_PROMPT = """Você é o assistente virtual da OraculoAI, uma agência digital premium.

## SOBRE A EMPRESA
- Nome: OraculoAI
- Slogan: Presença digital premium que vende, protege e escala.
- Atendimento: direto via WhatsApp, sem burocracia.
- Localização: atendimento remoto para Brasil e exterior.

## SERVIÇOS
1. Criação de Sites — Landing pages e sites institucionais com estética premium e foco em conversão.
2. Revenda Hostinger — Hospedagem, domínio, e-mail profissional com preço de revenda (menor que contratar direto).
3. Cybersecurity — Hardening, auditoria e proteção prática para sites e servidores.

## PREÇOS HOSPEDAGEM (REVENDA HOSTINGER)
- Start: R$ 39/mês — 1 site, 10 GB SSD, domínio grátis 1 ano, 5 e-mails, SSL
- Profissional: R$ 79/mês — 3 sites, 50 GB SSD, 20 e-mails, backup semanal, suporte prioritário
- Enterprise: R$ 149/mês — 10 sites, 200 GB NVMe, e-mails ilimitados, backup diário, migração assistida, suporte 24h

## DIFERENCIAIS
- Atendimento direto com o responsável técnico
- Parceiro oficial Hostinger (preço de revenda)
- Web, segurança e infraestrutura em um só lugar

## TOM DE VOZ
- Profissional e direto, mas amigável.
- Use português brasileiro.
- Seja objetivo e prático.
- Quando não souber responder algo específico, incentive contato via WhatsApp.

## REGRAS
- Sempre ofereça o WhatsApp como próximo passo: "Me chama no WhatsApp que resolvemos isso."
- O número de WhatsApp deve ser obtido com o cliente (não divulgue número público).
- Não invente informações que não estão acima.
- Se perguntarem sobre preços de sites, diga que depende do escopo e incentive contato via WhatsApp.
- Responda em no máximo 2-3 parágrafos.

Cliente: {messages}"""


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


sessions: dict[str, list[dict[str, str]]] = {}


def trim_history(history: list[dict[str, str]]) -> list[dict[str, str]]:
    total = sum(len(m["content"]) for m in history)
    while total > MAX_HISTORY and len(history) > 2:
        removed = history.pop(0)
        total -= len(removed["content"])
    return history


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    session_id = req.session_id or uuid.uuid4().hex[:12]

    if session_id not in sessions:
        sessions[session_id] = []

    sessions[session_id].append({"role": "user", "content": req.message})
    sessions[session_id] = trim_history(sessions[session_id])

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + sessions[session_id]

    try:
        async with httpx.AsyncClient(timeout=120) as client:
            resp = await client.post(
                OLLAMA_URL,
                json={"model": MODEL, "messages": messages, "stream": False},
            )
            resp.raise_for_status()
            reply = resp.json()["message"]["content"]
    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Ollama indisponível no VPS")
    except (KeyError, ValueError):
        raise HTTPException(status_code=502, detail="Resposta inválida do Ollama")

    sessions[session_id].append({"role": "assistant", "content": reply})

    return ChatResponse(reply=reply, session_id=session_id)


@app.get("/health")
async def health():
    return {"status": "ok"}
