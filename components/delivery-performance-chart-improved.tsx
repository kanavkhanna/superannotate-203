"use client"

import { ChartTooltip } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

const data = [
  {
    date: "2023-06-01",
    onTime: 98,
    delayed: 2,
    failed: 0,
  },
  {
    date: "2023-06-08",
    onTime: 97,
    delayed: 3,
    failed: 0,
  },
  {
    date: "2023-06-15",
    onTime: 96,
    delayed: 3,
    failed: 1,
  },
  {
    date: "2023-06-22",
    onTime: 98,
    delayed: 2,
    failed: 0,
  },
  {
    date: "2023-06-29",
    onTime: 99,
    delayed: 1,
    failed: 0,
  },
  {
    date: "2023-07-01",
    onTime: 98,
    delayed: 2,
    failed: 0,
  },
]

export function DeliveryPerformanceChartImproved() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 30, right: 50, left: 50, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Delivery Date", position: "insideBottom", offset: -10 }}
            interval={0}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            unit="%"
            label={{ value: "Percentage of Deliveries", angle: -90, position: "insideLeft", offset: -20 }}
            width={80}
            domain={[0, 100]}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-md">
                    <div className="font-medium text-base">{payload[0].payload.date}</div>
                    <div className="text-sm text-primary mt-1">On Time: {payload[0].value}%</div>
                    <div className="text-sm text-amber-500">Delayed: {payload[1].value}%</div>
                    <div className="text-sm text-destructive">Failed: {payload[2].value}%</div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="onTime"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="On Time"
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="delayed"
            stroke="hsl(var(--amber-500))"
            strokeWidth={3}
            name="Delayed"
            dot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="failed"
            stroke="hsl(var(--destructive))"
            strokeWidth={3}
            name="Failed"
            dot={{ r: 6 }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingTop: "10px" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

