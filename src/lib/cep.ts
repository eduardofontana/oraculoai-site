const estados = [
  { uf: "SP", cidade: "São Paulo" },
  { uf: "RJ", cidade: "Rio de Janeiro" },
  { uf: "MG", cidade: "Belo Horizonte" },
  { uf: "RS", cidade: "Porto Alegre" },
  { uf: "PR", cidade: "Curitiba" },
  { uf: "BA", cidade: "Salvador" },
  { uf: "DF", cidade: "Brasília" },
  { uf: "CE", cidade: "Fortaleza" },
  { uf: "PE", cidade: "Recife" },
  { uf: "SC", cidade: "Florianópolis" },
]

const ruas = [
  "Rua das Flores", "Avenida Brasil", "Rua XV de Novembro",
  "Avenida Paulista", "Rua da Praia", "Rua do Comércio",
  "Avenida Getúlio Vargas", "Rua Marechal Deodoro", "Rua Tiradentes",
  "Avenida Independência",
]

const bairros = [
  "Centro", "Jardim América", "Boa Vista", "Vila Nova",
  "Santa Cecília", "Liberdade", "Consolação", "Copacabana",
  "Barra da Tarioba", "Bela Vista",
]

export interface Endereco {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
}

function rand(n: number) {
  return Math.floor(Math.random() * n)
}

function pad(n: number, len: number) {
  return String(n).padStart(len, "0")
}

export function generateEndereco(): Endereco {
  const estado = estados[rand(estados.length)]
  return {
    cep: `${pad(rand(90) + 10, 5)}-${pad(rand(1000), 3)}`,
    logradouro: `${ruas[rand(ruas.length)]}, ${rand(9999) + 1}`,
    bairro: bairros[rand(bairros.length)],
    cidade: estado.cidade,
    uf: estado.uf,
  }
}
