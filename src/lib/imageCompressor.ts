export interface CompressResult {
  blob: Blob
  url: string
  sizeOriginal: number
  sizeCompressed: number
  quality: number
  format: string
}

/**
 * Comprime uma imagem redimensionando e ajustando a qualidade via Canvas.
 *
 * @param file - Arquivo de imagem original
 * @param quality - Qualidade JPEG/WebP (0-1)
 * @param maxWidth - Largura máxima (0 = manter original)
 * @param maxHeight - Altura máxima (0 = manter original)
 * @param format - Formato de saída ("image/jpeg" | "image/png" | "image/webp")
 */
export async function comprimirImagem(
  file: File,
  quality: number,
  maxWidth: number,
  maxHeight: number,
  format: "image/jpeg" | "image/png" | "image/webp"
): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      let width = img.width
      let height = img.height

      // Redimensiona mantendo proporção
      if (maxWidth > 0 && width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      if (maxHeight > 0 && height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      const canvas = document.createElement("canvas")
      canvas.width = Math.round(width)
      canvas.height = Math.round(height)

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Não foi possível criar contexto 2D"))
        return
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Falha ao comprimir imagem"))
            return
          }
          resolve({
            blob,
            url: URL.createObjectURL(blob),
            sizeOriginal: file.size,
            sizeCompressed: blob.size,
            quality,
            format,
          })
        },
        format,
        format === "image/png" ? undefined : quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Erro ao carregar imagem"))
    }

    img.src = url
  })
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
