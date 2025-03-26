"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 20500 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 21200 },
  { month: "May", revenue: 22400 },
  { month: "Jun", revenue: 24000 },
  { month: "Jul", revenue: 24568 },
]

export function RevenueChart() {
  return (
    <ChartContainer className="h-[300px]" aria-label="Monthly revenue chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
            width={60}
          />
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <div className="font-medium">{payload[0].payload.month}</div>
                    <div className="text-[0.85rem] text-muted-foreground">${payload[0].value.toLocaleString()}</div>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name="Monthly Revenue"
            activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="sr-only">
        <h3>Monthly Revenue Data</h3>
        <ul>
          {data.map((item) => (
            <li key={item.month}>
              {item.month}: ${item.revenue}
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  )
}

