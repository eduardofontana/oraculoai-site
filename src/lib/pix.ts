interface PixPayload {
  key: string
  name: string
  city: string
  amount?: string
  description?: string
  txid?: string
}

function crc16(str: string): string {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    crc ^= c
    for (let j = 0; j < 8; j++) {
      if (crc & 0x0001) {
        crc = (crc >> 1) ^ 0x8408
      } else {
        crc >>= 1
      }
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0")
}

export function generatePixPayload({
  key,
  name,
  city,
  amount,
  description,
  txid = "***",
}: PixPayload): string {
  const gui = "br.gov.bcb.pix"

  const add = (id: string, value: string) =>
    `${id}${String(value.length).padStart(2, "0")}${value}`

  let m = "000201"
  m += add("26", add("00", gui) + add("01", key + (description ? add("02", description) : "")))
  m += "52040000"
  m += "5303986"
  if (amount) m += add("54", amount)
  m += "5802BR"
  m += add("59", name)
  m += add("60", city)
  m += add("62", add("05", txid))
  m += "6304"

  return m + crc16(m)
}
