export type BrandId =
  | "autotrader"
  | "kelley-blue-book"
  | "manheim"
  | "dealertrack"
  | "vauto"
  | "dealer-com"
  | "nextgear-capital"
  | "vinsolutions"
  | "xtime"

export interface Brand {
  id: BrandId
  name: string
  logoSrc: string
  mark: string
  markColor: string
  mrrScore: number
  metrics: BrandMetrics
}

export interface BrandMetrics {
  activeCampaigns: { value: number; delta: number }
  allSpend: { value: number; delta: number }
  leadsGenerated: { value: number; delta: number }
  oppRate: { value: number; delta: number }
  mrr: { value: number; delta: number }
  engagement: { value: number; delta: number }
}

export type ChannelTag = {
  label: string
  category: "channel" | "type" | "format" | "search"
}

export interface Campaign {
  id: string
  rank: number
  name: string
  intent: string
  assetCount: number
  tags: ChannelTag[]
  extraTagCount?: number
  metrics: {
    label: string
    value: string
    delta: string
    deltaDir: "up" | "down"
  }[]
  assets: Asset[]
}

export type AssetStatus = "underperforming" | "on-target" | "outperforming" | "top-performer"

export type AssetAction = "optimize" | "stop" | "scale"

export interface Asset {
  id: string
  name: string
  type: string
  channelTag: ChannelTag
  status: AssetStatus
  engPct: number
  cpm: number
  leads: number
  keyInd: number
  mrr: number
  spend: number
  channelsCount?: number
  impressions?: number
  action?: AssetAction
}

// ---------- Brands ----------

export const BRANDS: Brand[] = [
  {
    id: "autotrader",
    name: "Autotrader",
    logoSrc: "/logos/autotrader.svg",
    mark: "A",
    markColor: "#FF6A00",
    mrrScore: 56,
    metrics: standardBrandMetrics(),
  },
  {
    id: "kelley-blue-book",
    name: "Kelley Blue Book",
    logoSrc: "/logos/kelley-blue-book.svg",
    mark: "K",
    markColor: "#0B2C66",
    mrrScore: 74,
    metrics: standardBrandMetrics(),
  },
  {
    id: "manheim",
    name: "Manheim",
    logoSrc: "/logos/manheim.svg",
    mark: "M",
    markColor: "#0F2547",
    mrrScore: 89,
    metrics: standardBrandMetrics(),
  },
  {
    id: "dealertrack",
    name: "Dealertrack",
    logoSrc: "/logos/dealertrack.svg",
    mark: "D",
    markColor: "#1F4E79",
    mrrScore: 68,
    metrics: standardBrandMetrics(),
  },
  {
    id: "vauto",
    name: "vAuto",
    logoSrc: "/logos/vauto.svg",
    mark: "v",
    markColor: "#F58220",
    mrrScore: 50,
    metrics: standardBrandMetrics(),
  },
  {
    id: "dealer-com",
    name: "Dealer.com",
    logoSrc: "/logos/dealer-com.svg",
    mark: "•",
    markColor: "#0B7BB8",
    mrrScore: 38,
    metrics: standardBrandMetrics(),
  },
  {
    id: "nextgear-capital",
    name: "NextGear Capital",
    logoSrc: "/logos/nextgear-capital.svg",
    mark: "G",
    markColor: "#1E7F4A",
    mrrScore: 52,
    metrics: standardBrandMetrics(),
  },
  {
    id: "vinsolutions",
    name: "VinSolutions",
    logoSrc: "/logos/vinsolutions.svg",
    mark: "V",
    markColor: "#1B4F8A",
    mrrScore: 62,
    metrics: standardBrandMetrics(),
  },
  {
    id: "xtime",
    name: "xtime",
    logoSrc: "/logos/xtime.svg",
    mark: "x",
    markColor: "#F36B21",
    mrrScore: 45,
    metrics: standardBrandMetrics(),
  },
]

function standardBrandMetrics(): BrandMetrics {
  return {
    activeCampaigns: { value: 10, delta: 3 },
    allSpend: { value: 860700, delta: 10000 },
    leadsGenerated: { value: 13100, delta: 3 },
    oppRate: { value: 26.5, delta: 3 },
    mrr: { value: 2810000, delta: 121000 },
    engagement: { value: 6.15, delta: 3 },
  }
}

// ---------- Executive Summary hero/summary KPIs ----------

export const HERO_KPIS = [
  { label: "Upside Potential", value: "$641k", delta: "$12.8k", deltaDir: "down" as const, tone: "caution" as const, period: "Since last week" },
  { label: "Recoverable Value", value: "$1.87m", delta: "$800k", deltaDir: "up" as const, tone: "positive" as const, period: "Since last week" },
  { label: "Spend at Risk", value: "$60.1k", delta: "$12.8k", deltaDir: "down" as const, tone: "caution" as const, period: "Since last week" },
]

export const SUMMARY_KPIS = [
  { label: "Active Campaigns", value: "92" },
  { label: "Total Investment", value: "$7.07M" },
  { label: "Total Leads", value: "100.5k" },
  { label: "Total MRR", value: "$21.72M" },
]

export const KPI_OPTIONS = ["MRR", "Spend", "Leads", "Opps", "Eng Rate", "Rate", "CPM"] as const
export type KpiOption = (typeof KPI_OPTIONS)[number]

// ---------- Campaigns (Brand Detail) ----------

const sampleCampaignMetrics = (mult: number) => ([
  { label: "Impressions", value: `${(1918 * mult / 1000).toFixed(1).replace(/\.0$/, "")}k`.replace(/^0$/, "0"), delta: "+1730%", deltaDir: "up" as const },
  { label: "Eng %", value: "5.29%", delta: "-362.3%", deltaDir: "down" as const },
  { label: "CPM", value: "$65", delta: "-362.3%", deltaDir: "down" as const },
  { label: "Leads", value: "2562", delta: "+1730%", deltaDir: "up" as const },
  { label: "Key Ind", value: "776", delta: "-22", deltaDir: "down" as const },
  { label: "Opp Rate", value: "30.3%", delta: "+1730%", deltaDir: "up" as const },
  { label: "MRR", value: "$545.6k", delta: "+1730%", deltaDir: "up" as const },
  { label: "Spend", value: "$124.1k", delta: "+1730%", deltaDir: "up" as const },
])

const sampleAssets = (campaignId: string): Asset[] => [
  {
    id: `${campaignId}-a1`,
    name: "Brand Keywords",
    type: "Search",
    channelTag: { label: "Search", category: "search" },
    status: "underperforming",
    engPct: 8.79,
    cpm: 11,
    leads: 660,
    keyInd: 20.61,
    mrr: 54700,
    spend: 7400,
  },
  {
    id: `${campaignId}-a2`,
    name: "Banner 728x90",
    type: "Display",
    channelTag: { label: "Display", category: "channel" },
    status: "underperforming",
    engPct: 5.78,
    cpm: 80,
    leads: 55,
    keyInd: 10.91,
    mrr: 36300,
    spend: 33500,
  },
  {
    id: `${campaignId}-a3`,
    name: "Demo Request",
    type: "Landing Page",
    channelTag: { label: "Landing Page", category: "format" },
    status: "underperforming",
    engPct: 8.55,
    cpm: 54,
    leads: 161,
    keyInd: 44.72,
    mrr: 20600,
    spend: 38500,
  },
]

const TAG_PATTERNS: { tags: ChannelTag[]; extra: number }[] = [
  {
    tags: [
      { label: "Display", category: "channel" },
      { label: "Program", category: "type" },
      { label: "CTV", category: "format" },
      { label: "Search", category: "search" },
    ],
    extra: 2,
  },
  {
    tags: [
      { label: "Social Media", category: "channel" },
      { label: "Campaign", category: "type" },
      { label: "Mobile", category: "format" },
      { label: "Search", category: "search" },
    ],
    extra: 3,
  },
  {
    tags: [
      { label: "Email", category: "channel" },
      { label: "Awareness", category: "type" },
      { label: "Online", category: "format" },
      { label: "SEO", category: "search" },
    ],
    extra: 1,
  },
  {
    tags: [
      { label: "Display", category: "channel" },
      { label: "Event", category: "type" },
      { label: "CTV", category: "format" },
      { label: "PPC", category: "search" },
    ],
    extra: 4,
  },
  {
    tags: [
      { label: "Email", category: "channel" },
      { label: "Launch", category: "type" },
      { label: "Mobile", category: "format" },
      { label: "PPC", category: "search" },
    ],
    extra: 2,
  },
  {
    tags: [
      { label: "Social Media", category: "channel" },
      { label: "Promotion", category: "type" },
      { label: "Online", category: "format" },
      { label: "Email", category: "search" },
    ],
    extra: 1,
  },
]

const METRIC_MULTIPLIERS = [1, 1, 1.1, 0.8, 1.6, 0.95, 1.25, 1.15, 0.78, 1.45]
const ASSET_COUNTS = [5, 5, 4, 6, 8, 3, 5, 5, 4, 6]

function buildCampaigns(
  prefix: string,
  campaignList: { name: string; intent: string }[],
): Campaign[] {
  return campaignList.map((c, i) => {
    const id = `${prefix}-${i + 1}`
    const pattern = TAG_PATTERNS[i % TAG_PATTERNS.length]
    return {
      id,
      rank: i + 1,
      name: c.name,
      intent: c.intent,
      assetCount: ASSET_COUNTS[i % ASSET_COUNTS.length],
      tags: pattern.tags,
      extraTagCount: pattern.extra,
      metrics: sampleCampaignMetrics(METRIC_MULTIPLIERS[i % METRIC_MULTIPLIERS.length]),
      assets: sampleAssets(id),
    }
  })
}

const KBB_CAMPAIGNS = [
  { name: "KBB Trade-In Calculator", intent: "Targeted Product Conversion" },
  { name: "Instant Cash Offer Push", intent: "Direct Response" },
  { name: "Best Resale Value Awards", intent: "Brand Awareness" },
  { name: "Used Car Buyer Guide", intent: "Education & Awareness" },
  { name: "Fair Purchase Price Tool", intent: "Lead Generation" },
  { name: "New Car Pricing Promo", intent: "Sales Promotion" },
  { name: "Vehicle History Reports", intent: "Trust Building" },
  { name: "Dealer Locator Spotlight", intent: "Local Engagement" },
  { name: "Annual Brand Image Awards", intent: "Brand Awareness" },
  { name: "Electric Vehicle Showcase", intent: "Product Awareness" },
]

const MANHEIM_CAMPAIGNS = [
  { name: "Wholesale Market Index Spotlight", intent: "Industry Insights" },
  { name: "Simulcast Auction Promo", intent: "User Engagement" },
  { name: "Manheim Express Buy", intent: "Direct Response" },
  { name: "CR Score Inspection Service", intent: "Trust Building" },
  { name: "Q3 Mega Auction Event", intent: "Event Promotion" },
  { name: "Sourcing Solutions Launch", intent: "Product Awareness" },
  { name: "Floor Plan Buyer Match", intent: "Lead Generation" },
  { name: "EV Wholesale Marketplace", intent: "Product Awareness" },
  { name: "Total Resource Auctions", intent: "Sales Promotion" },
  { name: "AutoCheck Vehicle History Push", intent: "Trust Building" },
]

const DEALERTRACK_CAMPAIGNS = [
  { name: "Dealertrack DMS Q4 Push", intent: "Sales Promotion" },
  { name: "F&I Performance Suite Launch", intent: "Product Awareness" },
  { name: "Credit Application Network", intent: "Lead Generation" },
  { name: "Accounting Module Promotion", intent: "Cross-Sell" },
  { name: "Compliance Solutions Drive", intent: "Trust Building" },
  { name: "Digital Retailing Bundle", intent: "Targeted Product Conversion" },
  { name: "Service Lane Tech Upgrade", intent: "Customer Retention" },
  { name: "Registration & Title Bundle", intent: "Operational Efficiency" },
  { name: "Inventory Connection Sync", intent: "Cross-Sell" },
  { name: "Sales Workflow Optimization", intent: "Customer Retention" },
]

const VAUTO_CAMPAIGNS = [
  { name: "Provision Inventory Insights", intent: "Product Awareness" },
  { name: "Stockwave Sourcing Promo", intent: "Sales Promotion" },
  { name: "ProfitTime GPS Launch", intent: "Product Awareness" },
  { name: "Conquest New Car Tool", intent: "Targeted Product Conversion" },
  { name: "Market Watch Pricing", intent: "Lead Generation" },
  { name: "Variable Management Suite", intent: "Cross-Sell" },
  { name: "Used Car Velocity Plan", intent: "Sales Promotion" },
  { name: "Trade-In Appraisal Tool", intent: "Direct Response" },
  { name: "Inventory Health Index", intent: "User Engagement" },
  { name: "Q4 Optimization Webinar", intent: "Event Promotion" },
]

const DEALER_COM_CAMPAIGNS = [
  { name: "Responsive Website Refresh", intent: "Targeted Product Conversion" },
  { name: "SEM Conquest Campaign", intent: "Lead Generation" },
  { name: "Display Retargeting Suite", intent: "Conversion Optimization" },
  { name: "Social Media Manager Promo", intent: "Brand Awareness" },
  { name: "SEO Boost Service", intent: "Organic Growth" },
  { name: "Programmatic Display Push", intent: "Brand Awareness" },
  { name: "Digital Storefront Demo", intent: "Product Awareness" },
  { name: "CarFinder Inventory Search", intent: "User Engagement" },
  { name: "Mobile-First Site Upgrade", intent: "Product Awareness" },
  { name: "Total Performance Package", intent: "Sales Promotion" },
]

const NEXTGEAR_CAMPAIGNS = [
  { name: "Auction Floor Plan Drive", intent: "Lead Generation" },
  { name: "Account Portal Onboarding", intent: "Customer Retention" },
  { name: "Inventory Solutions Webinar", intent: "Event Promotion" },
  { name: "SmartAuction Funding", intent: "Targeted Product Conversion" },
  { name: "Q3 Dealer Activation", intent: "Sales Promotion" },
  { name: "Online Title Management", intent: "Operational Efficiency" },
  { name: "Flex Plan Loan Promo", intent: "Direct Response" },
  { name: "Wholesale Credit Line Push", intent: "Lead Generation" },
  { name: "Auto Inspection Service", intent: "Trust Building" },
  { name: "Dealer Direct Acquisition", intent: "Targeted Product Conversion" },
]

const VINSOLUTIONS_CAMPAIGNS = [
  { name: "Connect CRM Launch", intent: "Product Awareness" },
  { name: "Automotive Marketing Platform", intent: "Brand Awareness" },
  { name: "Connect Texting Promo", intent: "User Engagement" },
  { name: "Equity Mining Tool", intent: "Direct Response" },
  { name: "Service Marketing Suite", intent: "Cross-Sell" },
  { name: "Performance Reporting Push", intent: "User Engagement" },
  { name: "ILM Lead Management", intent: "Lead Generation" },
  { name: "Mobile App Onboarding", intent: "Customer Retention" },
  { name: "Q4 Retention Strategy", intent: "Customer Retention" },
  { name: "Customer Journey Insights", intent: "User Engagement" },
]

const XTIME_CAMPAIGNS = [
  { name: "Schedule Pro Update Push", intent: "Product Awareness" },
  { name: "Spectrum All-In-One Promo", intent: "Sales Promotion" },
  { name: "Service Lane Inspection Tech", intent: "Operational Efficiency" },
  { name: "Customer Loyalty Program", intent: "Customer Retention" },
  { name: "Engage Marketing Suite", intent: "Cross-Sell" },
  { name: "Online Scheduling Drive", intent: "Targeted Product Conversion" },
  { name: "Service Menu Optimization", intent: "Operational Efficiency" },
  { name: "Multi-Point Inspection Tool", intent: "Trust Building" },
  { name: "CSI Score Improvement Plan", intent: "Customer Retention" },
  { name: "Q3 Retention Initiative", intent: "Event Promotion" },
]

export const CAMPAIGNS_BY_BRAND: Record<BrandId, Campaign[]> = {
  autotrader: [
    {
      id: "at-loyalty",
      rank: 1,
      name: "AT Loyalty Rewards",
      intent: "Targeted Product Conversion",
      assetCount: 5,
      tags: [
        { label: "Display", category: "channel" },
        { label: "Program", category: "type" },
        { label: "CTV", category: "format" },
        { label: "Search", category: "search" },
      ],
      extraTagCount: 2,
      metrics: sampleCampaignMetrics(1),
      assets: sampleAssets("at-loyalty"),
    },
    {
      id: "at-trade-in",
      rank: 2,
      name: "AT Trade-In Value Campaign",
      intent: "Targeted Product Conversion",
      assetCount: 5,
      tags: [
        { label: "Display", category: "channel" },
        { label: "Program", category: "type" },
        { label: "CTV", category: "format" },
        { label: "Search", category: "search" },
      ],
      extraTagCount: 2,
      metrics: sampleCampaignMetrics(1),
      assets: sampleAssets("at-trade-in"),
    },
    {
      id: "at-smartphone",
      rank: 3,
      name: "Smartphone Upgrade Initiative",
      intent: "User Engagement",
      assetCount: 4,
      tags: [
        { label: "Social Media", category: "channel" },
        { label: "Campaign", category: "type" },
        { label: "Mobile", category: "format" },
        { label: "Search", category: "search" },
      ],
      extraTagCount: 3,
      metrics: sampleCampaignMetrics(1.1),
      assets: sampleAssets("at-smartphone"),
    },
    {
      id: "at-eco",
      rank: 4,
      name: "Eco-Friendly Product Line",
      intent: "Sustainability Awareness",
      assetCount: 6,
      tags: [
        { label: "Email", category: "channel" },
        { label: "Awareness", category: "type" },
        { label: "Online", category: "format" },
        { label: "SEO", category: "search" },
      ],
      extraTagCount: 1,
      metrics: sampleCampaignMetrics(0.8),
      assets: sampleAssets("at-eco"),
    },
    {
      id: "at-holiday",
      rank: 5,
      name: "Holiday Sales Boost",
      intent: "Sales Promotion",
      assetCount: 8,
      tags: [
        { label: "Display", category: "channel" },
        { label: "Event", category: "type" },
        { label: "CTV", category: "format" },
        { label: "PPC", category: "search" },
      ],
      extraTagCount: 4,
      metrics: sampleCampaignMetrics(1.6),
      assets: sampleAssets("at-holiday"),
    },
    {
      id: "at-newyear",
      rank: 6,
      name: "New Year Resolution Campaign",
      intent: "Fitness Engagement",
      assetCount: 3,
      tags: [
        { label: "Social Media", category: "channel" },
        { label: "Campaign", category: "type" },
        { label: "Mobile", category: "format" },
        { label: "Email", category: "search" },
      ],
      extraTagCount: 5,
      metrics: sampleCampaignMetrics(0.95),
      assets: sampleAssets("at-newyear"),
    },
    {
      id: "at-bts",
      rank: 7,
      name: "Back to School Promotions",
      intent: "Educational Offers",
      assetCount: 5,
      tags: [
        { label: "Email", category: "channel" },
        { label: "Campaign", category: "type" },
        { label: "Online", category: "format" },
        { label: "Search", category: "search" },
      ],
      extraTagCount: 3,
      metrics: sampleCampaignMetrics(1.25),
      assets: sampleAssets("at-bts"),
    },
    {
      id: "at-fitness",
      rank: 8,
      name: "Fitness Tracker Launch",
      intent: "Product Awareness",
      assetCount: 5,
      tags: [
        { label: "Display", category: "channel" },
        { label: "Launch", category: "type" },
        { label: "Mobile", category: "format" },
        { label: "PPC", category: "search" },
      ],
      extraTagCount: 2,
      metrics: sampleCampaignMetrics(1.15),
      assets: sampleAssets("at-fitness"),
    },
    {
      id: "at-valentines",
      rank: 9,
      name: "Valentine's Day Special",
      intent: "Romantic Offers",
      assetCount: 4,
      tags: [
        { label: "Social Media", category: "channel" },
        { label: "Campaign", category: "type" },
        { label: "Online", category: "format" },
        { label: "Email", category: "search" },
      ],
      extraTagCount: 1,
      metrics: sampleCampaignMetrics(0.78),
      assets: sampleAssets("at-valentines"),
    },
    {
      id: "at-summer",
      rank: 10,
      name: "Summer Sale Extravaganza",
      intent: "Seasonal Offers",
      assetCount: 6,
      tags: [
        { label: "Email", category: "channel" },
        { label: "Promotion", category: "type" },
        { label: "Mobile", category: "format" },
        { label: "SEO", category: "search" },
      ],
      extraTagCount: 4,
      metrics: sampleCampaignMetrics(1.45),
      assets: sampleAssets("at-summer"),
    },
  ],
  "kelley-blue-book": buildCampaigns("kbb", KBB_CAMPAIGNS),
  manheim: buildCampaigns("mh", MANHEIM_CAMPAIGNS),
  dealertrack: buildCampaigns("dt", DEALERTRACK_CAMPAIGNS),
  vauto: buildCampaigns("va", VAUTO_CAMPAIGNS),
  "dealer-com": buildCampaigns("dc", DEALER_COM_CAMPAIGNS),
  "nextgear-capital": buildCampaigns("ngc", NEXTGEAR_CAMPAIGNS),
  vinsolutions: buildCampaigns("vs", VINSOLUTIONS_CAMPAIGNS),
  xtime: buildCampaigns("xt", XTIME_CAMPAIGNS),
}

// Campaign Detail mock — the AT Trade-In Value Campaign's 5 assets.
export const CAMPAIGN_DETAIL_ASSETS: Asset[] = [
  {
    id: "explainer",
    name: "Explainer",
    type: "Video",
    channelTag: { label: "CTV", category: "format" },
    status: "underperforming",
    channelsCount: 5,
    impressions: 396_700,
    engPct: 7.68,
    cpm: 59,
    leads: 781,
    keyInd: 44.94,
    mrr: 180_100,
    spend: 34_100,
    action: "optimize",
  },
  {
    id: "mpu-300x250",
    name: "MPU 300x250",
    type: "Display",
    channelTag: { label: "Display", category: "channel" },
    status: "underperforming",
    channelsCount: 1,
    impressions: 134_900,
    engPct: 8.58,
    cpm: 80,
    leads: 173,
    keyInd: 12.14,
    mrr: 120_100,
    spend: 46_000,
    action: "optimize",
  },
  {
    id: "twitter-thread",
    name: "Twitter Thread",
    type: "Social",
    channelTag: { label: "Social Media", category: "channel" },
    status: "underperforming",
    channelsCount: 1,
    impressions: 749_600,
    engPct: 1.51,
    cpm: 9,
    leads: 299,
    keyInd: 43.14,
    mrr: 112_400,
    spend: 9_900,
    action: "stop",
  },
  {
    id: "lookalike-audience",
    name: "Lookalike Audience",
    type: "Programmatic",
    channelTag: { label: "Program", category: "type" },
    status: "top-performer",
    channelsCount: 2,
    impressions: 487_200,
    engPct: 8.01,
    cpm: 3,
    leads: 581,
    keyInd: 39.07,
    mrr: 106_100,
    spend: 1_800,
    action: "scale",
  },
  {
    id: "long-tail-sem",
    name: "Long-tail SEM",
    type: "Search",
    channelTag: { label: "Search", category: "search" },
    status: "underperforming",
    channelsCount: 2,
    impressions: 149_600,
    engPct: 6.13,
    cpm: 80,
    leads: 728,
    keyInd: 6.59,
    mrr: 26_900,
    spend: 32_300,
    action: "stop",
  },
]

export const CAMPAIGN_DETAIL_KPIS = [
  { label: "Spend", value: "$124.1k", delta: "+3", period: "Since xx" },
  { label: "MRR", value: "$545.6k", delta: "+3", period: "Since xx" },
  { label: "Leads", value: "2.6k", delta: "+3", period: "Since xx" },
  { label: "Eng Rate", value: "5.29%", delta: "+3", period: "Since xx" },
]

export interface ScenarioAsset {
  id: string
  name: string
  brandLabel: string
  campaignLabel: string
  baselineSpend: number
  baselineMrr: number
  adjustedSpend: number
  adjustedMrr: number
  deltaPercent: number
  // 0–100 position on the allocation track
  trackPosition: number
}

export type SummaryTone = "positive" | "caution" | "critical" | "neutral"

export interface ScenarioSummaryEntry {
  label: string
  value: string
  fromLabel: string
  deltaPercent: number
  tone: SummaryTone
}

export const SCENARIO_SUMMARY: ScenarioSummaryEntry[] = [
  { label: "Spend", value: "$131.8k", fromLabel: "from $124.1k", deltaPercent: 6.1, tone: "neutral" },
  { label: "MRR", value: "$541.5k", fromLabel: "from $545.6k", deltaPercent: -0.7, tone: "caution" },
  { label: "Leads", value: "2.6k", fromLabel: "from 2.6k", deltaPercent: 0.4, tone: "positive" },
  { label: "Engagements", value: "100.8k", fromLabel: "from 101.6k", deltaPercent: -0.7, tone: "caution" },
]

export const SCENARIO_ASSETS: ScenarioAsset[] = [
  {
    id: "mpu",
    name: "MPU 300x250",
    brandLabel: "Autotrader",
    campaignLabel: "AT Trade-In Value Campaign",
    baselineSpend: 46_000,
    baselineMrr: 120_100,
    adjustedSpend: 52_400,
    adjustedMrr: 131_700,
    deltaPercent: 14,
    trackPosition: 58,
  },
  {
    id: "explainer",
    name: "Explainer",
    brandLabel: "Autotrader",
    campaignLabel: "AT Trade-In Value Campaign",
    baselineSpend: 34_100,
    baselineMrr: 180_100,
    adjustedSpend: 32_100,
    adjustedMrr: 169_300,
    deltaPercent: -6,
    trackPosition: 48,
  },
  {
    id: "long-tail-sem",
    name: "Long-tail SEM",
    brandLabel: "Autotrader",
    campaignLabel: "AT Trade-In Value Campaign",
    baselineSpend: 32_300,
    baselineMrr: 26_900,
    adjustedSpend: 32_300,
    adjustedMrr: 26_900,
    deltaPercent: 12,
    trackPosition: 57,
  },
  {
    id: "twitter-thread",
    name: "Twitter Thread",
    brandLabel: "Autotrader",
    campaignLabel: "AT Trade-In Value Campaign",
    baselineSpend: 9_900,
    baselineMrr: 112_400,
    adjustedSpend: 9_300,
    adjustedMrr: 105_600,
    deltaPercent: -6,
    trackPosition: 48,
  },
  {
    id: "lookalike-audience",
    name: "Lookalike Audience",
    brandLabel: "Autotrader",
    campaignLabel: "AT Trade-In Value Campaign",
    baselineSpend: 1_800,
    baselineMrr: 106_100,
    adjustedSpend: 1_800,
    adjustedMrr: 106_100,
    deltaPercent: 0,
    trackPosition: 50,
  },
]

export const SCENARIO_SUGGESTION = {
  shiftFromName: "Long-tail SEM",
  shiftToName: "Lookalike Audience",
  shiftAmount: "$9.7k",
  returnsLabel: "58.86x",
  comparisonLabel: "MRR/$ vs Long-tail SEM at 0.83x.",
}

export function getBrand(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id)
}

export function getCampaign(brandId: string, campaignId: string): Campaign | undefined {
  return CAMPAIGNS_BY_BRAND[brandId as BrandId]?.find((c) => c.id === campaignId)
}
