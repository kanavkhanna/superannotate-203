"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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

export function DeliveryPerformanceChart() {
  return (
    <ChartContainer className="h-full w-full" aria-label="Delivery performance chart">
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            unit="%"
            label={{ value: "Percentage", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <div className="font-medium">{payload[0].payload.date}</div>
                    <div className="text-[0.85rem] text-primary">On Time: {payload[0].value}%</div>
                    <div className="text-[0.85rem] text-amber-500">Delayed: {payload[1].value}%</div>
                    <div className="text-[0.85rem] text-destructive">Failed: {payload[2].value}%</div>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="onTime"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="On Time"
          />
          <Line type="monotone" dataKey="delayed" stroke="hsl(var(--amber-500))" strokeWidth={2} name="Delayed" />
          <Line type="monotone" dataKey="failed" stroke="hsl(var(--destructive))" strokeWidth={2} name="Failed" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <div className="sr-only">
        <h3>Delivery Performance Data</h3>
        <ul>
          {data.map((item) => (
            <li key={item.date}>
              {item.date}: {item.onTime}% on time, {item.delayed}% delayed, {item.failed}% failed
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  )
}

