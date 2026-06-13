export interface GradientStop {
  color: string
  position: number // 0-100
}

export interface GradientConfig {
  type: "linear" | "radial" | "conic"
  angle: number // graus (para linear)
  stops: GradientStop[]
  radialShape: "circle" | "ellipse"
  radialPosition: string // ex: "center", "top left"
}

const COLOR_REGEX = /^#[0-9a-fA-F]{3,8}$|^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$|^hsla?\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+\s*)?\)$|^[a-zA-Z]+$/

function isValidColor(color: string): boolean {
  return COLOR_REGEX.test(color.trim())
}

export function gerarCssGradient(config: GradientConfig): string {
  const validStops = config.stops.filter((s) => s.color && isValidColor(s.color))
  if (validStops.length === 0) return "background: transparent;"

  const stopsStr = validStops
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ")

  switch (config.type) {
    case "linear":
      return `background: linear-gradient(${config.angle}deg, ${stopsStr});`

    case "radial":
      return `background: radial-gradient(${config.radialShape} at ${config.radialPosition}, ${stopsStr});`

    case "conic":
      return `background: conic-gradient(from ${config.angle}deg at ${config.radialPosition}, ${stopsStr});`
  }
}

export function gerarCssGradientFull(config: GradientConfig): string {
  const gradient = gerarCssGradient(config)
  return `.gradient {\n  ${gradient}\n  background-size: cover;\n}`
}

export const SUGESTOES_CORES = [
  "#FF0000", "#FF4500", "#FF8C00", "#FFD700", "#ADFF2F",
  "#00FF00", "#00CED1", "#1E90FF", "#0000FF", "#8A2BE2",
  "#FF1493", "#FF69B4", "#C0C0C0", "#808080", "#000000",
  "#FFFFFF", "#FF6347", "#7B68EE", "#00FA9A", "#FFDAB9",
]

export const GRADIENTES_PRESET = [
  {
    name: "Pôr do Sol",
    config: {
      type: "linear" as const,
      angle: 135,
      stops: [
        { color: "#ff6b6b", position: 0 },
        { color: "#ffa500", position: 50 },
        { color: "#ffd93d", position: 100 },
      ],
      radialShape: "circle" as const,
      radialPosition: "center",
    },
  },
  {
    name: "Oceano",
    config: {
      type: "linear" as const,
      angle: 90,
      stops: [
        { color: "#00b4d8", position: 0 },
        { color: "#0077b6", position: 50 },
        { color: "#03045e", position: 100 },
      ],
      radialShape: "circle" as const,
      radialPosition: "center",
    },
  },
  {
    name: "Lavanda",
    config: {
      type: "linear" as const,
      angle: 45,
      stops: [
        { color: "#e0b0ff", position: 0 },
        { color: "#c77dff", position: 100 },
      ],
      radialShape: "circle" as const,
      radialPosition: "center",
    },
  },
  {
    name: "Neon",
    config: {
      type: "radial" as const,
      angle: 0,
      stops: [
        { color: "#0ff", position: 0 },
        { color: "#f0f", position: 100 },
      ],
      radialShape: "circle" as const,
      radialPosition: "center",
    },
  },
  {
    name: "Outono",
    config: {
      type: "linear" as const,
      angle: 180,
      stops: [
        { color: "#8b0000", position: 0 },
        { color: "#ff4500", position: 50 },
        { color: "#ffd700", position: 100 },
      ],
      radialShape: "circle" as const,
      radialPosition: "center",
    },
  },
]
