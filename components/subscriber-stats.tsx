"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Monthly", value: 540, color: "hsl(var(--primary))" },
  { name: "Quarterly", value: 312, color: "hsl(var(--primary) / 0.7)" },
  { name: "Annual", value: 280, color: "hsl(var(--primary) / 0.4)" },
]

export function SubscriberStats() {
  return (
    <ChartContainer className="h-[350px]" aria-label="Subscriber statistics by plan type">
      <ResponsiveContainer width="100%" height="65%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} className="transition-all duration-300 hover:opacity-80" />
            ))}
          </Pie>
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent>
                    <div className="font-medium">{payload[0].name} Plan</div>
                    <div className="text-[0.85rem] text-muted-foreground">{payload[0].value} subscribers</div>
                    <div className="text-[0.75rem] text-muted-foreground">
                      {Math.round((payload[0].value / 1132) * 100)}% of active
                    </div>
                  </ChartTooltipContent>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 flex justify-center gap-4 px-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">{item.name}</span>
              <span className="text-[10px] text-muted-foreground">{item.value} subscribers</span>
            </div>
          </div>
        ))}
      </div>
      <div className="sr-only">
        <h3>Subscriber Plan Distribution</h3>
        <ul>
          {data.map((item) => (
            <li key={item.name}>
              {item.name} Plan: {item.value} subscribers
            </li>
          ))}
        </ul>
      </div>
    </ChartContainer>
  )
}

