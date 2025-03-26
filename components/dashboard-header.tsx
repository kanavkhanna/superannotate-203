"use client"

import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function DashboardHeader({ title, description, actions }: DashboardHeaderProps) {
  // Add state for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New subscriber",
      description: "John Smith subscribed to the Weekly Vegetarian plan",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      title: "Delivery update",
      description: "15 deliveries have been completed today",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment received",
      description: "$1,250 in new payments have been processed",
      time: "3h ago",
      read: false,
    },
  ])

  // Calculate unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast.success("All notifications marked as read")
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6">
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] sm:w-80 dropdown-content">
              <div className="flex items-center justify-between p-2">
                <p className="text-sm font-medium">Notifications</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start gap-1 p-3 ${notification.read ? "opacity-70" : ""}`}
                    onSelect={(e) => {
                      e.preventDefault()
                      // Mark this notification as read
                      setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
                      toast.info(`Viewed: ${notification.title}`)
                    }}
                  >
                    <div className="flex w-full justify-between">
                      <p className="font-medium">{notification.title}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {actions}
        </div>
      </div>
    </header>
  )
}

