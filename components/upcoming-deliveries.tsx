"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarClock } from "lucide-react"

const upcomingDeliveries = [
  {
    id: "DEL-001",
    customer: "John Smith",
    address: "123 Main St, Anytown",
    date: "2023-07-05",
    timeSlot: "9:00 AM - 12:00 PM",
  },
  {
    id: "DEL-002",
    customer: "Sarah Johnson",
    address: "456 Oak Ave, Somewhere",
    date: "2023-07-05",
    timeSlot: "1:00 PM - 4:00 PM",
  },
  {
    id: "DEL-003",
    customer: "Michael Brown",
    address: "789 Pine Rd, Nowhere",
    date: "2023-07-06",
    timeSlot: "9:00 AM - 12:00 PM",
  },
  {
    id: "DEL-004",
    customer: "Emily Davis",
    address: "321 Elm St, Everywhere",
    date: "2023-07-06",
    timeSlot: "1:00 PM - 4:00 PM",
  },
  {
    id: "DEL-005",
    customer: "David Wilson",
    address: "654 Maple Dr, Somewhere",
    date: "2023-07-07",
    timeSlot: "9:00 AM - 12:00 PM",
  },
  // Additional deliveries that will be shown when "View All" is clicked
  {
    id: "DEL-006",
    customer: "Jennifer Lee",
    address: "987 Birch Ln, Anytown",
    date: "2023-07-07",
    timeSlot: "1:00 PM - 4:00 PM",
  },
  {
    id: "DEL-007",
    customer: "Robert Taylor",
    address: "246 Cedar St, Nowhere",
    date: "2023-07-08",
    timeSlot: "9:00 AM - 12:00 PM",
  },
  {
    id: "DEL-008",
    customer: "Lisa Anderson",
    address: "135 Walnut Ave, Everywhere",
    date: "2023-07-08",
    timeSlot: "1:00 PM - 4:00 PM",
  },
  {
    id: "DEL-009",
    customer: "Thomas Johnson",
    address: "864 Pine St, Somewhere",
    date: "2023-07-09",
    timeSlot: "9:00 AM - 12:00 PM",
  },
  {
    id: "DEL-010",
    customer: "Amanda Clark",
    address: "753 Oak Rd, Anytown",
    date: "2023-07-09",
    timeSlot: "1:00 PM - 4:00 PM",
  },
]

interface UpcomingDeliveriesProps {
  onViewAll?: () => void
  onViewLess?: () => void
  showAll?: boolean
}

export function UpcomingDeliveries({ onViewAll, onViewLess, showAll = false }: UpcomingDeliveriesProps) {
  const [viewAll, setViewAll] = useState(showAll)

  // Sort deliveries by date

  const displayedDeliveries = viewAll
    ? [...upcomingDeliveries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [...upcomingDeliveries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5)

  const handleToggleView = () => {
    const newState = !viewAll
    setViewAll(newState)

    if (newState && onViewAll) {
      onViewAll()
    } else if (!newState && onViewLess) {
      onViewLess()
    }
  }

  return (
    <>
      <Table aria-label="Upcoming deliveries">
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Time Slot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedDeliveries.map((delivery) => (
            <TableRow key={delivery.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{delivery.customer}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {delivery.date}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <CalendarClock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{delivery.timeSlot}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {upcomingDeliveries.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button onClick={handleToggleView} className="text-xs text-primary hover:underline focus:outline-none">
            {viewAll ? "View Less" : "View All Deliveries"}
          </button>
        </div>
      )}
    </>
  )
}

