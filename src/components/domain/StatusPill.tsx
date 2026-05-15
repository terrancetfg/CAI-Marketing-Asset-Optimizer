import { cn } from "@/lib/cn"
import type { AssetStatus } from "@/lib/mock-data"

const STATUS_LABEL: Record<AssetStatus, string> = {
  underperforming: "Underperforming",
  "on-target": "On Target",
  outperforming: "Outperforming",
  "top-performer": "Top Performer",
}

const STATUS_STYLE: Record<AssetStatus, string> = {
  underperforming: "bg-status-under-bg text-status-under-fg",
  "on-target": "bg-status-on-bg text-status-on-fg",
  outperforming: "bg-status-over-bg text-status-over-fg",
  "top-performer": "bg-fresh-green-50 text-fresh-green-400",
}

export function StatusPill({ status, className }: { status: AssetStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        STATUS_STYLE[status],
        className,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
