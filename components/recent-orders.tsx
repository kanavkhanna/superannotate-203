"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    plan: "Weekly Vegetarian",
    date: "2023-07-01",
    status: "Delivered",
    avatar: "JS",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    plan: "Weekly Keto",
    date: "2023-07-01",
    status: "Processing",
    avatar: "SJ",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    plan: "Weekly Paleo",
    date: "2023-07-02",
    status: "Pending",
    avatar: "MB",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    plan: "Weekly Vegan",
    date: "2023-07-02",
    status: "Delivered",
    avatar: "ED",
  },
  {
    id: "ORD-005",
    customer: "David Wilson",
    plan: "Weekly Standard",
    date: "2023-07-03",
    status: "Processing",
    avatar: "DW",
  },
  // Additional orders that will be shown when "View All" is clicked
  {
    id: "ORD-006",
    customer: "Jennifer Lee",
    plan: "Weekly Vegetarian",
    date: "2023-07-03",
    status: "Delivered",
    avatar: "JL",
  },
  {
    id: "ORD-007",
    customer: "Robert Taylor",
    plan: "Weekly Keto",
    date: "2023-07-04",
    status: "Processing",
    avatar: "RT",
  },
  {
    id: "ORD-008",
    customer: "Lisa Anderson",
    plan: "Weekly Paleo",
    date: "2023-07-04",
    status: "Pending",
    avatar: "LA",
  },
  {
    id: "ORD-009",
    customer: "Thomas Johnson",
    plan: "Weekly Vegan",
    date: "2023-07-04",
    status: "Delivered",
    avatar: "TJ",
  },
  {
    id: "ORD-010",
    customer: "Amanda Clark",
    plan: "Weekly Standard",
    date: "2023-07-05",
    status: "Processing",
    avatar: "AC",
  },
]

interface RecentOrdersProps {
  onViewAll?: () => void
  onViewLess?: () => void
  showAll?: boolean
}

export function RecentOrders({ onViewAll, onViewLess, showAll = false }: RecentOrdersProps) {
  const [viewAll, setViewAll] = useState(showAll)

  const displayedOrders = viewAll ? recentOrders : recentOrders.slice(0, 5)

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
      <Table aria-label="Recent orders">
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedOrders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50">
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${order.avatar}`} alt={order.customer} />
                  <AvatarFallback className="text-xs">{order.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{order.customer}</span>
                  <span className="text-xs text-muted-foreground">{order.id}</span>
                </div>
              </TableCell>
              <TableCell>{order.plan}</TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : order.status === "Processing" ? "secondary" : "outline"
                  }
                  className={
                    order.status === "Delivered"
                      ? "bg-primary/20 text-primary hover:bg-primary/30"
                      : order.status === "Processing"
                        ? "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 dark:text-amber-400"
                        : ""
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {recentOrders.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button onClick={handleToggleView} className="text-xs text-primary hover:underline focus:outline-none">
            {viewAll ? "View Less" : "View All Orders"}
          </button>
        </div>
      )}
    </>
  )
}

