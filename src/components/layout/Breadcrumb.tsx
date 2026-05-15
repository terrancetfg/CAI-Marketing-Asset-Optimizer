import { CaretRight, ArrowLeft } from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/cn"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const navigate = useNavigate()
  return (
    <nav className={cn("flex items-center gap-3 px-8 py-4", className)} aria-label="Breadcrumb">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-navy-700 hover:text-cai-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <CaretRight className="h-4 w-4 text-navy-500" />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${it.label}-${i}`} className="flex items-center gap-2">
              {it.href && !isLast ? (
                <Link to={it.href} className="text-sm text-navy-700 hover:text-cai-blue">
                  {it.label}
                </Link>
              ) : (
                <span className={cn("text-sm", isLast ? "font-semibold text-cai-blue" : "text-navy-700")}>
                  {it.label}
                </span>
              )}
              {!isLast && <CaretRight className="h-4 w-4 text-navy-500" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
