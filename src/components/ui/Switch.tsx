import * as RSwitch from "@radix-ui/react-switch"
import { cn } from "@/lib/cn"

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  id?: string
}

export function Switch({ checked, defaultChecked, onCheckedChange, label, id }: SwitchProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <RSwitch.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          "bg-navy-200 data-[state=checked]:bg-cai-blue",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cai-blue focus-visible:ring-offset-2",
        )}
      >
        <RSwitch.Thumb
          className={cn(
            "block h-5 w-5 rounded-full bg-white shadow-sm transition-transform translate-x-0.5",
            "data-[state=checked]:translate-x-[22px]",
          )}
        />
      </RSwitch.Root>
      {label && (
        <label htmlFor={id} className="text-sm text-navy-700 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  )
}
