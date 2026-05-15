import { Archive, Gauge, ChartLine } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/cn"

const TABS = [
  { to: "/", label: "Executive Summary", icon: Archive, end: true },
  { to: "/command-center", label: "Command Center", icon: Gauge, end: false },
  { to: "/asset-detail", label: "Asset Detail", icon: ChartLine, end: false },
]

export function AppTitleHeader() {
  return (
    <header className="relative px-8 pt-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-navy-800">
            Campaign Asset Performance Optimizer
          </h1>
          <p className="mt-2 max-w-xl text-sm text-navy-500">
            Near real-time asset prioritization with AI recommendations and human approval built into every action.
          </p>
        </div>
        <img
          src="/grid-dots/grid-power-blue.svg"
          alt=""
          aria-hidden="true"
          className="-mt-2 hidden h-24 w-auto flex-shrink-0 lg:block"
        />
      </div>
      <nav className="mt-6 border-b border-navy-100">
        <ul className="flex items-center gap-8">
          {TABS.map((t) => (
            <li key={t.to}>
              <NavLink
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-2 border-b-2 border-transparent pb-3 text-sm transition-colors",
                    isActive
                      ? "border-cai-blue text-cai-blue font-semibold"
                      : "text-navy-700 hover:text-cai-blue",
                  )
                }
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}