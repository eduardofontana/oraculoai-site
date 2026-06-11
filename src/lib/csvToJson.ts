export interface CsvToJsonOptions {
  delimiter?: string
  hasHeader?: boolean
  trimValues?: boolean
}

/**
 * Converte CSV para JSON.
 * Suporta delimitador customizável, headers e valores com aspas.
 */
export function csvToJson(
  csv: string,
  options: CsvToJsonOptions = {}
): string {
  const {
    delimiter = ",",
    hasHeader = true,
    trimValues = true,
  } = options

  if (!csv.trim()) return "[]"

  const lines = csv.trim().split(/\r?\n/)
  if (lines.length === 0) return "[]"

  // Parse uma linha respeitando aspas
  const parseLine = (line: string): string[] => {
    const values: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]

      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"'
            i++ // Escapa aspas duplas
          } else {
            inQuotes = false
          }
        } else {
          current += ch
        }
      } else {
        if (ch === '"') {
          inQuotes = true
        } else if (ch === delimiter) {
          values.push(trimValues ? current.trim() : current)
          current = ""
        } else {
          current += ch
        }
      }
    }
    values.push(trimValues ? current.trim() : current)
    return values
  }

  // Cabeçalho
  let headers: string[]
  let startIndex: number

  if (hasHeader) {
    headers = parseLine(lines[0])
    startIndex = 1
  } else {
    headers = []
    startIndex = 0
  }

  const result: Record<string, string>[] = []

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = parseLine(line)
    const obj: Record<string, string> = {}

    if (hasHeader) {
      headers.forEach((h, idx) => {
        obj[h] = values[idx] ?? ""
      })
    } else {
      values.forEach((v, idx) => {
        obj[`column${idx + 1}`] = v
      })
    }

    result.push(obj)
  }

  return JSON.stringify(result, null, 2)
}

/**
 * Tenta detectar automaticamente o delimitador de um CSV.
 */
export function detectDelimiter(csv: string): string {
  const firstLine = csv.trim().split(/\r?\n/)[0]
  if (!firstLine) return ","

  const delimiters = [",", ";", "\t", "|"]
  let bestDelimiter = ","
  let bestCount = 0

  for (const d of delimiters) {
    const count = (firstLine.match(new RegExp(d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length
    if (count > bestCount) {
      bestCount = count
      bestDelimiter = d
    }
  }

  return bestDelimiter
}
