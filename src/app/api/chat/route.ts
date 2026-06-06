export async function POST(request: Request) {
  const { messages } = await request.json();

  const ollamaUrl = process.env.OLLAMA_URL ?? "http://localhost:11434";

  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen2.5:3b",
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Ollama request failed" }, { status: 502 });
  }

  const data = await response.json();
  return Response.json({ message: data.message });
}
