type UnitCategory = "length" | "weight" | "temperature" | "data"

interface Conversion {
  unit: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

const conversions: Record<UnitCategory, Conversion[]> = {
  length: [
    { unit: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { unit: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { unit: "m", toBase: (v) => v, fromBase: (v) => v },
    { unit: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { unit: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { unit: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { unit: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  ],
  weight: [
    { unit: "mg", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    { unit: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { unit: "kg", toBase: (v) => v, fromBase: (v) => v },
    { unit: "t", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { unit: "lb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { unit: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  ],
  temperature: [
    { unit: "°C", toBase: (v) => v, fromBase: (v) => v },
    { unit: "°F", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    { unit: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  data: [
    { unit: "B", toBase: (v) => v, fromBase: (v) => v },
    { unit: "KB", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    { unit: "MB", toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / 1024 / 1024 },
    { unit: "GB", toBase: (v) => v * 1024 * 1024 * 1024, fromBase: (v) => v / 1024 / 1024 / 1024 },
    { unit: "TB", toBase: (v) => v * 1024 * 1024 * 1024 * 1024, fromBase: (v) => v / 1024 / 1024 / 1024 / 1024 },
  ],
}

export function convertUnit(
  category: UnitCategory,
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  const cat = conversions[category]
  const from = cat.find((c) => c.unit === fromUnit)
  const to = cat.find((c) => c.unit === toUnit)
  if (!from || !to) return NaN
  const base = from.toBase(value)
  return to.fromBase(base)
}

export function getUnits(category: UnitCategory): string[] {
  return conversions[category].map((c) => c.unit)
}

export const unitCategories: { key: UnitCategory; label: string }[] = [
  { key: "length", label: "Comprimento" },
  { key: "weight", label: "Peso" },
  { key: "temperature", label: "Temperatura" },
  { key: "data", label: "Dados" },
]
