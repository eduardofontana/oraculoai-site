const KEYWORDS_UPPER = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "IS", "NULL",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE",
  "CREATE", "TABLE", "ALTER", "DROP", "INDEX", "VIEW",
  "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "FULL", "CROSS", "ON",
  "GROUP", "BY", "ORDER", "ASC", "DESC", "HAVING",
  "LIMIT", "OFFSET", "AS", "DISTINCT", "ALL", "UNION",
  "CASE", "WHEN", "THEN", "ELSE", "END",
  "EXISTS", "BETWEEN", "LIKE", "ILIKE",
  "COUNT", "SUM", "AVG", "MIN", "MAX",
  "CAST", "COALESCE", "NULLIF",
  "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT",
  "DEFAULT", "CHECK", "UNIQUE", "AUTO_INCREMENT", "SERIAL",
  "IF", "ELSE", "BEGIN", "COMMIT", "ROLLBACK",
  "FUNCTION", "PROCEDURE", "RETURNS", "LANGUAGE",
  "RETURN", "DECLARE", "LOOP", "END LOOP",
  "EXEC", "EXECUTE", "WITH", "RECURSIVE",
]

const KEYWORDS_SET = new Set(KEYWORDS_UPPER)

export function formatSQL(sql: string): string {
  if (!sql.trim()) return ""

  // Tokeniza preservando strings e comentários
  const tokens: string[] = []
  let i = 0
  let current = ""

  const flush = () => {
    if (current) {
      tokens.push(current)
      current = ""
    }
  }

  while (i < sql.length) {
    const ch = sql[i]

    // String literal
    if (ch === "'" || ch === '"') {
      flush()
      const quote = ch
      let str = quote
      i++
      while (i < sql.length) {
        str += sql[i]
        if (sql[i] === quote && sql[i - 1] !== "\\") break
        i++
      }
      tokens.push(str)
      i++
      continue
    }

    // Comentário de linha
    if (ch === "-" && sql[i + 1] === "-") {
      flush()
      let comment = "--"
      i += 2
      while (i < sql.length && sql[i] !== "\n") {
        comment += sql[i]
        i++
      }
      tokens.push(comment)
      continue
    }

    // Comentário de bloco
    if (ch === "/" && sql[i + 1] === "*") {
      flush()
      let comment = "/*"
      i += 2
      while (i < sql.length && !(sql[i] === "*" && sql[i + 1] === "/")) {
        comment += sql[i]
        i++
      }
      comment += "*/"
      i += 2
      tokens.push(comment)
      continue
    }

    // Whitespace: delimita tokens
    if (/\s/.test(ch)) {
      flush()
      // Agrupa whitespace simples
      while (i < sql.length && /\s/.test(sql[i])) {
        current += sql[i]
        i++
      }
      flush()
      continue
    }

    // Pontuação especial
    if (",;()".includes(ch)) {
      flush()
      tokens.push(ch)
      i++
      continue
    }

    // Operadores
    if ("=<>!+-*/%".includes(ch)) {
      flush()
      // Operadores de dois caracteres
      if (i + 1 < sql.length && "=<>!".includes(sql[i + 1])) {
        tokens.push(ch + sql[i + 1])
        i += 2
      } else {
        tokens.push(ch)
        i++
      }
      continue
    }

    current += ch
    i++
  }
  flush()

  // Processa tokens: identifica keywords vs identificadores
  const processed = tokens.map((t) => {
    const upper = t.toUpperCase()
    if (KEYWORDS_SET.has(upper)) return upper
    return t
  })

  // Monta o SQL formatado com indentação
  const indentUnit = "  "
  let indent = 0
  let result = ""
  let lastToken = ""

  const isMajorKeyword = (token: string) =>
    ["SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE",
     "CREATE", "ALTER", "DROP", "HAVING", "ORDER", "GROUP",
     "LIMIT", "SET", "VALUES", "JOIN", "LEFT", "RIGHT",
     "INNER", "OUTER", "FULL", "CROSS", "UNION",
     "INTO", "ON", "AND", "OR"].includes(token)

  for (let t = 0; t < processed.length; t++) {
    const token = processed[t]

    // Ignora whitespace inicial
    if (/^\s+$/.test(token) && !result) continue

    // Abre parênteses: aumenta indentação
    if (token === "(") {
      if (result && !result.endsWith(" ")) result += " "
      result += "(\n"
      indent++
      result += indentUnit.repeat(indent)
      lastToken = token
      continue
    }

    // Fecha parênteses: diminui indentação
    if (token === ")") {
      indent = Math.max(0, indent - 1)
      result += "\n" + indentUnit.repeat(indent) + ")"
      lastToken = token
      continue
    }

    // Vírgula: nova linha
    if (token === ",") {
      result += ",\n" + indentUnit.repeat(indent)
      lastToken = token
      continue
    }

    // Ponto e vírgula: nova linha
    if (token === ";") {
      result += ";\n"
      lastToken = token
      continue
    }

    // Keywords principais: quebra de linha antes
    if (isMajorKeyword(token) && result) {
      // AND/OR dentro de WHERE ficam alinhados
      if (token === "AND" || token === "OR") {
        result += "\n" + indentUnit.repeat(Math.max(1, indent))
        result += token + " "
        lastToken = token
        continue
      }
      result += "\n" + indentUnit.repeat(indent)
      result += token + " "
      lastToken = token
      continue
    }

    // Whitespace: substitui por espaço simples
    if (/^\s+$/.test(token)) {
      if (result && !result.endsWith(" ") && !result.endsWith("\n")) {
        result += " "
      }
      lastToken = token
      continue
    }

    result += token + " "
    lastToken = token
  }

  // Limpa espaços extras no final das linhas
  return result
    .trim()
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
}

export function minifySQL(sql: string): string {
  if (!sql.trim()) return ""

  let result = ""
  let i = 0

  while (i < sql.length) {
    const ch = sql[i]

    // String literal
    if (ch === "'" || ch === '"') {
      const quote = ch
      result += quote
      i++
      while (i < sql.length) {
        result += sql[i]
        if (sql[i] === quote && sql[i - 1] !== "\\") break
        i++
      }
      i++
      continue
    }

    // Comentário de linha
    if (ch === "-" && sql[i + 1] === "-") {
      i += 2
      while (i < sql.length && sql[i] !== "\n") i++
      continue
    }

    // Comentário de bloco
    if (ch === "/" && sql[i + 1] === "*") {
      i += 2
      while (i < sql.length && !(sql[i] === "*" && sql[i + 1] === "/")) i++
      i += 2
      continue
    }

    // Whitespace: substitui por espaço simples
    if (/\s/.test(ch)) {
      if (result && !result.endsWith(" ")) {
        result += " "
      }
      i++
      continue
    }

    result += ch
    i++
  }

  return result.trim()
}
