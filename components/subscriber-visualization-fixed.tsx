"use client"

import { ChartTooltip } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend, Bar, BarChart } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for subscriber trends
const trendData = [
  { month: "Jan", active: 980, new: 45, churned: 12 },
  { month: "Feb", active: 1005, new: 52, churned: 15 },
  { month: "Mar", active: 1042, new: 61, churned: 18 },
  { month: "Apr", active: 1069, new: 67, churned: 22 },
  { month: "May", active: 1098, new: 70, churned: 19 },
  { month: "Jun", active: 1127, new: 78, churned: 21 },
  { month: "Jul", active: 1132, new: 124, churned: 25 },
]

// Sample data for plan distribution
const planData = [
  { plan: "Monthly Vegetarian", subscribers: 540 },
  { plan: "Monthly Keto", subscribers: 312 },
  { plan: "Monthly Paleo", subscribers: 280 },
  { plan: "Monthly Vegan", subscribers: 210 },
  { plan: "Monthly Standard", subscribers: 190 },
]

export function SubscriberVisualizationFixed() {
  return (
    <Tabs defaultValue="trends" className="w-full">
      <TabsList className="mb-4 w-full justify-start">
        <TabsTrigger value="trends">Subscriber Trends</TabsTrigger>
        <TabsTrigger value="plans">Plan Distribution</TabsTrigger>
      </TabsList>

      <TabsContent value="trends">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="font-medium">{payload[0].payload.month}</div>
                        <div className="text-sm text-primary">Active: {payload[0].value}</div>
                        <div className="text-sm text-blue-500">New: {payload[1].value}</div>
                        <div className="text-sm text-destructive">Churned: {payload[2].value}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Active Subscribers"
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="hsl(210, 100%, 50%)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="New Subscribers"
              />
              <Line
                type="monotone"
                dataKey="churned"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Churned Subscribers"
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="plans">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="plan"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="font-medium">{payload[0].payload.plan}</div>
                        <div className="text-sm text-primary">{payload[0].value} subscribers</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((payload[0].value / 1132) * 100)}% of total
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="subscribers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Subscribers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}

