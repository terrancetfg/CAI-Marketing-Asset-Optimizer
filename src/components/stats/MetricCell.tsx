import { DeltaBadge } from "./DeltaBadge"
import { cn } from "@/lib/cn"

interface MetricCellProps {
  label?: string
  value: string
  delta?: string
  deltaDir?: "up" | "down"
  period?: string
  align?: "left" | "right"
  className?: string
}

export function MetricCell({ label, value, delta, deltaDir, period, align = "left", className }: MetricCellProps) {
  return (
    <div className={cn("flex flex-col", align === "right" && "items-end text-right", className)}>
      {label && <div className="text-xs text-navy-500">{label}</div>}
      <div className="text-base font-semibold text-navy-700">{value}</div>
      {delta && deltaDir && (
        <div className="mt-0.5 flex items-center gap-1">
          <DeltaBadge value={delta} direction={deltaDir} size="sm" />
          {period && <span className="text-[11px] text-navy-500">{period}</span>}
        </div>
      )}
    </div>
  )
}
