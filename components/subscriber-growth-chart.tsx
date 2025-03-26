"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

const data = [
  {
    month: "Jan",
    newSubscribers: 45,
    churnedSubscribers: 12,
    netGrowth: 33,
  },
  {
    month: "Feb",
    newSubscribers: 52,
    churnedSubscribers: 15,
    netGrowth: 37,
  },
  {
    month: "Mar",
    newSubscribers: 61,
    churnedSubscribers: 18,
    netGrowth: 43,
  },
  {
    month: "Apr",
    newSubscribers: 67,
    churnedSubscribers: 22,
    netGrowth: 45,
  },
  {
    month: "May",
    newSubscribers: 70,
    churnedSubscribers: 19,
    netGrowth: 51,
  },
  {
    month: "Jun",
    newSubscribers: 78,
    churnedSubscribers: 21,
    netGrowth: 57,
  },
  {
    month: "Jul",
    newSubscribers: 124,
    churnedSubscribers: 25,
    netGrowth: 99,
  },
]

export function SubscriberGrowthChart() {
  return (
    <ChartContainer
      className="h-[400px]"
      aria-label="Subscriber growth chart"
      config={{
        newSubscribers: {
          label: "New Subscribers",
          color: "hsl(var(--chart-1))",
        },
        churnedSubscribers: {
          label: "Churned Subscribers",
          color: "hsl(var(--destructive))",
        },
        netGrowth: {
          label: "Net Growth",
          color: "hsl(var(--primary))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Subscribers", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <div className="font-medium">{payload[0].payload.month}</div>
                    <div className="text-[0.85rem] text-chart-1">New: {payload[0].value}</div>
                    <div className="text-[0.85rem] text-destructive">Churned: {payload[1].value}</div>
                    <div className="text-[0.85rem] text-primary">Net Growth: {payload[2].value}</div>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="newSubscribers"
            stroke="var(--color-newSubscribers)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="New Subscribers"
          />
          <Line
            type="monotone"
            dataKey="churnedSubscribers"
            stroke="var(--color-churnedSubscribers)"
            strokeWidth={2}
            name="Churned Subscribers"
          />
          <Line type="monotone" dataKey="netGrowth" stroke="var(--color-netGrowth)" strokeWidth={3} name="Net Growth" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <div className="sr-only">
        <h3>Subscriber Growth Data</h3>
        <ul>
          {data.map((item) => (
            <li key={item.month}>
              {item.month}: {item.newSubscribers} new subscribers, {item.churnedSubscribers} churned subscribers,{" "}
              {item.netGrowth} net growth
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  )
}

