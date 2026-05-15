export function formatCurrency(value: number, opts?: { compact?: boolean }) {
  const compact = opts?.compact ?? true
  if (compact) {
    if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
    if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(1)}k`
    return `$${value.toFixed(0)}`
  }
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

export function formatCount(value: number, opts?: { compact?: boolean }) {
  const compact = opts?.compact ?? true
  if (compact) {
    if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
    if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1)}k`
    return value.toLocaleString("en-US")
  }
  return value.toLocaleString("en-US")
}

export function formatPercent(value: number, digits = 2) {
  return `${value.toFixed(digits)}%`
}

export function formatSignedPercent(value: number, digits = 1) {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(digits)}%`
}

export function formatSignedCount(value: number) {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toLocaleString("en-US")}`
}

export function formatSignedCurrency(value: number) {
  const sign = value >= 0 ? "+" : "-"
  const abs = Math.abs(value)
  return `${sign}${formatCurrency(abs)}`
}
