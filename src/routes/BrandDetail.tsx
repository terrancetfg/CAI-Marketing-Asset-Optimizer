import { useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { CaretDown, CaretRight, ChartLineUp, ChartLineDown, ArrowDown, ArrowUp } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { PageHeaderBanner } from "@/components/domain/PageHeaderBanner"
import { BrandLogo } from "@/components/domain/BrandLogo"
import { ChannelPill, ChannelPillOverflow } from "@/components/domain/ChannelPill"
import { Switch } from "@/components/ui/Switch"
import { Tabs } from "@/components/ui/Tabs"
import { cn } from "@/lib/cn"
import { CAMPAIGNS_BY_BRAND, getBrand, type Campaign } from "@/lib/mock-data"

export default function BrandDetail() {
  const { brandId = "" } = useParams()
  const brand = getBrand(brandId)
  if (!brand) return <Navigate to="/" replace />

  const campaigns = CAMPAIGNS_BY_BRAND[brand.id] ?? []

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Executive Summary", href: "/" },
          { label: brand.name },
        ]}
      />
      <PageHeaderBanner
        title={<BrandLogo brand={brand} size="lg" className="h-12" />}
        description="Top and bottom 10 campaigns ranked by MRR. Expand a row to see assets; click a campaign or asset to drill in."
        trailing={
          <div className="flex items-center gap-6 pt-2">
            <Switch defaultChecked label="Primary Benchmarks" id="primary-bench" />
            <Switch defaultChecked label="Secondary Benchmarks" id="secondary-bench" />
          </div>
        }
      />
      <section>
        <Tabs
          defaultValue="bottom"
          items={[
            {
              value: "bottom",
              label: "Bottom 10 Campaigns",
              icon: <ChartLineDown className="h-5 w-5" />,
              content: <CampaignTable campaigns={campaigns} brandId={brand.id} />,
            },
            {
              value: "top",
              label: "Top 10 Campaigns",
              icon: <ChartLineUp className="h-5 w-5" />,
              content: <CampaignTable campaigns={campaigns} brandId={brand.id} />,
            },
          ]}
        />
      </section>
    </>
  )
}

interface CampaignTableProps {
  campaigns: Campaign[]
  brandId: string
}

const COLUMN_TEMPLATE =
  "grid-cols-[24px_32px_minmax(220px,1.4fr)_minmax(260px,1.6fr)_repeat(8,minmax(62px,1fr))]"

const METRIC_HEADERS = ["IMPR", "ENG%", "CPM", "Leads", "Opps", "L→O", "MRR", "Spend"]

function CampaignTable({ campaigns, brandId }: CampaignTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  if (campaigns.length === 0) {
    return (
      <div className="m-8 rounded-lg border border-dashed border-cai-gray-300 p-8 text-center text-sm text-cai-gray-500">
        No campaigns yet for this brand.
      </div>
    )
  }
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1180px]">
        <CampaignTableHeader />
        {campaigns.map((c) => {
          const expanded = expandedId === c.id
          return (
            <div key={c.id}>
              <CampaignRow
                campaign={c}
                expanded={expanded}
                onToggle={() => setExpandedId(expanded ? null : c.id)}
                brandId={brandId}
              />
              {expanded && <AssetSubTable campaign={c} brandId={brandId} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CampaignTableHeader() {
  return (
    <div
      className={cn(
        "grid items-center gap-x-4 border-b border-cai-gray-300 bg-white px-[30px] py-[10px] text-sm font-medium text-cai-black",
        COLUMN_TEMPLATE,
      )}
    >
      <div aria-hidden />
      <div>#</div>
      <div>Campaign</div>
      <div>Channels</div>
      {METRIC_HEADERS.map((label) => (
        <div key={label} className="text-right">
          {label}
        </div>
      ))}
    </div>
  )
}

function CampaignRow({
  campaign,
  expanded,
  onToggle,
  brandId,
}: {
  campaign: Campaign
  expanded: boolean
  onToggle: () => void
  brandId: string
}) {
  const navigate = useNavigate()
  const goToCampaign = () =>
    navigate(`/brand/${brandId}/campaign/${campaign.id}`)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={goToCampaign}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          goToCampaign()
        }
      }}
      className={cn(
        "grid cursor-pointer items-center gap-x-4 border-b border-cai-gray-300 bg-white px-[30px] py-5 transition-colors hover:bg-cai-gray-200/40 focus:bg-cai-gray-200/40 focus:outline-none",
        COLUMN_TEMPLATE,
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        className="text-navy-500 hover:text-cai-blue"
        aria-label={expanded ? "Collapse campaign" : "Expand campaign"}
      >
        {expanded ? <CaretDown className="h-4 w-4" /> : <CaretRight className="h-4 w-4" />}
      </button>
      <div className="text-sm font-medium text-navy-700">{campaign.rank}</div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-navy-800">{campaign.name}</div>
        <div className="text-xs text-navy-500">
          {campaign.intent} · {campaign.assetCount} assets
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {campaign.tags.map((t) => (
          <ChannelPill key={t.label} tag={t} variant="uniform" />
        ))}
        {campaign.extraTagCount ? (
          <ChannelPillOverflow count={campaign.extraTagCount} variant="uniform" />
        ) : null}
      </div>
      {campaign.metrics.map((m, i) => {
        const up = m.deltaDir === "up"
        const Arrow = up ? ArrowUp : ArrowDown
        return (
          <div key={i} className="flex flex-col items-end">
            <div className="text-sm text-cai-black tabular-nums">{m.value}</div>
            <div
              className={cn(
                "inline-flex items-center gap-[3px] text-xs font-medium tabular-nums",
                up ? "text-fresh-green-300" : "text-impact-orange-300",
              )}
            >
              <Arrow className="h-3.5 w-3.5" weight="bold" />
              {m.delta}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AssetSubTable({ campaign, brandId }: { campaign: Campaign; brandId: string }) {
  return (
    <div className="border-b border-cai-gray-300 bg-cai-gray-200/30 px-[30px] py-6">
      <div className="mb-3 text-sm font-semibold text-trust-blue-400">Assets in Campaign</div>
      <div className="space-y-2">
        {campaign.assets.map((a) => (
          <Link
            key={a.id}
            to={`/brand/${brandId}/campaign/${campaign.id}/asset/${a.id}`}
            className="grid grid-cols-[minmax(160px,1.4fr)_repeat(6,minmax(70px,1fr))_24px] items-center gap-x-4 rounded-md bg-navy-50/60 px-4 py-3 transition-colors hover:bg-navy-50"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-navy-800">{a.name}</div>
              <div className="text-xs text-navy-500">{a.type}</div>
            </div>
            <SubMetric label="Eng%" value={`${a.engPct.toFixed(2)}%`} />
            <SubMetric label="CPM" value={`$${a.cpm}`} />
            <SubMetric label="Leads" value={a.leads.toLocaleString()} />
            <SubMetric label="Key Ind" value={`${a.keyInd.toFixed(2)}%`} />
            <SubMetric label="MRR" value={`$${(a.mrr / 1000).toFixed(1)}k`} />
            <SubMetric label="Spend" value={`$${(a.spend / 1000).toFixed(1)}k`} />
            <CaretRight className="h-4 w-4 justify-self-end text-navy-500" />
          </Link>
        ))}
      </div>
    </div>
  )
}

function SubMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-navy-500">{label}</span>
      <span className="text-sm font-semibold text-navy-800 tabular-nums">{value}</span>
    </div>
  )
}
