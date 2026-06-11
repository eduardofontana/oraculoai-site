/**
 * Calcula juros compostos.
 *
 * M = C × (1 + i)^t
 *
 * @param capitalInitial - Valor inicial (C)
 * @param taxa - Taxa de juros por período (i) em porcentagem (ex: 1.5 = 1.5%)
 * @param periodos - Número de períodos (t)
 * @param periodicidade - Periodicidade: "meses" | "anos"
 * @returns Objeto com montante, juros total, e array de evolução mensal
 */
export function calcularJurosCompostos(
  capitalInitial: number,
  taxa: number,
  periodos: number,
  periodicidade: "meses" | "anos" = "meses"
) {
  const taxaDecimal = taxa / 100
  const totalPeriodos = periodicidade === "anos" ? periodos * 12 : periodos

  const montante = capitalInitial * Math.pow(1 + taxaDecimal, totalPeriodos)
  const jurosTotal = montante - capitalInitial

  // Evolução mês a mês
  const evolucao: { mes: number; valor: number; juros: number }[] = []
  for (let mes = 1; mes <= totalPeriodos; mes++) {
    const valor = capitalInitial * Math.pow(1 + taxaDecimal, mes)
    evolucao.push({
      mes,
      valor,
      juros: valor - capitalInitial,
    })
  }

  return {
    capitalInitial,
    montante,
    jurosTotal,
    totalPeriodos,
    taxaMensal: taxaDecimal * 100,
    evolucao,
  }
}
