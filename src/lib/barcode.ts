export interface BarcodeOptions {
  format:
    | "CODE128"
    | "CODE39"
    | "EAN13"
    | "EAN8"
    | "UPC"
    | "ISBN"
    | "CODE128B"
    | "CODE128C"
    | "ITF"
    | "MSI"
  width: number
  height: number
  displayValue: boolean
  fontSize: number
  margin: number
  background: string
  lineColor: string
}

export const FORMATOS_DISPONIVEIS = [
  { value: "CODE128", label: "Code 128" },
  { value: "CODE39", label: "Code 39" },
  { value: "EAN13", label: "EAN-13" },
  { value: "EAN8", label: "EAN-8" },
  { value: "UPC", label: "UPC" },
  { value: "ITF", label: "ITF-14" },
]

export const DEFAULT_OPTIONS: BarcodeOptions = {
  format: "CODE128",
  width: 2,
  height: 80,
  displayValue: true,
  fontSize: 18,
  margin: 10,
  background: "#ffffff",
  lineColor: "#000000",
}

/**
 * Gera um SVG de código de barras usando JsBarcode.
 */
export async function gerarBarcode(
  value: string,
  options: Partial<BarcodeOptions> = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const JsBarcode = (await import("jsbarcode")).default

  // Cria elemento SVG temporário
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  await new Promise<void>((resolve, reject) => {
    try {
      JsBarcode(svg, value, {
        format: opts.format,
        width: opts.width,
        height: opts.height,
        displayValue: opts.displayValue,
        fontSize: opts.fontSize,
        margin: opts.margin,
        background: opts.background,
        lineColor: opts.lineColor,
        valid: (valid: boolean) => {
          if (!valid) reject(new Error("Valor inválido para o formato selecionado"))
        },
      })
      resolve()
    } catch (e) {
      reject(e)
    }
  })

  return new XMLSerializer().serializeToString(svg)
}

/**
 * Valida se um valor é compatível com o formato escolhido.
 */
export function validarFormato(value: string, format: string): string | null {
  if (!value.trim()) return "Digite um valor"

  switch (format) {
    case "EAN13":
      if (!/^\d{12,13}$/.test(value.replace(/\s/g, "")))
        return "EAN-13 requer 12 ou 13 dígitos"
      break
    case "EAN8":
      if (!/^\d{7,8}$/.test(value.replace(/\s/g, "")))
        return "EAN-8 requer 7 ou 8 dígitos"
      break
    case "UPC":
      if (!/^\d{11,12}$/.test(value.replace(/\s/g, "")))
        return "UPC requer 11 ou 12 dígitos"
      break
    case "ITF":
      if (!/^\d+$/.test(value.replace(/\s/g, "")))
        return "ITF-14 requer apenas dígitos"
      break
  }

  return null
}
