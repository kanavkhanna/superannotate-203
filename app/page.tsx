"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentOrders } from "@/components/recent-orders"
import { SubscriberStats } from "@/components/subscriber-stats"
import { RevenueChart } from "@/components/revenue-chart"
import { UpcomingDeliveries } from "@/components/upcoming-deliveries"
import { ArrowUp, ArrowRight, TrendingUp, Clock, Users, CheckCircle, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const [showAllOrders, setShowAllOrders] = useState(false)
  const [showAllDeliveries, setShowAllDeliveries] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader title="Dashboard" description="Overview of your meal subscription service" />

      <section className="dashboard-grid" aria-label="Key metrics">
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-primary" />
              <span className="font-medium text-primary">12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,132</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-primary" />
              <span className="font-medium text-primary">4%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,568</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-primary" />
              <span className="font-medium text-primary">18%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
          </CardContent>
        </Card>
      </section>

      <div className="dashboard-section">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="chart-container lg:col-span-4">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Revenue Overview</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">+18%</span>
                      <span>vs last month</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <RevenueChart />
                </CardContent>
              </Card>
              <Card className="chart-container lg:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle>Subscriber Statistics</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <SubscriberStats />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="table-container">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs text-primary"
                      onClick={() => setShowAllOrders(!showAllOrders)}
                    >
                      {showAllOrders ? "View Less" : "View All"}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentOrders
                    showAll={showAllOrders}
                    onViewAll={() => setShowAllOrders(true)}
                    onViewLess={() => setShowAllOrders(false)}
                  />
                </CardContent>
              </Card>
              <Card className="table-container">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Deliveries</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs text-primary"
                      onClick={() => setShowAllDeliveries(!showAllDeliveries)}
                    >
                      {showAllDeliveries ? "View Less" : "View All"}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <UpcomingDeliveries
                    showAll={showAllDeliveries}
                    onViewAll={() => setShowAllDeliveries(true)}
                    onViewLess={() => setShowAllDeliveries(false)}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

