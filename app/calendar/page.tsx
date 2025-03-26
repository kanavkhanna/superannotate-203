import { DashboardHeader } from "@/components/dashboard-header"
import { DeliveryCalendar } from "@/components/delivery-calendar"

export default function CalendarPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader title="Calendar" description="View and manage delivery schedules" />
      <div className="p-4">
        <DeliveryCalendar />
      </div>
    </div>
  )
}

