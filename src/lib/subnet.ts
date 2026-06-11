export interface SubnetResult {
  ip: string
  cidr: number
  mask: string
  maskBinary: string
  wildcard: string
  networkAddress: string
  broadcastAddress: string
  firstHost: string
  lastHost: string
  totalHosts: number
  usableHosts: number
  ipClass: string
  isPrivate: boolean
  ipBinary: string
  networkBinary: string
  broadcastBinary: string
}

function ipToLong(ip: string): number {
  const parts = ip.split(".").map(Number)
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff,
  ].join(".")
}

function toBinary(num: number, bits = 8): string {
  return num.toString(2).padStart(bits, "0")
}

function getIpClass(ip: string): string {
  const first = Number(ip.split(".")[0])
  if (first >= 1 && first <= 126) return "A"
  if (first >= 128 && first <= 191) return "B"
  if (first >= 192 && first <= 223) return "C"
  if (first >= 224 && first <= 239) return "D (Multicast)"
  if (first >= 240 && first <= 255) return "E (Reservado)"
  return "?"
}

function isPrivateIp(ip: string): boolean {
  const parts = ip.split(".").map(Number)
  if (parts[0] === 10) return true
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true
  if (parts[0] === 192 && parts[1] === 168) return true
  if (parts[0] === 127) return true
  return false
}

export function calcularSubnet(ip: string, cidr: number): SubnetResult | string {
  // Valida IP
  const ipParts = ip.split(".")
  if (ipParts.length !== 4) return "IP inválido"
  for (const part of ipParts) {
    const n = Number(part)
    if (Number.isNaN(n) || n < 0 || n > 255) return "IP inválido"
  }

  // Valida CIDR
  if (Number.isNaN(cidr) || cidr < 0 || cidr > 32) return "CIDR inválido (0-32)"

  const ipLong = ipToLong(ip)

  // Máscara
  const maskLong = (~0 << (32 - cidr)) >>> 0
  const networkLong = (ipLong & maskLong) >>> 0
  const broadcastLong = (networkLong | ~maskLong) >>> 0

  const wildcardLong = (~maskLong) >>> 0

  const firstHost = cidr < 31 ? networkLong + 1 : networkLong
  const lastHost = cidr < 31 ? broadcastLong - 1 : broadcastLong

  const totalHosts = Math.pow(2, 32 - cidr)
  const usableHosts = cidr <= 30 ? Math.max(0, totalHosts - 2) : totalHosts

  return {
    ip,
    cidr,
    mask: longToIp(maskLong),
    maskBinary: [
      toBinary((maskLong >>> 24) & 0xff),
      toBinary((maskLong >>> 16) & 0xff),
      toBinary((maskLong >>> 8) & 0xff),
      toBinary(maskLong & 0xff),
    ].join("."),
    wildcard: longToIp(wildcardLong),
    networkAddress: longToIp(networkLong),
    broadcastAddress: longToIp(broadcastLong),
    firstHost: longToIp(firstHost),
    lastHost: longToIp(lastHost),
    totalHosts,
    usableHosts,
    ipClass: getIpClass(ip),
    isPrivate: isPrivateIp(ip),
    ipBinary: ipParts.map((p) => toBinary(Number(p))).join("."),
    networkBinary: [
      toBinary((networkLong >>> 24) & 0xff),
      toBinary((networkLong >>> 16) & 0xff),
      toBinary((networkLong >>> 8) & 0xff),
      toBinary(networkLong & 0xff),
    ].join("."),
    broadcastBinary: [
      toBinary((broadcastLong >>> 24) & 0xff),
      toBinary((broadcastLong >>> 16) & 0xff),
      toBinary((broadcastLong >>> 8) & 0xff),
      toBinary(broadcastLong & 0xff),
    ].join("."),
  }
}

export const CIDR_PRESETS = [
  { cidr: 32, hosts: 1, desc: "/32 — 1 host (loopback)" },
  { cidr: 30, hosts: 4, desc: "/30 — 4 hosts (2 úteis, link P2P)" },
  { cidr: 29, hosts: 8, desc: "/29 — 8 hosts (6 úteis)" },
  { cidr: 28, hosts: 16, desc: "/28 — 16 hosts (14 úteis)" },
  { cidr: 27, hosts: 32, desc: "/27 — 32 hosts (30 úteis)" },
  { cidr: 26, hosts: 64, desc: "/26 — 64 hosts (62 úteis)" },
  { cidr: 25, hosts: 128, desc: "/25 — 128 hosts (126 úteis)" },
  { cidr: 24, hosts: 256, desc: "/24 — 256 hosts (254 úteis, Classe C)" },
  { cidr: 23, hosts: 512, desc: "/23 — 512 hosts (510 úteis)" },
  { cidr: 22, hosts: 1024, desc: "/22 — 1024 hosts (1022 úteis)" },
  { cidr: 21, hosts: 2048, desc: "/21 — 2048 hosts (2046 úteis)" },
  { cidr: 20, hosts: 4096, desc: "/20 — 4096 hosts (4094 úteis)" },
  { cidr: 19, hosts: 8192, desc: "/19 — 8192 hosts (8190 úteis)" },
  { cidr: 18, hosts: 16384, desc: "/18 — 16384 hosts" },
  { cidr: 17, hosts: 32768, desc: "/17 — 32768 hosts" },
  { cidr: 16, hosts: 65536, desc: "/16 — 65536 hosts (Classe B)" },
]
