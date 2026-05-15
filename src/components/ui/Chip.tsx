import { cn } from "@/lib/cn"
import type { ButtonHTMLAttributes } from "react"

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function Chip({ active, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-cai-blue bg-cai-blue text-white"
          : "border-navy-100 bg-white text-navy-700 hover:border-navy-200",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
