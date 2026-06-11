/**
 * Códigos das UFs para o 2º dígito verificador do Título de Eleitor.
 * Mapeia UF → código sequencial (1-27, com exceções para exterior = 28).
 */
const UF_CODIGOS: Record<string, number> = {
  "SP": 1, "MG": 2, "RJ": 3, "RS": 4, "PR": 5, "BA": 6,
  "SC": 7, "PE": 8, "CE": 9, "GO": 10, "MA": 11, "PB": 12,
  "PA": 13, "ES": 14, "PI": 15, "RN": 16, "AL": 17, "MT": 18,
  "MS": 19, "DF": 20, "SE": 21, "AM": 22, "RO": 23, "AC": 24,
  "AP": 25, "RR": 26, "TO": 27, "ZZ": 28, // Exterior
}

const CODIGO_UF: Record<number, string> = {}
for (const [uf, cod] of Object.entries(UF_CODIGOS)) {
  CODIGO_UF[cod] = uf
}

export const UFS = Object.keys(UF_CODIGOS).sort((a, b) => {
  if (a === "ZZ") return 1
  if (b === "ZZ") return -1
  return a.localeCompare(b)
})

function randInt(max: number): number {
  return Math.floor(Math.random() * (max + 1))
}

function gerarSequencia(): number[] {
  // Gera 8 dígitos para a sequência (até 99.999.999 por UF)
  const seq = Array.from({ length: 8 }, () => randInt(9))

  // Garante que não seja tudo zero
  let allZero = true
  for (let i = 0; i < seq.length; i++) {
    if (seq[i] !== 0) {
      allZero = false
      break
    }
  }
  if (allZero) {
    seq[7] = 1
  }

  return seq
}

function calcularDigito1(seq: number[]): number {
  // 1º DV: soma ponderada dos 8 primeiros dígitos (pesos 2..9, depois 2..9)
  let soma = 0
  for (let i = 0; i < 8; i++) {
    const peso = ((i % 8) + 2)
    soma += seq[i] * peso
  }
  const resto = soma % 11
  return resto < 10 ? resto : 0
}

function calcularDigito2(seq: number[], digito1: number, uf: string): number {
  const codUf = UF_CODIGOS[uf]
  if (!codUf) throw new Error(`UF inválida: ${uf}`)

  // 2º DV: inclui os 2 primeiros dígitos do código da UF + dígito1
  const codStr = codUf.toString().padStart(2, "0")
  const dUf1 = Number(codStr[0])
  const dUf2 = Number(codStr[1])

  const todos = [...seq, digito1, dUf1, dUf2]

  let soma = 0
  for (let i = 0; i < todos.length; i++) {
    const peso = ((i % 8) + 2)
    soma += todos[i] * peso
  }
  const resto = soma % 11
  return resto < 10 ? resto : 0
}

/**
 * Gera um número de Título de Eleitor válido, incluindo dígitos verificadores.
 * Retorna no formato "SSSSSSSS D UFCV" (12 dígitos no total).
 */
export function gerarTituloEleitor(uf: string, comFormatacao = true): string {
  const seq = gerarSequencia()
  const d1 = calcularDigito1(seq)
  const d2 = calcularDigito2(seq, d1, uf)
  const codUf = UF_CODIGOS[uf]!

  const seqStr = seq.join("")
  const ufStr = codUf.toString().padStart(2, "0")

  if (comFormatacao) {
    return `${seqStr} ${d1}${ufStr}${d2}`
  }
  return `${seqStr}${d1}${ufStr}${d2}`
}

/**
 * Valida um número de Título de Eleitor.
 * Aceita formatos: "SSSSSSSS D UFCV" ou "SSSSSSSSDUFCV" (12 dígitos).
 */
export function validarTituloEleitor(valor: string): {
  valido: boolean
  mensagem: string
  uf?: string
} {
  // Remove espaços, pontos e traços
  const limpo = valor.replace(/[\s.\-]/g, "").trim()

  if (!/^\d{12}$/.test(limpo)) {
    return { valido: false, mensagem: "Deve conter exatamente 12 dígitos" }
  }

  const seq = limpo.slice(0, 8).split("").map(Number)
  const d1 = Number(limpo[8])

  // Extrai UF
  const codUfStr = limpo.slice(9, 11)
  const d2 = Number(limpo[11])
  const codUf = Number(codUfStr)
  const uf = CODIGO_UF[codUf]

  if (!uf) {
    return { valido: false, mensagem: `Código de UF inválido: ${codUfStr}` }
  }

  // Verifica 1º dígito
  const d1Calc = calcularDigito1(seq)
  if (d1 !== d1Calc) {
    return {
      valido: false,
      mensagem: `1º dígito verificador inválido (esperado ${d1Calc}, recebido ${d1})`,
      uf,
    }
  }

  // Verifica 2º dígito
  const d2Calc = calcularDigito2(seq, d1, uf)
  if (d2 !== d2Calc) {
    return {
      valido: false,
      mensagem: `2º dígito verificador inválido (esperado ${d2Calc}, recebido ${d2})`,
      uf,
    }
  }

  return {
    valido: true,
    mensagem: `Título de Eleitor válido — ${uf}`,
    uf,
  }
}
