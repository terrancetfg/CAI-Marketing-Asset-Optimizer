import { ArrowRight } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/Card"
import { BrandLogo } from "./BrandLogo"
import { DeltaBadge } from "@/components/stats/DeltaBadge"
import type { Brand } from "@/lib/mock-data"
import { formatCount, formatCurrency, formatPercent, formatSignedCount, formatSignedCurrency } from "@/lib/format"

interface BrandMetricEntry {
  label: string
  value: string
  delta: string
  deltaDir: "up" | "down"
}

export function BrandCard({ brand }: { brand: Brand }) {
  const m = brand.metrics
  const metrics: BrandMetricEntry[] = [
    {
      label: "Active Campaigns",
      value: m.activeCampaigns.value.toString(),
      delta: formatSignedCount(m.activeCampaigns.delta),
      deltaDir: m.activeCampaigns.delta >= 0 ? "up" : "down",
    },
    {
      label: "All Spend",
      value: formatCurrency(m.allSpend.value),
      delta: formatSignedCurrency(m.allSpend.delta),
      deltaDir: m.allSpend.delta >= 0 ? "up" : "down",
    },
    {
      label: "Leads Generated",
      value: formatCount(m.leadsGenerated.value),
      delta: formatSignedCount(m.leadsGenerated.delta),
      deltaDir: m.leadsGenerated.delta >= 0 ? "up" : "down",
    },
    {
      label: "Opp Rate",
      value: formatPercent(m.oppRate.value, 1),
      delta: `+${m.oppRate.delta}`,
      deltaDir: m.oppRate.delta >= 0 ? "up" : "down",
    },
    {
      label: "MRR",
      value: formatCurrency(m.mrr.value),
      delta: formatSignedCurrency(m.mrr.delta),
      deltaDir: m.mrr.delta >= 0 ? "up" : "down",
    },
    {
      label: "Engagement",
      value: formatPercent(m.engagement.value, 2),
      delta: `+${m.engagement.delta}`,
      deltaDir: m.engagement.delta >= 0 ? "up" : "down",
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <BrandLogo brand={brand} size="md" />
        <Link
          to={`/brand/${brand.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-cai-gray-200 px-3 py-2 text-sm font-medium text-trust-blue-400 transition-colors hover:bg-cai-gray-300"
        >
          Drill into Brand <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {metrics.map((mtr) => (
          <BrandMetricTile key={mtr.label} metric={mtr} />
        ))}
      </div>
    </Card>
  )
}

function BrandMetricTile({ metric }: { metric: BrandMetricEntry }) {
  return (
    <div className="rounded-lg bg-cai-gray-200/70 p-4">
      <div className="text-xs text-cai-gray-600">{metric.label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-trust-blue-400 tabular-nums">
        {metric.value}
      </div>
      <div className="mt-2">
        <DeltaBadge value={metric.delta} direction={metric.deltaDir} size="sm" />
      </div>
      <div className="mt-1.5 text-xs text-cai-gray-500">Since last week</div>
    </div>
  )
}
