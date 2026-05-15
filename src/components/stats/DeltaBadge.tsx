import { ArrowUpRight, ArrowDownRight } from "@phosphor-icons/react"
import { cn } from "@/lib/cn"

interface DeltaBadgeProps {
  value: string
  direction: "up" | "down"
  size?: "sm" | "md"
  variant?: "default" | "muted"
  className?: string
}

export function DeltaBadge({ value, direction, size = "md", variant = "default", className }: DeltaBadgeProps) {
  const up = direction === "up"
  const color =
    variant === "muted"
      ? "text-navy-500"
      : up
        ? "text-cai-green"
        : "text-cai-orange"

  return (
    <span className={cn("inline-flex items-center gap-1 font-medium", size === "sm" ? "text-xs" : "text-sm", color, className)}>
      <span className={cn(
        "inline-flex h-4 w-4 items-center justify-center rounded-full",
        up ? "bg-cai-green/10" : "bg-cai-orange/10",
      )}>
        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      </span>
      <span>{value}</span>
    </span>
  )
}
