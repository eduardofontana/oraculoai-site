"use client"

import { useState, useMemo } from "react"

type Operation = "diff" | "add"

export function CalculadoraDatas() {
  const [operation, setOperation] = useState<Operation>("diff")
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0])
  const [date2, setDate2] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toISOString().split("T")[0]
  })
  const [amount, setAmount] = useState(30)
  const [unit, setUnit] = useState<"days" | "months" | "years">("days")
  const [direction, setDirection] = useState<"add" | "subtract">("add")

  const diffResult = useMemo(() => {
    if (operation !== "diff") return null
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffMs = Math.abs(d2.getTime() - d1.getTime())
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const months = Math.floor(days / 30.44)
    const years = Math.floor(days / 365.25)
    const weeks = Math.floor(days / 7)
    const hours = days * 24
    const minutes = hours * 60
    return { days, months, weeks, years, hours, minutes }
  }, [operation, date1, date2])

  const addResult = useMemo(() => {
    if (operation !== "add") return null
    const d = new Date(date1)
    if (unit === "days") {
      if (direction === "add") {
        d.setDate(d.getDate() + amount)
      } else {
        d.setDate(d.getDate() - amount)
      }
    } else if (unit === "months") {
      if (direction === "add") {
        d.setMonth(d.getMonth() + amount)
      } else {
        d.setMonth(d.getMonth() - amount)
      }
    } else {
      if (direction === "add") {
        d.setFullYear(d.getFullYear() + amount)
      } else {
        d.setFullYear(d.getFullYear() - amount)
      }
    }
    return d.toISOString().split("T")[0]
  }, [operation, date1, amount, unit, direction])

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setOperation("diff")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            operation === "diff"
              ? "bg-accent text-white"
              : "border border-border text-secondary hover:text-primary"
          }`}
        >
          Diferença entre datas
        </button>
        <button
          onClick={() => setOperation("add")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            operation === "add"
              ? "bg-accent text-white"
              : "border border-border text-secondary hover:text-primary"
          }`}
        >
          Adicionar / Subtrair
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Data inicial</label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>

        {operation === "diff" ? (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Data final</label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Operação</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as "add" | "subtract")}
                className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              >
                <option value="add">Adicionar</option>
                <option value="subtract">Subtrair</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Quantidade</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-24 rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Unidade</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as "days" | "months" | "years")}
                className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              >
                <option value="days">Dias</option>
                <option value="months">Meses</option>
                <option value="years">Anos</option>
              </select>
            </div>
          </>
        )}
      </div>

      {operation === "diff" && diffResult && (
        <div className="rounded-xl border border-border bg-bg p-6">
          <p className="mb-4 text-sm text-secondary">
            De <strong className="text-primary">{new Date(date1).toLocaleDateString("pt-BR")}</strong> até{" "}
            <strong className="text-primary">{new Date(date2).toLocaleDateString("pt-BR")}</strong>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Dias", value: diffResult.days },
              { label: "Semanas", value: diffResult.weeks },
              { label: "Meses (aprox.)", value: diffResult.months },
              { label: "Anos (aprox.)", value: diffResult.years },
              { label: "Horas", value: diffResult.hours.toLocaleString("pt-BR") },
              { label: "Minutos", value: diffResult.minutes.toLocaleString("pt-BR") },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-3 text-center">
                <p className="font-display text-xl font-extrabold text-accent">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {operation === "add" && addResult && (
        <div className="rounded-xl border border-border bg-bg p-6 text-center">
          <p className="text-sm text-secondary">
            {direction === "add" ? "Adicionando" : "Subtraindo"} <strong className="text-primary">{amount}</strong> {unit} em{" "}
            <strong className="text-primary">{new Date(date1).toLocaleDateString("pt-BR")}
            </strong>
          </p>
          <p className="mt-4 font-display text-4xl font-extrabold text-accent">
            {new Date(addResult).toLocaleDateString("pt-BR")}
          </p>
          <p className="mt-1 text-xs text-muted">Data resultante</p>
        </div>
      )}
    </div>
  )
}
