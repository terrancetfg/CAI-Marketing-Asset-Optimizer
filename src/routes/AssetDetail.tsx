import { Navigate, useParams, useNavigate } from "react-router-dom"
import {
  ArrowCircleDownRight,
  ArrowCircleUpRight,
  CheckCircle,
  Info,
  Lightbulb,
  PencilSimple,
  TrendDown,
  XCircle,
  type Icon,
} from "@phosphor-icons/react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { ChannelPill } from "@/components/domain/ChannelPill"
import { ScenarioPlanningPanel } from "@/components/domain/ScenarioPlanningPanel"
import { cn } from "@/lib/cn"
import { getBrand, getCampaign } from "@/lib/mock-data"

type Tone = "positive" | "caution" | "critical"

interface DetailMetric {
  label: string
  value: string
  delta: string
  deltaDir: "up" | "down"
  tone: Tone
  caption: string
}

const HERO_METRICS: DetailMetric[] = [
  {
    label: "CPM",
    value: "$80",
    delta: "-471.4%",
    deltaDir: "down",
    tone: "caution",
    caption: "vs Benchmark $14",
  },
  {
    label: "Leads",
    value: "173",
    delta: "+22.6%",
    deltaDir: "up",
    tone: "positive",
    caption: "vs Benchmark 140",
  },
]

const KPI_GRID: DetailMetric[] = [
  { label: "Impressions", value: "134,866", delta: "+250", deltaDir: "up", tone: "positive", caption: "Since last week" },
  { label: "Engagements", value: "11,572", delta: "+2,704", deltaDir: "up", tone: "positive", caption: "Since last week" },
  { label: "Eng. Rate", value: "8.58%", delta: "-41.2%", deltaDir: "down", tone: "critical", caption: "vs Benchmark 9.84%" },
  { label: "CPM", value: "$80", delta: "-470.4%", deltaDir: "down", tone: "critical", caption: "vs Benchmark $14" },
  { label: "Leads", value: "173", delta: "+23.6%", deltaDir: "up", tone: "positive", caption: "vs Benchmark 140" },
  { label: "Opps", value: "21", delta: "+3", deltaDir: "up", tone: "positive", caption: "Since last week" },
  { label: "Lead→Opp", value: "12.14%", delta: "-32.6%", deltaDir: "down", tone: "critical", caption: "vs Benchmark 18%" },
  { label: "MRR", value: "$120.1k", delta: "+500.6%", deltaDir: "up", tone: "positive", caption: "vs Benchmark $20.0%" },
  { label: "Spend", value: "$46.0k", delta: "+1.6k", deltaDir: "up", tone: "positive", caption: "Since last week" },
]

const ENGAGEMENT_TREND = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  const date = `04-${(13 + day).toString().padStart(2, "0")}`.replace(/-(4[3-9]|5[0-9])$/, (m) => {
    const n = parseInt(m.slice(1), 10)
    return n > 30 ? `-05-${(n - 30).toString().padStart(2, "0")}` : m
  })
  const base = 1.4 + Math.sin(i / 4) * 0.6 + (i / 30) * 0.6
  return { date, value: Math.max(0.3, base + (Math.random() - 0.5) * 0.4) }
})

const MRR_TREND = ENGAGEMENT_TREND.map((d, i) => ({
  date: d.date,
  value: 80 + i * 1.2 + Math.sin(i / 3) * 8,
}))

export default function AssetDetail() {
  const { brandId = "", campaignId = "" } = useParams()
  const navigate = useNavigate()
  const brand = getBrand(brandId)
  const campaign = getCampaign(brandId, campaignId)
  if (!brand || !campaign) return <Navigate to="/" replace />

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Executive Summary", href: "/" },
          { label: brand.name, href: `/brand/${brand.id}` },
          { label: campaign.name, href: `/brand/${brand.id}/campaign/${campaign.id}` },
          { label: "MPU 300x250" },
        ]}
      />
      <div className="flex flex-wrap items-start justify-between gap-8 bg-cai-gray-200 px-10 py-[30px]">
        <div className="flex max-w-[575px] flex-col items-start gap-5">
          <span className="text-sm font-medium leading-5 text-power-blue-300">Asset Detail</span>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm leading-5 text-[#657386]">
              <span>{brand.name}</span>
              <span>/</span>
              <span>{campaign.intent}</span>
              <span>/</span>
              <span>{campaign.name}</span>
            </div>
            <h1 className="font-display text-[36px] font-medium leading-[39px] text-cai-black">
              MPU 300x250
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ChannelPill tag={{ label: "Display", category: "channel" }} variant="uniform" />
            <div className="inline-flex items-center gap-1.5">
              <TrendDown className="h-5 w-5 text-fire-red-300" />
              <span className="text-base font-medium leading-5 text-fire-red-300">
                Underperforming
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-[740px] items-stretch gap-2">
          {HERO_METRICS.map((m) => (
            <HeaderKpiCard key={m.label} metric={m} />
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-5 px-[30px] py-6">
        <AIRecommendationCard
          onApprove={() => navigate(-1)}
          onModify={() => {
            /* placeholder */
          }}
        />

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {KPI_GRID.slice(0, 5).map((m) => (
              <KpiTile key={m.label} metric={m} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {KPI_GRID.slice(5).map((m) => (
              <KpiTile key={m.label} metric={m} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard
            title="Engagement Rate Trend (30 days)"
            data={ENGAGEMENT_TREND}
            stroke="#00A983"
            yTicks={[0, 0.75, 1.5, 2.25, 3]}
          />
          <ChartCard
            title="MRR Trend (30 days)"
            data={MRR_TREND}
            stroke="#0C80DF"
            yTicks={[0, 50, 100, 150, 200]}
          />
        </div>

        <ScenarioPlanningPanel campaignName={campaign.name} strategicIntent={campaign.intent} />
      </section>
    </>
  )
}

const TONE_COLORS: Record<Tone, { Icon: Icon; text: string }> = {
  positive: { Icon: ArrowCircleUpRight, text: "text-fresh-green-300" },
  caution: { Icon: ArrowCircleDownRight, text: "text-hello-yellow-300" },
  critical: { Icon: ArrowCircleDownRight, text: "text-impact-orange-300" },
}

function HeaderKpiCard({ metric }: { metric: DetailMetric }) {
  const tone = TONE_COLORS[metric.tone]
  return (
    <div className="flex flex-1 flex-col items-start gap-3 overflow-clip rounded-lg border border-cai-gray-300 bg-white p-6">
      <span className="w-full text-sm leading-4 text-cai-gray-600">{metric.label}</span>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="font-display text-[28px] font-medium leading-[38px] text-trust-blue-300">
          {metric.value}
        </span>
        <div className="flex w-full items-center gap-1">
          <tone.Icon className={cn("h-5 w-5 shrink-0", tone.text)} />
          <span className={cn("flex-1 text-xl font-light leading-7", tone.text)}>
            {metric.delta}
          </span>
        </div>
        <span className="text-base leading-[18px] text-cai-gray-400">{metric.caption}</span>
      </div>
    </div>
  )
}

function KpiTile({ metric }: { metric: DetailMetric }) {
  const tone = TONE_COLORS[metric.tone]
  return (
    <div className="flex min-w-[180px] flex-col items-start gap-3 rounded-lg border border-cai-gray-300 bg-[#F9F9F9] p-6">
      <span className="w-full text-sm leading-4 text-cai-gray-600">{metric.label}</span>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="font-display text-[37px] font-medium leading-[38px] text-trust-blue-300 tabular-nums">
          {metric.value}
        </span>
        <div className="flex w-full items-center gap-1">
          <tone.Icon className={cn("h-5 w-5 shrink-0", tone.text)} />
          <span className={cn("flex-1 text-xl font-light leading-7", tone.text)}>
            {metric.delta}
          </span>
        </div>
        <span className="text-base leading-[18px] text-cai-gray-400">{metric.caption}</span>
      </div>
    </div>
  )
}

function AIRecommendationCard({
  onModify,
  onApprove,
}: {
  onModify: () => void
  onApprove: () => void
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-impact-orange-200 bg-[#FFF2E7] p-6">
      <div className="flex items-start justify-between px-1">
        <div className="flex items-center gap-3">
          <Lightbulb weight="regular" className="h-5 w-5 text-impact-orange-300" />
          <div className="flex items-center gap-2 text-sm leading-[18px]">
            <span className="font-medium text-[#111215]">AI Recommendation</span>
            <span className="text-[#22252B]">81% Confidence</span>
          </div>
        </div>
        <button
          type="button"
          aria-label="Dismiss recommendation"
          className="text-cai-gray-500 hover:text-cai-gray-700"
        >
          <XCircle className="h-8 w-8" />
        </button>
      </div>

      <div className="flex flex-col gap-1 pl-1">
        <h3 className="font-display text-2xl font-medium leading-8 text-impact-orange-300">
          Optimize creative or targeting
        </h3>
        <p className="text-sm leading-5 text-[#141A29]/90">
          Asset shows potential but needs creative or targeting adjustments.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 flex-col gap-3 overflow-clip rounded-lg border border-impact-orange-300 bg-white p-7">
          <span className="w-full text-sm leading-4 text-cai-gray-500">Why</span>
          <ul className="flex flex-col gap-2.5 text-base leading-4 text-cai-gray-600">
            <BulletItem>Moderate impressions but low engagement</BulletItem>
            <BulletItem>Low lead-to-opp rate</BulletItem>
          </ul>
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-clip rounded-lg border border-impact-orange-300 bg-white p-7">
          <span className="w-full text-sm leading-4 text-cai-gray-500">Project Impact</span>
          <ul className="flex flex-col gap-2.5 text-base leading-4 text-cai-gray-600">
            <BulletItem>Optimization could improve MRR by 15%</BulletItem>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <div className="flex flex-1 items-center gap-2 text-sm leading-5 text-[#141A29]/90">
          <Info className="h-[18px] w-[18px] shrink-0" />
          <p>
            Approving will tag this recommendation for execution. Modifying allows you to change
            what you need.
          </p>
        </div>
        <button
          type="button"
          onClick={onModify}
          className="inline-flex items-center gap-1 rounded border border-impact-orange-300 bg-[#F9F9F9] px-3 py-2 text-base leading-5 text-cai-gray-700 transition-colors hover:bg-impact-orange-300/10"
        >
          <PencilSimple className="h-5 w-5" />
          Modify
        </button>
        <button
          type="button"
          onClick={onApprove}
          className="inline-flex items-center gap-1 rounded bg-fresh-green-300 px-3 py-2 text-base leading-5 text-white transition-colors hover:bg-fresh-green-400"
        >
          <CheckCircle className="h-5 w-5" />
          Approve Change
        </button>
      </div>
    </div>
  )
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-cai-gray-600" />
      <span>{children}</span>
    </li>
  )
}

function ChartCard({
  title,
  data,
  stroke,
  yTicks,
}: {
  title: string
  data: { date: string; value: number }[]
  stroke: string
  yTicks: number[]
}) {
  const gradId = `chart-grad-${title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`
  return (
    <div className="flex h-[260px] flex-col gap-3 overflow-clip rounded-lg border border-cai-gray-300 bg-[#F9F9F9] p-5">
      <h3 className="text-sm leading-4 text-cai-gray-700">{title}</h3>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: -10 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.28} />
                <stop offset="60%" stopColor={stroke} stopOpacity={0.08} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#3A3E43" }}
              interval={Math.floor(data.length / 8)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#3A3E43" }}
              ticks={yTicks}
              domain={[yTicks[0], yTicks[yTicks.length - 1]]}
            />
            <Tooltip
              contentStyle={{ fontSize: 11, borderRadius: 4, border: `1px solid ${stroke}` }}
              labelStyle={{ color: "#3A3E43" }}
            />
            <Area
              dataKey="value"
              type="monotone"
              stroke={stroke}
              fill={`url(#${gradId})`}
              strokeWidth={2}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

