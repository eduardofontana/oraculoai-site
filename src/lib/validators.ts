export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

export function formatJson(str: string, indent = 2): string {
  return JSON.stringify(JSON.parse(str), null, indent)
}

export function minifyJson(str: string): string {
  return JSON.stringify(JSON.parse(str))
}
