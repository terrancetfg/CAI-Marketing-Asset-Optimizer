import * as RSelect from "@radix-ui/react-select"
import { CaretDown, Check } from "@phosphor-icons/react"
import { cn } from "@/lib/cn"

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

export function Select({ value, defaultValue, onValueChange, options, placeholder, className }: SelectProps) {
  return (
    <RSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <RSelect.Trigger
        className={cn(
          "inline-flex h-9 min-w-[140px] items-center justify-between gap-2 rounded-md border border-navy-100 bg-white px-3 text-sm text-navy-700",
          "hover:border-navy-200 focus:outline-none focus:ring-2 focus:ring-cai-blue/30",
          className,
        )}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon>
          <CaretDown className="h-4 w-4 text-navy-500" />
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-navy-100 bg-white shadow-lg"
          position="popper"
          sideOffset={4}
        >
          <RSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded px-7 py-1.5 text-sm text-navy-700 outline-none",
                  "data-[highlighted]:bg-navy-50 data-[state=checked]:font-medium",
                )}
              >
                <RSelect.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check className="h-3.5 w-3.5 text-cai-blue" />
                </RSelect.ItemIndicator>
                <RSelect.ItemText>{opt.label}</RSelect.ItemText>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  )
}
