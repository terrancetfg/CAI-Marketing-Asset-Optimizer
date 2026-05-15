import {
  Monitor,
  Megaphone,
  Television,
  MagnifyingGlass,
  Envelope,
  DeviceMobile,
  Globe,
  Calendar,
  Rocket,
  Tag,
  ShareNetwork,
  type Icon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/cn"
import type { ChannelTag } from "@/lib/mock-data"

const CATEGORY_STYLE: Record<ChannelTag["category"], string> = {
  channel: "bg-pill-channel-bg text-pill-channel-fg",
  type: "bg-pill-type-bg text-pill-type-fg",
  format: "bg-pill-format-bg text-pill-format-fg",
  search: "bg-pill-search-bg text-pill-search-fg",
}

const ICON_BY_LABEL: Record<string, Icon> = {
  Display: Monitor,
  Program: Megaphone,
  Campaign: Megaphone,
  Awareness: Megaphone,
  Launch: Rocket,
  Promotion: Tag,
  Event: Calendar,
  CTV: Television,
  Mobile: DeviceMobile,
  Online: Globe,
  Search: MagnifyingGlass,
  SEO: MagnifyingGlass,
  PPC: MagnifyingGlass,
  Email: Envelope,
  "Social Media": ShareNetwork,
  "Landing Page": Globe,
}

interface ChannelPillProps {
  tag: ChannelTag
  size?: "sm" | "md"
  variant?: "category" | "uniform"
  className?: string
}

export function ChannelPill({ tag, size = "md", variant = "category", className }: ChannelPillProps) {
  const Icon = ICON_BY_LABEL[tag.label] ?? Tag
  const variantClasses =
    variant === "uniform"
      ? "border border-power-blue-300 bg-power-blue-300/10 text-power-blue-300"
      : CATEGORY_STYLE[tag.category]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2 py-1 text-sm",
        variantClasses,
        className,
      )}
    >
      <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      <span>{tag.label}</span>
    </span>
  )
}

interface ChannelPillOverflowProps {
  count: number
  size?: "sm" | "md"
  variant?: "category" | "uniform"
}

export function ChannelPillOverflow({ count, size = "md", variant = "category" }: ChannelPillOverflowProps) {
  const variantClasses =
    variant === "uniform"
      ? "border border-power-blue-300 bg-power-blue-300/10 text-power-blue-300"
      : "bg-pill-overflow-bg text-pill-overflow-fg"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2 py-1 text-sm",
        variantClasses,
      )}
    >
      +{count}
    </span>
  )
}
