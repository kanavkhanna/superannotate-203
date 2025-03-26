"use client"

import { ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

const data = [
  { name: "Roasted Vegetable Bowl", orders: 245 },
  { name: "Spinach and Feta Stuffed Portobello", orders: 187 },
  { name: "Lentil Shepherd's Pie", orders: 156 },
  { name: "Mediterranean Chickpea Salad", orders: 142 },
  { name: "Bacon Wrapped Chicken", orders: 198 },
  { name: "Cauliflower Steak", orders: 112 },
  { name: "Salmon with Creamed Spinach", orders: 176 },
  { name: "Grilled Steak with Sweet Potatoes", orders: 165 },
  { name: "Coconut Chicken Curry", orders: 132 },
]

export function MealPopularityChartImproved() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 30, right: 50, left: 50, bottom: 100 }} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            label={{ value: "Meal Name", position: "insideBottom", offset: -80 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Number of Orders", angle: -90, position: "insideLeft", offset: -10 }}
            width={80}
            domain={[0, "dataMax + 50"]}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-md">
                    <div className="font-medium text-base">{payload[0].payload.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{payload[0].value} orders</div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingTop: "10px" }} />
          <Bar
            dataKey="orders"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Number of Orders"
            barSize={40}
            maxBarSize={60}
            animationDuration={1000}
            label={{
              position: "top",
              formatter: (value: number) => `${value}`,
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

