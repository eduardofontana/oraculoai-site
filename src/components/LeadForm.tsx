"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { trackFormSubmit } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Schema Zod                                                         */
/* ------------------------------------------------------------------ */
const leadSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .email("E-mail inválido.")
    .max(254, "E-mail muito longo."),
  whatsapp: z
    .string()
    .min(8, "WhatsApp inválido.")
    .max(20, "Número muito longo.")
    .transform((v) => v.replace(/[^\d+]/g, "")),
  empresa: z
    .string()
    .max(200, "Nome da empresa muito longo.")
    .optional()
    .or(z.literal("")),
  mensagem: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres.")
    .max(1000, "Mensagem muito longa."),
});

type FormData = z.infer<typeof leadSchema>;

type FieldErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  nome: "",
  email: "",
  whatsapp: "",
  empresa: "",
  mensagem: "",
};

export function LeadForm() {
  const router = useRouter();
  const [data, setData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    // Limpa o erro do campo ao digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    // Track event
    trackFormSubmit("lead_form");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Erro ao enviar." }));
        setErrors({ mensagem: err.error ?? "Erro ao enviar. Tente novamente." });
        setLoading(false);
        return;
      }
    } catch {
      setErrors({ mensagem: "Erro de conexão. Verifique sua internet." });
      setLoading(false);
      return;
    }

    setLoading(false);
    setData(initialForm);
    router.push("/obrigado");
  };

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
            className={`mt-1.5 w-full rounded-xl border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:ring-1 focus:ring-accent/30 ${errors.nome ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent-border"}`}
            placeholder="Seu nome completo"
          />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
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
            className={`mt-1.5 w-full rounded-xl border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:ring-1 focus:ring-accent/30 ${errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent-border"}`}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
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
            className={`mt-1.5 w-full rounded-xl border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:ring-1 focus:ring-accent/30 ${errors.whatsapp ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent-border"}`}
            placeholder="(11) 99999-9999"
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>}
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
          className={`mt-1.5 w-full resize-none rounded-xl border bg-surface-overlay px-4 py-3 text-sm text-primary placeholder-muted outline-none transition focus:ring-1 focus:ring-accent/30 ${errors.mensagem ? "border-red-500 focus:border-red-500" : "border-border focus:border-accent-border"}`}
          placeholder="Conte um pouco sobre seu projeto ou desafio..."
        />
        {errors.mensagem && <p className="mt-1 text-xs text-red-500">{errors.mensagem}</p>}
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
