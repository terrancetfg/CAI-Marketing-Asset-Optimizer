import { ArrowCircleUpRight, ArrowCircleDownRight, type Icon } from "@phosphor-icons/react"
import { cn } from "@/lib/cn"

interface StatCardHeroProps {
  label: string
  value: string
  delta: string
  deltaDir: "up" | "down"
  tone?: "positive" | "caution" | "negative"
  period: string
}

const TONE_COLOR: Record<NonNullable<StatCardHeroProps["tone"]>, string> = {
  positive: "text-fresh-green-300",
  caution: "text-hello-yellow-300",
  negative: "text-impact-orange-300",
}

export function StatCardHero({
  label,
  value,
  delta,
  deltaDir,
  tone = "caution",
  period,
}: StatCardHeroProps) {
  const ArrowIcon: Icon = deltaDir === "up" ? ArrowCircleUpRight : ArrowCircleDownRight
  const toneClass = TONE_COLOR[tone]
  return (
    <div className="group relative overflow-hidden rounded-lg bg-trust-blue-300 p-[30px] text-white transition-shadow duration-300 hover:shadow-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-no-repeat opacity-60 mix-blend-screen transition-[background-position,opacity] duration-700 ease-out [background-position:right_15%] group-hover:opacity-80 group-hover:[background-position:right_40%]"
        style={{
          backgroundImage: "url('/patterns/cai-57degree-rays.svg')",
          backgroundSize: "auto 200%",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-trust-blue-400/40" />
      <div className="relative z-10 flex flex-col">
        <span className="text-sm leading-4 text-white">{label}</span>
        <span className="text-[51px] font-light leading-[61.2px] tracking-[-2.08px] text-energy-aqua-300">
          {value}
        </span>
        <div className="flex items-center gap-2">
          <ArrowIcon weight="regular" className={cn("h-6 w-6 shrink-0", toneClass)} />
          <span className={cn("text-2xl font-light leading-[39px]", toneClass)}>{delta}</span>
        </div>
        <span className="text-sm leading-4 text-white/80">{period}</span>
      </div>
    </div>
  )
}
