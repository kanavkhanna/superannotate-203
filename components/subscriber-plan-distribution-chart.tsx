"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

const data = [
  {
    plan: "Monthly Vegetarian",
    subscribers: 540,
    revenue: 70200,
  },
  {
    plan: "Monthly Keto",
    subscribers: 312,
    revenue: 46800,
  },
  {
    plan: "Monthly Paleo",
    subscribers: 280,
    revenue: 39200,
  },
  {
    plan: "Monthly Vegan",
    subscribers: 210,
    revenue: 27300,
  },
  {
    plan: "Monthly Standard",
    subscribers: 190,
    revenue: 22800,
  },
]

export function SubscriberPlanDistributionChart() {
  return (
    <ChartContainer
      className="h-[400px]"
      aria-label="Subscriber plan distribution chart"
      config={{
        subscribers: {
          label: "Subscribers",
          color: "hsl(var(--primary))",
        },
        revenue: {
          label: "Revenue ($)",
          color: "hsl(var(--chart-2))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="plan"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            yAxisId="left"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Subscribers", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Revenue ($)", angle: 90, position: "insideRight" }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <div className="font-medium">{payload[0].payload.plan}</div>
                    <div className="text-[0.85rem] text-primary">{payload[0].value} subscribers</div>
                    <div className="text-[0.85rem] text-chart-2">${payload[1].value.toLocaleString()} revenue</div>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Bar
            dataKey="subscribers"
            fill="var(--color-subscribers)"
            radius={[4, 4, 0, 0]}
            name="Subscribers"
            yAxisId="left"
          />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} name="Revenue ($)" yAxisId="right" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
      <div className="sr-only">
        <h3>Subscriber Plan Distribution Data</h3>
        <ul>
          {data.map((item) => (
            <li key={item.plan}>
              {item.plan}: {item.subscribers} subscribers, ${item.revenue} revenue
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  )
}

