"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ageData = [
  { group: "18-24", count: 187, percentage: 16.5 },
  { group: "25-34", count: 412, percentage: 36.4 },
  { group: "35-44", count: 298, percentage: 26.3 },
  { group: "45-54", count: 156, percentage: 13.8 },
  { group: "55-64", count: 62, percentage: 5.5 },
  { group: "65+", count: 17, percentage: 1.5 },
]

const genderData = [
  { group: "Female", count: 678, percentage: 59.9 },
  { group: "Male", count: 442, percentage: 39.0 },
  { group: "Other", count: 12, percentage: 1.1 },
]

const dietaryData = [
  { preference: "Vegetarian", count: 342, percentage: 30.2 },
  { preference: "Keto", count: 256, percentage: 22.6 },
  { preference: "Paleo", count: 198, percentage: 17.5 },
  { preference: "Vegan", count: 176, percentage: 15.5 },
  { preference: "Standard", count: 160, percentage: 14.2 },
]

export function SubscriberDemographics() {
  return (
    <Tabs defaultValue="age" className="w-full">
      <TabsList className="mb-4 w-full justify-start">
        <TabsTrigger value="age">Age Distribution</TabsTrigger>
        <TabsTrigger value="gender">Gender</TabsTrigger>
        <TabsTrigger value="dietary">Dietary Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="age">
        <ChartContainer
          className="h-[350px]"
          aria-label="Subscriber age distribution chart"
          config={{
            count: {
              label: "Subscribers",
              color: "hsl(var(--primary))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="group"
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
                      <ChartTooltipContent>
                        <div className="font-medium">Age: {payload[0].payload.group}</div>
                        <div className="text-[0.85rem] text-primary">{payload[0].value} subscribers</div>
                        <div className="text-[0.85rem] text-muted-foreground">
                          {payload[0].payload.percentage}% of total
                        </div>
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} name="Subscribers" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>

      <TabsContent value="gender">
        <ChartContainer
          className="h-[350px]"
          aria-label="Subscriber gender distribution chart"
          config={{
            count: {
              label: "Subscribers",
              color: "hsl(var(--primary))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genderData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="group"
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
                      <ChartTooltipContent>
                        <div className="font-medium">Gender: {payload[0].payload.group}</div>
                        <div className="text-[0.85rem] text-primary">{payload[0].value} subscribers</div>
                        <div className="text-[0.85rem] text-muted-foreground">
                          {payload[0].payload.percentage}% of total
                        </div>
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} name="Subscribers" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>

      <TabsContent value="dietary">
        <ChartContainer
          className="h-[350px]"
          aria-label="Subscriber dietary preferences chart"
          config={{
            count: {
              label: "Subscribers",
              color: "hsl(var(--primary))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dietaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="preference"
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
                      <ChartTooltipContent>
                        <div className="font-medium">Preference: {payload[0].payload.preference}</div>
                        <div className="text-[0.85rem] text-primary">{payload[0].value} subscribers</div>
                        <div className="text-[0.85rem] text-muted-foreground">
                          {payload[0].payload.percentage}% of total
                        </div>
                      </ChartTooltipContent>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} name="Subscribers">
                {dietaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${0.9 - index * 0.15})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}

