"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Package, User } from "lucide-react"

// Sample delivery data
const deliveryData = {
  "2023-07-05": {
    morning: 12,
    afternoon: 8,
    deliveries: [
      {
        id: "DEL-001",
        customer: "John Smith",
        address: "123 Main St, Anytown",
        timeSlot: "9:00 AM - 12:00 PM",
        items: "Weekly Vegetarian Box",
      },
      {
        id: "DEL-002",
        customer: "Sarah Johnson",
        address: "456 Oak Ave, Somewhere",
        timeSlot: "1:00 PM - 4:00 PM",
        items: "Weekly Keto Box",
      },
    ],
  },
  "2023-07-06": {
    morning: 10,
    afternoon: 14,
    deliveries: [
      {
        id: "DEL-003",
        customer: "Michael Brown",
        address: "789 Pine Rd, Nowhere",
        timeSlot: "9:00 AM - 12:00 PM",
        items: "Weekly Paleo Box",
      },
      {
        id: "DEL-004",
        customer: "Emily Davis",
        address: "321 Elm St, Everywhere",
        timeSlot: "1:00 PM - 4:00 PM",
        items: "Weekly Vegan Box",
      },
    ],
  },
  "2023-07-07": {
    morning: 8,
    afternoon: 6,
    deliveries: [
      {
        id: "DEL-005",
        customer: "David Wilson",
        address: "654 Maple Dr, Somewhere",
        timeSlot: "9:00 AM - 12:00 PM",
        items: "Weekly Standard Box",
      },
      {
        id: "DEL-006",
        customer: "Jennifer Lee",
        address: "987 Birch Ln, Anytown",
        timeSlot: "1:00 PM - 4:00 PM",
        items: "Weekly Vegetarian Box",
      },
    ],
  },
  "2023-07-12": {
    morning: 14,
    afternoon: 10,
    deliveries: [],
  },
  "2023-07-13": {
    morning: 12,
    afternoon: 16,
    deliveries: [],
  },
  "2023-07-14": {
    morning: 10,
    afternoon: 8,
    deliveries: [],
  },
  "2023-07-19": {
    morning: 16,
    afternoon: 12,
    deliveries: [],
  },
  "2023-07-20": {
    morning: 14,
    afternoon: 18,
    deliveries: [],
  },
  "2023-07-21": {
    morning: 12,
    afternoon: 10,
    deliveries: [],
  },
}

export function DeliveryCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Get today's date at midnight for proper comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]
      setSelectedDate(formattedDate)
    } else {
      setSelectedDate(null)
    }
  }

  // Function to highlight dates with deliveries
  const isDayWithDelivery = (day: Date) => {
    const formattedDate = day.toISOString().split("T")[0]
    return formattedDate in deliveryData
  }

  // Function to disable past dates
  const disablePastDates = (date: Date) => {
    return date < today
  }

  return (
    <div className="w-full">
      <Card className="border-border/40 shadow-sm">
        <CardHeader>
          <CardTitle>Delivery Schedule</CardTitle>
          <CardDescription>View scheduled deliveries by date</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            className="rounded-md border-border/40 mx-auto"
            modifiers={{
              delivery: (date) => isDayWithDelivery(date),
            }}
            modifiersClassNames={{
              delivery: "bg-primary/20 font-bold text-primary",
            }}
            disabled={disablePastDates}
            fromDate={today}
            aria-label="Delivery schedule calendar"
          />

          {selectedDate && deliveryData[selectedDate] ? (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Deliveries for {selectedDate}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Morning (9AM - 12PM):</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {deliveryData[selectedDate].morning} deliveries
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Afternoon (1PM - 4PM):</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {deliveryData[selectedDate].afternoon} deliveries
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total:</span>
                  <Badge className="bg-primary text-primary-foreground">
                    {deliveryData[selectedDate].morning + deliveryData[selectedDate].afternoon} deliveries
                  </Badge>
                </div>

                {deliveryData[selectedDate].deliveries && deliveryData[selectedDate].deliveries.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-medium">Delivery Details</h3>
                    <div className="space-y-3">
                      {deliveryData[selectedDate].deliveries.map((delivery) => (
                        <Card key={delivery.id} className="overflow-hidden border-border/40 p-3 shadow-none">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                <span className="font-medium">{delivery.customer}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {delivery.id}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{delivery.timeSlot}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              <span>{delivery.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Package className="h-3.5 w-3.5" />
                              <span>{delivery.items}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {selectedDate
                  ? "No deliveries scheduled for the selected date."
                  : "Select a date from the calendar to view delivery details."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="sr-only">
        <h3>Delivery Schedule Overview</h3>
        <p>Calendar showing delivery dates. Dates with deliveries are highlighted.</p>
        {selectedDate && deliveryData[selectedDate] && (
          <div>
            <p>Selected date: {selectedDate}</p>
            <p>Morning deliveries: {deliveryData[selectedDate].morning}</p>
            <p>Afternoon deliveries: {deliveryData[selectedDate].afternoon}</p>
            <p>Total deliveries: {deliveryData[selectedDate].morning + deliveryData[selectedDate].afternoon}</p>
          </div>
        )}
      </div>
    </div>
  )
}

