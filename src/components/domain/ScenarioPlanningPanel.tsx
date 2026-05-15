import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowCircleDownRight,
  ArrowCircleUpRight,
  ArrowCounterClockwise,
  ArrowRight,
  CheckCircle,
  Empty,
  Faders,
  Lightbulb,
  Sparkle,
  type Icon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/cn"
import {
  SCENARIO_ASSETS,
  SCENARIO_SUGGESTION,
  SCENARIO_SUMMARY,
  type ScenarioAsset,
  type ScenarioSummaryEntry,
  type SummaryTone,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/format"

interface ScenarioPlanningPanelProps {
  campaignName: string
  strategicIntent: string
}

export function ScenarioPlanningPanel({ strategicIntent }: ScenarioPlanningPanelProps) {
  const navigate = useNavigate()
  const { brandId = "", campaignId = "" } = useParams()
  const [prompt, setPrompt] = useState("")
  const [positions, setPositions] = useState<Record<string, number>>(
    Object.fromEntries(SCENARIO_ASSETS.map((a) => [a.id, a.trackPosition])),
  )

  const goToAsset = (assetId: string) => {
    if (!brandId || !campaignId) return
    navigate(`/brand/${brandId}/campaign/${campaignId}/asset/${assetId}`)
  }

  const reset = () => {
    setPositions(Object.fromEntries(SCENARIO_ASSETS.map((a) => [a.id, a.trackPosition])))
    setPrompt("")
  }

  return (
    <section className="my-10 flex w-full flex-col gap-5 rounded-[10px] border border-cai-gray-300 bg-white p-6">
      <header className="flex items-start justify-between">
        <div className="inline-flex items-center gap-3">
          <Faders weight="regular" className="h-8 w-8 text-power-blue-300" />
          <span className="text-xl leading-7 text-power-blue-300">Scenario Planning</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1 rounded bg-[#F9F9F9] px-3 py-2 text-base leading-5 text-[#22252B] transition-colors hover:bg-cai-gray-200"
        >
          <ArrowCounterClockwise className="h-5 w-5" />
          Reset
        </button>
      </header>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium leading-7 text-cai-black">
          Reallocate Spend within Campaign
        </h2>
        <div className="flex flex-wrap items-start justify-between gap-4 text-xs leading-4 text-[#657386]">
          <p className="max-w-[854px]">
            Drag any slider to model spend changes. Slider position reflects the asset’s current
            spend size, so larger investments sit further along the track. Reallocations are locked
            within Strategic Intent:
          </p>
          <p className="text-right font-medium">{strategicIntent}</p>
        </div>
      </div>

      <AIPromptCard prompt={prompt} onPromptChange={setPrompt} />

      <SuggestionHint />

      <div className="flex flex-wrap items-stretch gap-2.5">
        {SCENARIO_SUMMARY.map((entry) => (
          <SummaryKpiCard key={entry.label} entry={entry} />
        ))}
      </div>

      <div className="flex w-full flex-col gap-2">
        {SCENARIO_ASSETS.map((asset) => {
          const value = positions[asset.id] ?? asset.trackPosition
          return (
            <ScenarioRow
              key={asset.id}
              asset={asset}
              value={value}
              onChange={(v) =>
                setPositions((prev) => ({ ...prev, [asset.id]: v }))
              }
              onClick={() => goToAsset(asset.id)}
            />
          )
        })}
      </div>

      <FooterNote />
    </section>
  )
}

function AIPromptCard({
  prompt,
  onPromptChange,
}: {
  prompt: string
  onPromptChange: (v: string) => void
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-power-blue-200 bg-power-blue-50 p-6">
      <div className="inline-flex items-center gap-3">
        <Sparkle weight="regular" className="h-8 w-8 text-power-blue-300" />
        <span className="text-xl leading-7 text-power-blue-300">
          Tell AI how to adjust the scenario
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder='e.g. "Cut underperformers by 30% and boost top performer 20%"'
          className="flex-1 rounded border border-[#ECECEE] bg-white px-3 py-2 text-base leading-5 text-[#22252B] placeholder:text-[#8F9299] focus:border-power-blue-300 focus:outline-none focus:ring-2 focus:ring-power-blue-300/30"
        />
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 rounded bg-power-blue-300 px-3 py-2 text-base leading-5 text-white transition-colors hover:bg-power-blue-400"
        >
          <CheckCircle className="h-5 w-5" />
          Apply
        </button>
      </div>
    </div>
  )
}

function SuggestionHint() {
  return (
    <div className="flex w-full items-start gap-3 rounded-lg border border-power-blue-200 bg-power-blue-50 p-6">
      <Lightbulb weight="regular" className="h-8 w-8 shrink-0 text-power-blue-300" />
      <div className="flex flex-col gap-0.5 text-sm leading-[18px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[#111215]">Suggested reallocation:</span>
          <span className="text-[#22252B]">
            Shift ~{SCENARIO_SUGGESTION.shiftAmount} from {SCENARIO_SUGGESTION.shiftFromName}
          </span>
          <ArrowRight className="h-[18px] w-[18px] text-[#22252B]" />
          <span className="text-[#22252B]">{SCENARIO_SUGGESTION.shiftToName}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#111215]">{SCENARIO_SUGGESTION.shiftToName} returns</span>
          <span className="text-[#22252B]">{SCENARIO_SUGGESTION.returnsLabel}</span>
          <span className="text-[#22252B]">{SCENARIO_SUGGESTION.comparisonLabel}</span>
        </div>
      </div>
    </div>
  )
}

const TONE_STYLES: Record<
  SummaryTone,
  { wrap: string; text: string; Icon: Icon }
> = {
  positive: {
    wrap: "bg-fresh-green-50 border-fresh-green-300",
    text: "text-fresh-green-300",
    Icon: ArrowCircleUpRight,
  },
  caution: {
    wrap: "bg-hello-yellow-50 border-hello-yellow-300",
    text: "text-hello-yellow-300",
    Icon: ArrowCircleDownRight,
  },
  critical: {
    wrap: "bg-fire-red-100/30 border-fire-red-300",
    text: "text-fire-red-300",
    Icon: ArrowCircleDownRight,
  },
  neutral: {
    wrap: "bg-[#F2F2F3] border-cai-gray-500",
    text: "text-cai-gray-500",
    Icon: Empty,
  },
}

function SummaryKpiCard({ entry }: { entry: ScenarioSummaryEntry }) {
  const tone = TONE_STYLES[entry.tone]
  const sign = entry.deltaPercent > 0 ? "+" : ""
  return (
    <div className="flex min-w-[200px] flex-1 flex-col gap-3 rounded-lg border border-cai-gray-300 bg-[#F9F9F9] p-6">
      <span className="text-sm leading-4 text-cai-gray-600">{entry.label}</span>
      <div className="flex flex-col items-start gap-2">
        <span className="font-display text-[37px] font-medium leading-[38px] text-trust-blue-300 tabular-nums">
          {entry.value}
        </span>
        <div className={cn("inline-flex items-center gap-1 rounded border px-3 py-1", tone.wrap)}>
          <tone.Icon className={cn("h-5 w-5", tone.text)} />
          <span className={cn("text-xl leading-7", tone.text)}>
            {sign}
            {entry.deltaPercent}%
          </span>
        </div>
        <span className="text-base leading-[18px] text-cai-gray-400">{entry.fromLabel}</span>
      </div>
    </div>
  )
}

function ScenarioRow({
  asset,
  value,
  onChange,
  onClick,
}: {
  asset: ScenarioAsset
  value: number
  onChange: (v: number) => void
  onClick?: () => void
}) {
  const stopBubble = (e: React.MouseEvent | React.KeyboardEvent) => e.stopPropagation()
  const deltaColor =
    asset.deltaPercent > 0
      ? "text-fresh-green-300"
      : asset.deltaPercent < 0
        ? "text-fire-red-300"
        : "text-[#657386]"
  const sign = asset.deltaPercent > 0 ? "+" : ""

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
      className={cn(
        "flex items-center gap-4 rounded-lg border border-cai-gray-300 bg-[#F2F2F3] px-7 py-[18px]",
        onClick && "cursor-pointer transition-colors hover:bg-[#EAEAEC] focus:bg-[#EAEAEC] focus:outline-none",
      )}
    >
      <div className="flex w-[300px] shrink-0 flex-col">
        <span className="text-base font-medium leading-5 text-cai-black">{asset.name}</span>
        <span className="text-[11px] leading-4 text-[#657386]">
          {asset.brandLabel} · {asset.campaignLabel} · {formatCurrency(asset.baselineSpend)}{" "}
          current → {formatCurrency(asset.baselineMrr)} MRR
        </span>
      </div>
      <div className="relative flex-1">
        <div className="h-2 w-full rounded-full bg-cai-gray-300" />
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-power-blue-300"
          style={{ width: `${value}%` }}
        />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onClick={stopBubble}
          onKeyDown={stopBubble}
          aria-label={`${asset.name} spend allocation`}
          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent
                     [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-power-blue-300
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm
                     [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-power-blue-300
                     [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex shrink-0 items-center gap-1.5 text-right text-[11px] leading-4">
        <span className={cn("w-[51px] font-medium tabular-nums", deltaColor)}>
          {sign}
          {asset.deltaPercent}%
        </span>
        <div className="flex w-[100px] flex-col text-[#657386]">
          <span className="font-normal">{formatCurrency(asset.adjustedSpend)} spend</span>
          <span className="font-medium">{formatCurrency(asset.adjustedMrr)} MRR</span>
        </div>
      </div>
    </div>
  )
}

function FooterNote() {
  return (
    <div className="flex w-full items-start gap-3 rounded-lg border border-power-blue-200 bg-power-blue-50 p-6">
      <Sparkle weight="regular" className="h-8 w-8 shrink-0 text-power-blue-300" />
      <p className="text-base leading-7 text-power-blue-300">
        Forecast uses each asset’s current MRR/spend efficiency with a diminishing-returns curve.
        Reallocations are simulated only — no live budget changes are made.
      </p>
    </div>
  )
}
