export interface Cotacao {
  codigo: string
  nome: string
  valor: number // em relação ao BRL
}

const API_BASE = "https://economia.awesomeapi.com.br/json/last/"

// Lista de moedas disponíveis (código -> nome)
export const MOEDAS: Record<string, string> = {
  BRL: "Real Brasileiro",
  USD: "Dólar Americano",
  EUR: "Euro",
  GBP: "Libra Esterlina",
  ARS: "Peso Argentino",
  CAD: "Dólar Canadense",
  CHF: "Franco Suíço",
  CLP: "Peso Chileno",
  CNY: "Yuan Chinês",
  COP: "Peso Colombiano",
  JPY: "Iene Japonês",
  MXN: "Peso Mexicano",
  PEN: "Sol Peruano",
  PYG: "Guarani Paraguaio",
  UYU: "Peso Uruguaio",
  AUD: "Dólar Australiano",
  INR: "Rupia Indiana",
  KRW: "Won Sul-Coreano",
  SEK: "Coroa Sueca",
  BTC: "Bitcoin",
}

const MOEDAS_SLUG = Object.keys(MOEDAS).join(",")

export interface ResultadoConversao {
  valorOriginal: number
  moedaOrigem: string
  moedaDestino: string
  valorConvertido: number
  taxa: number
  data: string
  usaFallback: boolean
}

function taxaFallback(origem: string, destino: string): number {
  // Taxas fixas aproximadas (sem garantia de precisão) para fallback offline
  const taxasBRL: Record<string, number> = {
    USD: 5.25, EUR: 5.65, ARS: 0.016, CAD: 3.85,
    CHF: 5.85, CLP: 0.006, CNY: 0.72, COP: 0.0013,
    GBP: 6.65, JPY: 0.034, MXN: 0.28, PEN: 1.38,
    PYG: 0.0007, UYU: 0.13, AUD: 3.45, INR: 0.063,
    KRW: 0.0038, SEK: 0.48, BTC: 160000,
  }

  if (origem === destino) return 1
  if (origem === "BRL") return 1 / (taxasBRL[destino] ?? 1)
  if (destino === "BRL") return taxasBRL[origem] ?? 1

  const origemEmBRL = taxasBRL[origem] ?? 1
  const destinoEmBRL = taxasBRL[destino] ?? 1
  return origemEmBRL / destinoEmBRL
}

export async function converterMoeda(
  valor: number,
  moedaOrigem: string,
  moedaDestino: string
): Promise<ResultadoConversao> {
  if (moedaOrigem === moedaDestino) {
    return {
      valorOriginal: valor,
      moedaOrigem,
      moedaDestino,
      valorConvertido: valor,
      taxa: 1,
      data: new Date().toISOString(),
      usaFallback: true,
    }
  }

  try {
    // AwesomeAPI retorna pares com formato MOEDACODIGO (ex: USDBRL)
    const pair =
      moedaOrigem === "BRL"
        ? `${moedaDestino}-${moedaOrigem}`
        : `${moedaOrigem}-${moedaDestino}`

    const response = await fetch(`${API_BASE}${pair}`, {
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) throw new Error("Falha na API")

    const data = await response.json()

    // A API retorna a chave com o par (ex: "USDBRL")
    const key = pair.replace("-", "")
    const cotacao = data[key]

    if (!cotacao) throw new Error("Par não encontrado")

    const bid = Number.parseFloat(cotacao.bid)
    if (Number.isNaN(bid)) throw new Error("Valor inválido")

    // Se a origem é BRL, a taxa é 1 / bid (porque o par é MOEDACodigo)
    const taxa = moedaOrigem === "BRL" ? 1 / bid : bid

    return {
      valorOriginal: valor,
      moedaOrigem,
      moedaDestino,
      valorConvertido: valor * taxa,
      taxa,
      data: cotacao.create_date ?? new Date().toISOString(),
      usaFallback: false,
    }
  } catch {
    // Fallback offline com taxas fixas
    const taxa = taxaFallback(moedaOrigem, moedaDestino)
    return {
      valorOriginal: valor,
      moedaOrigem,
      moedaDestino,
      valorConvertido: valor * taxa,
      taxa,
      data: new Date().toISOString(),
      usaFallback: true,
    }
  }
}
