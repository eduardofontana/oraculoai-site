export interface CssUnitValue {
  value: number
  unit: string
}

export type CssUnitType = "px" | "rem" | "em" | "%" | "vw" | "vh"

export const cssUnitNames: Record<CssUnitType, string> = {
  px: "Pixels",
  rem: "REM",
  em: "EM",
  "%": "Porcentagem",
  vw: "Viewport Width",
  vh: "Viewport Height",
}

// Converte entre unidades CSS assumindo:
// - 1rem = 16px (padrão navegador)
// - 1em = 16px (sem contexto parent)
// - 100vw = viewport width (default 1440px)
// - 100vh = viewport height (default 900px)
// - 100% = 16px (1rem de base, contexto padrão)

const DEFAULT_REM_PX = 16
const DEFAULT_VW_PX = 1440
const DEFAULT_VH_PX = 900

export function convertCssUnit(
  value: number,
  from: CssUnitType,
  to: CssUnitType,
  options?: {
    baseFontSize?: number
    viewportWidth?: number
    viewportHeight?: number
  }
): number {
  const remPx = options?.baseFontSize ?? DEFAULT_REM_PX
  const vwPx = options?.viewportWidth ?? DEFAULT_VW_PX
  const vhPx = options?.viewportHeight ?? DEFAULT_VH_PX

  // Step 1: convert "from" to px
  let px: number
  switch (from) {
    case "px":
      px = value
      break
    case "rem":
      px = value * remPx
      break
    case "em":
      px = value * remPx
      break
    case "%":
      px = (value / 100) * remPx
      break
    case "vw":
      px = (value / 100) * vwPx
      break
    case "vh":
      px = (value / 100) * vhPx
      break
  }

  // Step 2: convert px to "to"
  switch (to) {
    case "px":
      return px
    case "rem":
      return px / remPx
    case "em":
      return px / remPx
    case "%":
      return (px / remPx) * 100
    case "vw":
      return (px / vwPx) * 100
    case "vh":
      return (px / vhPx) * 100
  }
}
