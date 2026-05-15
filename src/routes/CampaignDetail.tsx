import { Navigate, useParams, Link } from "react-router-dom"
import { CaretRight, ArrowCircleUpRight, TrendDown, TrendUp, Minus, type Icon } from "@phosphor-icons/react"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { ChannelPill } from "@/components/domain/ChannelPill"
import { ScenarioPlanningPanel } from "@/components/domain/ScenarioPlanningPanel"
import { cn } from "@/lib/cn"
import {
  CAMPAIGN_DETAIL_ASSETS,
  CAMPAIGN_DETAIL_KPIS,
  getBrand,
  getCampaign,
  type Asset,
  type AssetAction,
  type AssetStatus,
} from "@/lib/mock-data"
import { formatCount, formatCurrency } from "@/lib/format"

export default function CampaignDetail() {
  const { brandId = "", campaignId = "" } = useParams()
  const brand = getBrand(brandId)
  const campaign = getCampaign(brandId, campaignId)
  if (!brand || !campaign) return <Navigate to="/" replace />

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Executive Summary", href: "/" },
          { label: brand.name, href: `/brand/${brand.id}` },
          { label: campaign.name },
        ]}
      />
      <div className="flex flex-wrap items-start justify-between gap-8 bg-cai-gray-200 px-10 py-[30px]">
        <div className="flex max-w-[575px] flex-col items-start gap-5">
          <span className="text-sm font-medium leading-5 text-power-blue-300">Campaign Detail</span>
          <div className="flex w-full flex-col items-start gap-2">
            <h1 className="font-display text-[36px] font-medium leading-[39px] text-cai-black">
              {campaign.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm leading-5 text-[#657386]">
              <span>{brand.name}</span>
              <span>/</span>
              <span>{campaign.intent}</span>
              <span>/</span>
              <span>{campaign.assetCount} Assets</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              ...campaign.tags,
              { label: "SEO", category: "search" as const },
              { label: "Social Media", category: "channel" as const },
            ].map((t) => (
              <ChannelPill key={t.label} tag={t} variant="uniform" />
            ))}
          </div>
        </div>
        <div className="flex w-full max-w-[740px] items-stretch gap-2">
          {CAMPAIGN_DETAIL_KPIS.map((k) => (
            <div
              key={k.label}
              className="flex flex-1 flex-col items-start gap-3 overflow-clip rounded-lg border border-cai-gray-300 bg-white p-6"
            >
              <span className="w-full text-sm leading-4 text-cai-gray-600">{k.label}</span>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="font-display text-[28px] font-medium leading-[38px] text-trust-blue-300">
                  {k.value}
                </span>
                <div className="flex w-full items-center gap-1">
                  <ArrowCircleUpRight className="h-5 w-5 text-fresh-green-300 shrink-0" />
                  <span className="flex-1 text-xl font-light leading-7 text-fresh-green-300">
                    {k.delta}
                  </span>
                </div>
                <span className="text-base leading-[18px] text-cai-gray-400">{k.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="border-b border-cai-gray-300 bg-white px-[30px] py-4">
          <h2 className="text-base font-semibold leading-6 text-cai-black">Assets in this Campaign</h2>
          <p className="mt-1 text-xs leading-4 text-[#657386]">
            Click any asset to drill into detail and review the AI recommendation.
          </p>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[1400px]">
            {CAMPAIGN_DETAIL_ASSETS.map((a) => (
              <AssetRow
                key={a.id}
                asset={a}
                href={`/brand/${brand.id}/campaign/${campaign.id}/asset/${a.id}`}
              />
            ))}
          </div>
        </div>
        <div className="px-[30px]">
          <ScenarioPlanningPanel
            campaignName={campaign.name}
            strategicIntent={campaign.intent}
          />
        </div>
      </section>
    </>
  )
}

const STATUS_META: Record<AssetStatus, { label: string; Icon: Icon }> = {
  underperforming: { label: "Underperforming", Icon: TrendDown },
  "on-target": { label: "On Target", Icon: Minus },
  outperforming: { label: "Outperforming", Icon: TrendUp },
  "top-performer": { label: "Top Performer", Icon: TrendUp },
}

const ACTION_META: Record<AssetAction, { label: string; classes: string }> = {
  optimize: {
    label: "Optimize",
    classes:
      "border-impact-orange-300 bg-[#FFF2E7] text-impact-orange-300 hover:bg-impact-orange-300/15 focus-visible:ring-impact-orange-300/40",
  },
  stop: {
    label: "Stop",
    classes:
      "border-fire-red-300 bg-[#FFEBEB] text-fire-red-300 hover:bg-fire-red-300/15 focus-visible:ring-fire-red-300/40",
  },
  scale: {
    label: "Scale",
    classes:
      "border-fresh-green-300 bg-fresh-green-50 text-fresh-green-300 hover:bg-fresh-green-300/15 focus-visible:ring-fresh-green-300/40",
  },
}

function AssetRow({ asset, href }: { asset: Asset; href: string }) {
  const { label: statusLabel, Icon: StatusIcon } = STATUS_META[asset.status]
  const action = ACTION_META[asset.action ?? "optimize"]
  const metrics: { label: string; value: string }[] = [
    { label: "IMPR", value: asset.impressions != null ? formatCount(asset.impressions) : "—" },
    { label: "Eng%", value: `${asset.engPct.toFixed(2)}%` },
    { label: "CPM", value: `$${asset.cpm}` },
    { label: "Leads", value: asset.leads.toLocaleString() },
    { label: "Key Ind", value: `${asset.keyInd.toFixed(2)}%` },
    { label: "MRR", value: formatCurrency(asset.mrr) },
    { label: "Spend", value: formatCurrency(asset.spend) },
  ]

  return (
    <div className="flex items-center gap-6 border-b border-cai-gray-300 bg-white px-[30px] py-5 transition-colors hover:bg-cai-gray-200/30">
      <div className="flex w-[200px] shrink-0 flex-col gap-0.5">
        <span className="text-sm font-medium leading-5 text-cai-black">{asset.name} —</span>
        <span className="text-xs leading-[18px] text-cai-gray-500">{asset.type}</span>
      </div>
      <div className="flex h-10 w-[110px] shrink-0 flex-col justify-between">
        <span className="text-xs leading-[18px] text-cai-gray-500">Channels</span>
        <span className="text-sm font-medium leading-5 text-cai-black">
          {asset.channelsCount ?? 1}
        </span>
      </div>
      <div className="flex h-10 w-[170px] shrink-0 flex-col justify-between">
        <span className="text-xs leading-[18px] text-cai-gray-500">Status</span>
        <div className="flex items-center gap-1.5">
          <StatusIcon className="h-[18px] w-[18px] text-cai-black" />
          <span className="text-sm font-medium leading-5 text-cai-black">{statusLabel}</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex h-10 min-w-0 flex-1 flex-col justify-between">
            <span className="text-xs leading-[18px] text-cai-gray-500">{m.label}</span>
            <span className="truncate text-sm font-medium leading-5 text-cai-black tabular-nums">
              {m.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          className={cn(
            "w-[88px] rounded border px-3 py-2 text-sm leading-4 transition-colors focus:outline-none focus-visible:ring-2",
            action.classes,
          )}
        >
          {action.label}
        </button>
        <Link
          to={href}
          className="text-cai-gray-500 hover:text-power-blue-300"
          aria-label="Open asset detail"
        >
          <CaretRight className="h-6 w-6" weight="bold" />
        </Link>
      </div>
    </div>
  )
}
