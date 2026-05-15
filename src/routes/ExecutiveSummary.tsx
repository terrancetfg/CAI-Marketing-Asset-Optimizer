import { useState } from "react"
import { AppTitleHeader } from "@/components/layout/AppTitleHeader"
import { Card } from "@/components/ui/Card"
import { Select } from "@/components/ui/Select"
import { StatCardHero } from "@/components/stats/StatCardHero"
import { BrandCard } from "@/components/domain/BrandCard"
import { KPIChipGroup } from "@/components/domain/KPIChipGroup"
import { MrrByBrandChart } from "@/components/domain/MrrByBrandChart"
import { BRANDS, HERO_KPIS, SUMMARY_KPIS, type KpiOption } from "@/lib/mock-data"
import { useNavigate } from "react-router-dom"

export default function ExecutiveSummary() {
  const navigate = useNavigate()
  const [selectedKpis, setSelectedKpis] = useState<KpiOption[]>(["MRR"])
  const toggleKpi = (k: KpiOption) =>
    setSelectedKpis((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))

  return (
    <>
      <AppTitleHeader />
      <main className="px-8 pb-12 pt-8 space-y-6">
        {/* Hero KPI row */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {HERO_KPIS.map((k) => (
            <StatCardHero key={k.label} {...k} />
          ))}
        </div>

        {/* Summary KPI bordered container */}
        <div className="rounded-xl border border-cai-gray-300 p-5">
          <p className="mb-4 text-xs text-navy-500">
            Click any brand to drill into top/bottom campaigns ranked by MRR.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {SUMMARY_KPIS.map((k) => (
              <div key={k.label} className="rounded-md bg-navy-50/60 p-[30px]">
                <div className="text-3xl font-semibold tracking-tight text-navy-700">{k.value}</div>
                <div className="mt-1 text-xs text-navy-500">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MRR by Brand chart */}
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-navy-800">MRR by Brand</h2>
              <p className="mt-1 max-w-2xl text-xs text-navy-500">
                Multi-select KPIs to compare side-by-side. Bars normalized 0–100 for cross-metric scale; hover for actuals.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                defaultValue="all-brands"
                options={[{ value: "all-brands", label: "All Brands" }]}
                placeholder="All Brands"
              />
              <Select
                defaultValue="all-intents"
                options={[{ value: "all-intents", label: "All Intents" }]}
                placeholder="All Intents"
              />
              <Select
                defaultValue="all-channels"
                options={[{ value: "all-channels", label: "All Channels" }]}
                placeholder="All Channels"
              />
            </div>
          </div>
          <div className="mt-4">
            <KPIChipGroup selected={selectedKpis} onToggle={toggleKpi} />
          </div>
          <div className="mt-4">
            <MrrByBrandChart
              brands={BRANDS}
              highlightId="manheim"
              onBarClick={(id) => navigate(`/brand/${id}`)}
            />
          </div>
        </Card>

        {/* Brand cards — 2 wide on laptops; 3 wide on external monitors (1920px+) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 3xl:grid-cols-3">
          {BRANDS.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </main>
    </>
  )
}
