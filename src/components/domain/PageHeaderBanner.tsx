import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

interface PageHeaderBannerProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  children?: ReactNode
  className?: string
}

export function PageHeaderBanner({
  eyebrow,
  title,
  description,
  leading,
  trailing,
  children,
  className,
}: PageHeaderBannerProps) {
  return (
    <div className={cn("bg-navy-50/70 px-8 py-7", className)}>
      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          {eyebrow && <div className="mb-1 text-sm font-medium text-cai-blue">{eyebrow}</div>}
          <div className="flex items-center gap-3">
            {leading}
            <h1 className="font-display text-3xl font-semibold tracking-tight text-navy-800">{title}</h1>
          </div>
          {description && <div className="mt-2 text-sm text-navy-500 max-w-2xl">{description}</div>}
          {children && <div className="mt-4">{children}</div>}
        </div>
        {trailing && <div className="flex-shrink-0">{trailing}</div>}
      </div>
    </div>
  )
}
