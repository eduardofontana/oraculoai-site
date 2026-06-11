/**
 * Extrai metadados EXIF de uma imagem usando a biblioteca exifr.
 */
export interface ExifData {
  [key: string]: unknown
  // Metadados básicos sempre presentes
  fileName: string
  fileSize: string
  fileType: string
  dimensions?: string
}

export interface ExifResult {
  basic: ExifData
  exif: Record<string, unknown>
  iptc: Record<string, unknown>
  xmp: Record<string, unknown>
  raw: Record<string, unknown>
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export async function extrairExif(file: File): Promise<ExifResult> {
  // Metadados básicos
  const basic: ExifData = {
    fileName: file.name,
    fileSize: formatFileSize(file.size),
    fileType: file.type || "Desconhecido",
  }

  // Tenta extrair dimensões via Image
  try {
    const dimensions = await new Promise<{ width: number; height: number } | null>((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(null)
      }
      img.src = url
    })

    if (dimensions) {
      basic.dimensions = `${dimensions.width} × ${dimensions.height} px`
    }
  } catch {
    // Ignora erro de dimensão
  }

  // Tenta extrair EXIF/IPTC/XMP
  let exif: Record<string, unknown> = {}
  let iptc: Record<string, unknown> = {}
  let xmp: Record<string, unknown> = {}
  let raw: Record<string, unknown> = {}

  try {
    const exifr = await import("exifr")

    // EXIF completo (tags mais comuns)
    exif = (await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
      xmp: false,
      iptc: false,
      translateKeys: true,
      translateValues: true,
    })) ?? {}

    // IPTC
    iptc = (await exifr.parse(file, {
      iptc: true,
      xmp: false,
      exif: false,
      translateKeys: true,
    })) ?? {}

    // XMP
    xmp = (await exifr.parse(file, {
      xmp: true,
      iptc: false,
      exif: false,
      translateKeys: true,
    })) ?? {}

    // Raw (todos os dados)
    raw = (await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
      xmp: true,
      iptc: true,
      translateKeys: false,
      translateValues: false,
    })) ?? {}
  } catch {
    // Sem metadados EXIF
  }

  return { basic, exif, iptc, xmp, raw }
}

/**
 * Formata um valor EXIF para exibição.
 */
export function formatExifValue(value: unknown): string {
  if (value === null || value === undefined) return "—"
  if (typeof value === "object") {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}
