import * as RSlider from "@radix-ui/react-slider"
import { cn } from "@/lib/cn"

interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
  trackClassName?: string
  rangeClassName?: string
}

export function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  trackClassName,
  rangeClassName,
}: SliderProps) {
  return (
    <RSlider.Root
      value={value}
      defaultValue={defaultValue ?? [50]}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex h-5 w-full touch-none select-none items-center",
        className,
      )}
    >
      <RSlider.Track
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-full bg-cai-gray-200",
          trackClassName,
        )}
      >
        <RSlider.Range className={cn("absolute h-full bg-power-blue-300", rangeClassName)} />
      </RSlider.Track>
      <RSlider.Thumb
        className="block h-4 w-4 rounded-full border-2 border-power-blue-300 bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-power-blue-300/40"
        aria-label="Spend allocation"
      />
    </RSlider.Root>
  )
}
