import { Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import ExecutiveSummary from "@/routes/ExecutiveSummary"
import BrandDetail from "@/routes/BrandDetail"
import CampaignDetail from "@/routes/CampaignDetail"
import AssetDetail from "@/routes/AssetDetail"
import Placeholder from "@/routes/Placeholder"

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ExecutiveSummary />} />
        <Route path="/brand/:brandId" element={<BrandDetail />} />
        <Route path="/brand/:brandId/campaign/:campaignId" element={<CampaignDetail />} />
        <Route
          path="/brand/:brandId/campaign/:campaignId/asset/:assetId"
          element={<AssetDetail />}
        />
        <Route path="/command-center" element={<Placeholder title="Command Center" />} />
        <Route path="/asset-detail" element={<Placeholder title="Asset Detail" />} />
      </Routes>
    </AppShell>
  )
}
