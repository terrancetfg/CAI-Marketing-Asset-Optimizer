import * as RTabs from "@radix-ui/react-tabs"
import { cn } from "@/lib/cn"
import type { ReactNode } from "react"

interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  items: { value: string; label: string; icon?: ReactNode; content: ReactNode }[]
  className?: string
}

export function Tabs({ value, defaultValue, onValueChange, items, className }: TabsProps) {
  return (
    <RTabs.Root
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <div className="border-b border-cai-gray-300 bg-white px-[30px]">
        <RTabs.List className="flex h-[52px] items-center">
          {items.map((it) => (
            <RTabs.Trigger
              key={it.value}
              value={it.value}
              className={cn(
                "inline-flex h-full items-center gap-3 border-b-2 border-transparent px-3 py-2 text-base text-trust-blue-400 transition-colors",
                "hover:text-power-blue-300",
                "data-[state=active]:border-power-blue-300 data-[state=active]:font-semibold data-[state=active]:text-trust-blue-400",
                "focus-visible:outline-none",
              )}
              style={{ marginBottom: "-1px" }}
            >
              {it.icon && <span className="text-current">{it.icon}</span>}
              <span>{it.label}</span>
            </RTabs.Trigger>
          ))}
        </RTabs.List>
      </div>
      {items.map((it) => (
        <RTabs.Content key={it.value} value={it.value} className="focus:outline-none">
          {it.content}
        </RTabs.Content>
      ))}
    </RTabs.Root>
  )
}
