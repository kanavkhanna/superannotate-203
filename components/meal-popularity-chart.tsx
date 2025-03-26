"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

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

export function MealPopularityChart() {
  return (
    <ChartContainer className="h-full w-full" aria-label="Meal popularity chart">
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: "Orders", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <div className="font-medium">{payload[0].payload.name}</div>
                    <div className="text-[0.85rem] text-muted-foreground">{payload[0].value} orders</div>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
          <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Orders" />
        </BarChart>
      </ResponsiveContainer>
      <div className="sr-only">
        <h3>Meal Popularity Data</h3>
        <ul>
          {data.map((item) => (
            <li key={item.name}>
              {item.name}: {item.orders} orders
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  )
}

