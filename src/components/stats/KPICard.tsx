import { cn } from "@/lib/cn"
import { DeltaBadge } from "./DeltaBadge"

interface KPICardProps {
  label: string
  value: string
  delta?: string
  deltaDir?: "up" | "down"
  period?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function KPICard({ label, value, delta, deltaDir, period, size = "md", className }: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-navy-100 bg-white px-4 py-3",
        size === "lg" && "py-4",
        className,
      )}
    >
      <div className="text-xs text-navy-500">{label}</div>
      <div
        className={cn(
          "mt-1 font-semibold tracking-tight text-cai-blue-dark",
          size === "sm" && "text-xl",
          size === "md" && "text-2xl",
          size === "lg" && "text-3xl",
        )}
      >
        {value}
      </div>
      {delta && deltaDir && (
        <div className="mt-2 flex items-center gap-2">
          <DeltaBadge value={delta} direction={deltaDir} size="sm" />
          {period && <span className="text-xs text-navy-500">{period}</span>}
        </div>
      )}
    </div>
  )
}
