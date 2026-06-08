"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("")
  const [dateStr, setDateStr] = useState("")
  const [dateResult, setDateResult] = useState("")
  const [tsResult, setTsResult] = useState("")

  const tsToDate = () => {
    const ts = parseInt(timestamp, 10)
    if (isNaN(ts)) return
    const d = new Date(ts * 1000)
    setDateResult(d.toLocaleString("pt-BR"))
  }

  const dateToTs = () => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return
    setTsResult(String(Math.floor(d.getTime() / 1000)))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="font-semibold text-primary">Timestamp → Data</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1717000000"
            className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
          <button
            onClick={tsToDate}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white"
          >
            Converter
          </button>
        </div>
        {dateResult && (
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-lg border border-border bg-bg p-3">
              <p className="font-mono text-sm text-primary">{dateResult}</p>
            </div>
            <CopyButton text={dateResult} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="font-semibold text-primary">Data → Timestamp</p>
        <div className="flex gap-3">
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
          <button
            onClick={dateToTs}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white"
          >
            Converter
          </button>
        </div>
        {tsResult && (
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-lg border border-border bg-bg p-3">
              <p className="font-mono text-sm text-primary">{tsResult}</p>
            </div>
            <CopyButton text={tsResult} />
          </div>
        )}
      </div>
    </div>
  )
}
