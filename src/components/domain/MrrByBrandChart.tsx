import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"
import type { Brand } from "@/lib/mock-data"

interface MrrByBrandChartProps {
  brands: Brand[]
  highlightId?: string
  onBarClick?: (brandId: string) => void
}

export function MrrByBrandChart({ brands, highlightId, onBarClick }: MrrByBrandChartProps) {
  const data = useMemo(
    () => brands.map((b) => ({ id: b.id, name: b.name, value: b.mrrScore })),
    [brands],
  )

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="2 4" stroke="#CCCCCE" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#808285" }}
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#808285" }}
          />
          <Bar
            dataKey="value"
            radius={[2, 2, 0, 0]}
            cursor="pointer"
            onClick={(payload: { id?: string }) => {
              if (payload?.id) onBarClick?.(payload.id)
            }}
          >
            {data.map((d) => (
              <Cell key={d.id} fill={d.id === highlightId ? "#FFC20E" : "#1D3E74"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
