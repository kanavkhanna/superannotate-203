import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentOrders } from "@/components/recent-orders"
import { UpcomingDeliveries } from "@/components/upcoming-deliveries"
import { SubscriberStats } from "@/components/subscriber-stats"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, CreditCard, Activity } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Meal subscription service dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <p className="text-xs text-emerald-500">+180.1% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Plans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <p className="text-xs text-emerald-500">+19% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
              <p className="text-xs text-rose-500">-201 from last hour</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SubscriberStats />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Recent meal plan orders from subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
            <CardDescription>Scheduled deliveries for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingDeliveries />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

