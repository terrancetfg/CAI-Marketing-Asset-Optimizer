import { SlidersHorizontal } from "@phosphor-icons/react"
import { Chip } from "@/components/ui/Chip"
import { KPI_OPTIONS, type KpiOption } from "@/lib/mock-data"

interface KPIChipGroupProps {
  selected: KpiOption[]
  onToggle: (kpi: KpiOption) => void
}

export function KPIChipGroup({ selected, onToggle }: KPIChipGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs text-navy-500">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        KPIs
      </span>
      {KPI_OPTIONS.map((opt) => (
        <Chip key={opt} active={selected.includes(opt)} onClick={() => onToggle(opt)}>
          {opt}
        </Chip>
      ))}
    </div>
  )
}
