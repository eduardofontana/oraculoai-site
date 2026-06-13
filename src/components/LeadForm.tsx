"use client";

import { useState, type FormEvent } from "react";
import { trackFormSubmit } from "@/lib/analytics";

type FormData = {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  mensagem: string;
};

const initialForm: FormData = {
  nome: "",
  email: "",
  whatsapp: "",
  empresa: "",
  mensagem: "",
};

export function LeadForm() {
  const [data, setData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Track event
    trackFormSubmit("lead_form");

    // Simulate submission (ready for webhook/API integration)
    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    setSubmitted(true);
    setData(initialForm);

    // Optional: prepare for API call
    // const res = await fetch("/api/leads", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-border bg-accent-soft p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl font-bold text-primary">Recebemos seu contato!</h3>
        <p className="mt-3 text-secondary">
          Nossa equipe retornará em até 24 horas pelo WhatsApp ou e-mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-primary">
            Nome <span className="text-accent">*</span>
          </label>
          <input
            id="nome"
            type="text"
            required
            value={data.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:border-accent-border focus:ring-1 focus:ring-accent/30"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-primary">
            E-mail <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:border-accent-border focus:ring-1 focus:ring-accent/30"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary">
            WhatsApp <span className="text-accent">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            required
            value={data.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:border-accent-border focus:ring-1 focus:ring-accent/30"
            placeholder="(11) 99999-9999"
          />
        </div>
        <div>
          <label htmlFor="empresa" className="block text-sm font-semibold text-primary">
            Empresa
          </label>
          <input
            id="empresa"
            type="text"
            value={data.empresa}
            onChange={(e) => handleChange("empresa", e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:border-accent-border focus:ring-1 focus:ring-accent/30"
            placeholder="Nome da sua empresa"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-semibold text-primary">
          Mensagem <span className="text-accent">*</span>
        </label>
        <textarea
          id="mensagem"
          required
          rows={3}
          value={data.mensagem}
          onChange={(e) => handleChange("mensagem", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-xl border border-border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:border-accent-border focus:ring-1 focus:ring-accent/30"
          placeholder="Conte um pouco sobre seu projeto ou desafio..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Enviando...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Solicitar Diagnóstico Gratuito
          </>
        )}
      </button>
    </form>
  );
}
