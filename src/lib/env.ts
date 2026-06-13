export const env = {
  get HF_TOKEN() {
    const value = process.env.HF_TOKEN
    if (!value && typeof window === "undefined") {
      throw new Error(
        "[ENV] HF_TOKEN é obrigatória. Configure no arquivo .env ou no painel da Vercel.",
      )
    }
    return value ?? ""
  },
  get CONTACT_EMAIL() {
    return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ""
  },
} as const
