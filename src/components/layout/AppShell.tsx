import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen w-full bg-white text-navy-700">{children}</div>
}
