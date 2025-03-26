import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { RevenueChart } from "@/components/revenue-chart"
import { SubscriberStats } from "@/components/subscriber-stats"
import { MealPopularityChartImproved } from "@/components/meal-popularity-chart-improved"
import { DeliveryPerformanceChartImproved } from "@/components/delivery-performance-chart-improved"
import { SubscriberVisualizationFixed } from "@/components/subscriber-visualization-fixed"
import "./analytics.css"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Analytics"
        description="Detailed reports and analytics for your meal subscription service"
      />
      <div className="p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,568</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,132</div>
                  <p className="text-xs text-muted-foreground">+4% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$135.42</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.6%</div>
                  <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Distribution</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <SubscriberStats />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="subscribers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,132</div>
                  <p className="text-xs text-muted-foreground">+4% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">New Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4%</div>
                  <p className="text-xs text-muted-foreground">-0.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,245</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last quarter</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <SubscriberVisualizationFixed />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meals" className="analytics-tab-content">
            <Card className="w-full overflow-hidden">
              <CardHeader>
                <CardTitle>Meal Popularity</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="analytics-chart-container">
                  <MealPopularityChartImproved />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deliveries" className="analytics-tab-content">
            <Card className="w-full overflow-hidden">
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="analytics-chart-container">
                  <DeliveryPerformanceChartImproved />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

