"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  UserPlus,
  Users,
  UserCheck,
  TrendingDown,
  Clock,
  Download,
  Filter,
  Edit,
  MoreHorizontal,
  FileDown,
  AlertCircle,
  X,
  CalendarIcon,
  Mail,
  Eye,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const initialSubscribers = [
  {
    id: "SUB-001",
    name: "John Smith",
    email: "john.smith@example.com",
    plan: "Weekly Vegetarian",
    status: "Active",
    startDate: "2023-01-15",
    nextDelivery: "2023-07-05",
    avatar: "JS",
  },
  {
    id: "SUB-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    plan: "Weekly Keto",
    status: "Active",
    startDate: "2023-02-20",
    nextDelivery: "2023-07-05",
    avatar: "SJ",
  },
  {
    id: "SUB-003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    plan: "Weekly Paleo",
    status: "Paused",
    startDate: "2023-03-10",
    nextDelivery: "2023-07-12",
    avatar: "MB",
  },
  {
    id: "SUB-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    plan: "Weekly Vegan",
    status: "Active",
    startDate: "2023-04-05",
    nextDelivery: "2023-07-05",
    avatar: "ED",
  },
  {
    id: "SUB-005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    plan: "Weekly Standard",
    status: "Cancelled",
    startDate: "2023-05-15",
    nextDelivery: "N/A",
    avatar: "DW",
  },
  {
    id: "SUB-006",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    plan: "Weekly Vegetarian",
    status: "Active",
    startDate: "2023-06-01",
    nextDelivery: "2023-07-05",
    avatar: "JL",
  },
  {
    id: "SUB-007",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    plan: "Weekly Keto",
    status: "Active",
    startDate: "2023-06-10",
    nextDelivery: "2023-07-05",
    avatar: "RT",
  },
  {
    id: "SUB-008",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    plan: "Weekly Paleo",
    status: "Active",
    startDate: "2023-06-15",
    nextDelivery: "2023-07-05",
    avatar: "LA",
  },
]

const mealPlans = [
  { id: "PLAN-001", name: "Weekly Vegetarian" },
  { id: "PLAN-002", name: "Weekly Keto" },
  { id: "PLAN-003", name: "Weekly Paleo" },
  { id: "PLAN-004", name: "Weekly Vegan" },
  { id: "PLAN-005", name: "Weekly Standard" },
]

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState(initialSubscribers)
  const [filteredSubscribers, setFilteredSubscribers] = useState(initialSubscribers)
  const [isExportPopoverOpen, setIsExportPopoverOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [newSubscriber, setNewSubscriber] = useState({
    name: "",
    email: "",
    plan: "",
    status: "Active",
  })
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null)

  // Add filter state
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: {
      Active: false,
      Paused: false,
      Cancelled: false,
    },
    plan: {
      "Weekly Vegetarian": false,
      "Weekly Keto": false,
      "Weekly Paleo": false,
      "Weekly Vegan": false,
      "Weekly Standard": false,
    },
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  })
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const [isConfirmCancelDialogOpen, setIsConfirmCancelDialogOpen] = useState(false)
  const [subscriberToCancel, setSubscriberToCancel] = useState<any>(null)

  // Add function to apply filters
  const applyFilters = () => {
    let result = [...initialSubscribers]

    // Filter by status
    const selectedStatuses = Object.entries(filters.status)
      .filter(([_, isSelected]) => isSelected)
      .map(([status]) => status)

    if (selectedStatuses.length > 0) {
      result = result.filter((sub) => selectedStatuses.includes(sub.status))
    }

    // Filter by plan
    const selectedPlans = Object.entries(filters.plan)
      .filter(([_, isSelected]) => isSelected)
      .map(([plan]) => plan)

    if (selectedPlans.length > 0) {
      result = result.filter((sub) => selectedPlans.includes(sub.plan))
    }

    // Filter by date range
    if (filters.dateRange.from) {
      result = result.filter((sub) => {
        const subDate = new Date(sub.startDate)
        return subDate >= filters.dateRange.from!
      })
    }

    if (filters.dateRange.to) {
      result = result.filter((sub) => {
        const subDate = new Date(sub.startDate)
        return subDate <= filters.dateRange.to!
      })
    }

    setFilteredSubscribers(result)

    // Count active filters
    let count = 0
    count += selectedStatuses.length > 0 ? 1 : 0
    count += selectedPlans.length > 0 ? 1 : 0
    count += filters.dateRange.from || filters.dateRange.to ? 1 : 0
    setActiveFilterCount(count)

    setIsFilterPopoverOpen(false)
  }

  // Add function to reset filters
  const resetFilters = () => {
    setFilters({
      status: {
        Active: false,
        Paused: false,
        Cancelled: false,
      },
      plan: {
        "Weekly Vegetarian": false,
        "Weekly Keto": false,
        "Weekly Paleo": false,
        "Weekly Vegan": false,
        "Weekly Standard": false,
      },
      dateRange: {
        from: undefined,
        to: undefined,
      },
    })
    setFilteredSubscribers(initialSubscribers)
    setActiveFilterCount(0)
  }

  const handleAddSubscriber = () => {
    setIsAddDialogOpen(true)
    setFormErrors({})
  }

  const handleEditSubscriber = (subscriber: any) => {
    setSelectedSubscriber(subscriber)
    setFormErrors({})
    setIsEditDialogOpen(true)
  }

  const handleViewDetails = (subscriber: any) => {
    setSelectedSubscriber(subscriber)
    setIsViewDetailsDialogOpen(true)
  }

  const handleNewSubscriberChange = (field: string, value: string) => {
    setNewSubscriber((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user makes a change
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const handleEditSubscriberChange = (field: string, value: string) => {
    setSelectedSubscriber((prev: any) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user makes a change
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const validateForm = (subscriber: any) => {
    const errors: Record<string, string> = {}

    if (!subscriber.name) {
      errors.name = "Name is required"
    }

    if (!subscriber.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(subscriber.email)) {
      errors.email = "Email is invalid"
    }

    if (!subscriber.plan) {
      errors.plan = "Plan is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitSubscriber = async () => {
    if (!validateForm(newSubscriber)) {
      toast.error("Please fix the errors in the form", {
        description: "There are missing or invalid fields in the form.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success case
      toast.success("Subscriber added successfully", {
        description: `${newSubscriber.name} has been added with the ${newSubscriber.plan} plan.`,
      })

      // Add the new subscriber to the list
      const newId = `SUB-${String(subscribers.length + 1).padStart(3, "0")}`
      const newSubscriberWithId = {
        ...newSubscriber,
        id: newId,
        startDate: new Date().toISOString().split("T")[0],
        nextDelivery: "2023-07-15",
        avatar: newSubscriber.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      }

      setSubscribers([...subscribers, newSubscriberWithId])
      setFilteredSubscribers([...filteredSubscribers, newSubscriberWithId])

      // Reset the form
      setNewSubscriber({
        name: "",
        email: "",
        plan: "",
        status: "Active",
      })

      // Close the dialog
      setIsAddDialogOpen(false)
    } catch (error) {
      toast.error("Failed to add subscriber", {
        description: "There was an error adding the subscriber. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Error adding subscriber:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateSubscriber = async () => {
    if (!validateForm(selectedSubscriber)) {
      toast.error("Please fix the errors in the form", {
        description: "There are missing or invalid fields in the form.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the subscriber in the lists
      const updatedSubscribers = subscribers.map((sub) => (sub.id === selectedSubscriber.id ? selectedSubscriber : sub))

      const updatedFilteredSubscribers = filteredSubscribers.map((sub) =>
        sub.id === selectedSubscriber.id ? selectedSubscriber : sub,
      )

      setSubscribers(updatedSubscribers)
      setFilteredSubscribers(updatedFilteredSubscribers)

      // Success case
      toast.success("Subscriber updated successfully", {
        description: `${selectedSubscriber.name}'s information has been updated.`,
      })

      // Close the dialog
      setIsEditDialogOpen(false)
    } catch (error) {
      toast.error("Failed to update subscriber", {
        description: "There was an error updating the subscriber. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Error updating subscriber:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExport = async (format: string) => {
    // Show loading toast
    const loadingToast = toast.loading(`Exporting ${subscribers.length} subscribers...`)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate file name
      const fileName = `subscribers_${new Date().toISOString().split("T")[0]}.${format}`

      // Success case
      toast.dismiss(loadingToast)
      toast.success("Export completed", {
        description: `${subscribers.length} subscribers exported to ${fileName}`,
      })

      // Simulate file download
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/plain;charset=utf-8,")
      element.setAttribute("download", fileName)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      // Error case
      toast.dismiss(loadingToast)
      toast.error("Export failed", {
        description: "There was an error exporting the data. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Export error:", error)
    } finally {
      // Close the popover
      setIsExportPopoverOpen(false)
    }
  }

  const handleCancelSubscription = (subscriber: any) => {
    setSubscriberToCancel(subscriber)
    setIsConfirmCancelDialogOpen(true)
  }

  const confirmCancelSubscription = () => {
    if (!subscriberToCancel) return

    // Close the confirmation dialog
    setIsConfirmCancelDialogOpen(false)

    // Get the original subscriber state before cancellation
    const originalSubscriber = { ...subscriberToCancel }

    // Update the subscriber status to Cancelled
    const updatedSubscribers = subscribers.map((sub) =>
      sub.id === subscriberToCancel.id ? { ...sub, status: "Cancelled", nextDelivery: "N/A" } : sub,
    )

    const updatedFilteredSubscribers = filteredSubscribers.map((sub) =>
      sub.id === subscriberToCancel.id ? { ...sub, status: "Cancelled", nextDelivery: "N/A" } : sub,
    )

    setSubscribers(updatedSubscribers)
    setFilteredSubscribers(updatedFilteredSubscribers)

    // Show toast with undo button
    toast.success("Subscription cancelled", {
      description: `${subscriberToCancel.name}'s subscription has been cancelled.`,
      action: {
        label: "Undo",
        onClick: () => {
          // Restore the original subscriber state
          const restoredSubscribers = subscribers.map((sub) =>
            sub.id === originalSubscriber.id ? originalSubscriber : sub,
          )

          const restoredFilteredSubscribers = filteredSubscribers.map((sub) =>
            sub.id === originalSubscriber.id ? originalSubscriber : sub,
          )

          setSubscribers(restoredSubscribers)
          setFilteredSubscribers(restoredFilteredSubscribers)

          toast.success("Cancellation undone", {
            description: `${originalSubscriber.name}'s subscription has been restored.`,
          })
        },
      },
    })
  }

  const handleDeleteAccount = (subscriberId: string) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Remove the subscriber from the lists
          const updatedSubscribers = subscribers.filter((sub) => sub.id !== subscriberId)
          const updatedFilteredSubscribers = filteredSubscribers.filter((sub) => sub.id !== subscriberId)

          setSubscribers(updatedSubscribers)
          setFilteredSubscribers(updatedFilteredSubscribers)

          resolve(subscriberId)
        }, 1000)
      }),
      {
        loading: "Deleting account...",
        success: "Account deleted successfully",
        error: "Failed to delete account. Please try again.",
      },
    )
  }

  const handleSendEmail = (subscriber: any) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(subscriber.id)
        }, 1000)
      }),
      {
        loading: `Sending email to ${subscriber.name}...`,
        success: `Email sent to ${subscriber.name}`,
        error: "Failed to send email. Please try again.",
      },
    )
  }

  // Mobile view detection
  const [isMobileView, setIsMobileView] = useState(false)

  // Check if we're in mobile view on component mount and window resize
  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 640)
    }

    // Initial check
    checkMobileView()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <DashboardHeader
        title="Subscribers"
        description="Manage your subscribers and their meal plans"
        actions={
          <Button aria-label="Add new subscriber" className="gap-1 rounded-full" onClick={handleAddSubscriber}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Add Subscriber</span>
          </Button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-4 w-full">
        <Card className="w-full transition-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">1,248</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">+124</span>
              <span>this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full transition-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <UserCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">1,132</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">90.7%</span>
              <span>of total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full transition-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <TrendingDown className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2.4%</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">-0.3%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full transition-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Subscription Length</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">8.2 mo</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">+0.5</span>
              <span>from last quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-2 sm:p-4 w-full">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div>
                <CardTitle>Subscriber List</CardTitle>
                <CardDescription>View and manage all your subscribers</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Popover open={isExportPopoverOpen} onOpenChange={setIsExportPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 rounded-full">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Export Format</h4>
                        <p className="text-sm text-muted-foreground">Choose the format for your export</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className={exportFormat === "csv" ? "bg-primary/20" : ""}
                            onClick={() => setExportFormat("csv")}
                          >
                            CSV
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={exportFormat === "excel" ? "bg-primary/20" : ""}
                            onClick={() => setExportFormat("excel")}
                          >
                            Excel
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={exportFormat === "pdf" ? "bg-primary/20" : ""}
                            onClick={() => setExportFormat("pdf")}
                          >
                            PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={exportFormat === "json" ? "bg-primary/20" : ""}
                            onClick={() => setExportFormat("json")}
                          >
                            JSON
                          </Button>
                        </div>
                        <Button className="w-full gap-1" onClick={() => handleExport(exportFormat)}>
                          <FileDown className="h-4 w-4" />
                          Export {filteredSubscribers.length} subscribers
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Filter Popover */}
                <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-1 rounded-full ${activeFilterCount > 0 ? "bg-primary/20 text-primary" : ""}`}
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filter</span>
                      {activeFilterCount > 0 && (
                        <Badge className="ml-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] sm:w-80" align="end">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium leading-none">Filter Subscribers</h4>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={resetFilters}>
                          Reset
                        </Button>
                      </div>

                      {/* Status Filter */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Status</h5>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(filters.status).map(([status, isChecked]) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`status-${status}`}
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  setFilters((prev) => ({
                                    ...prev,
                                    status: {
                                      ...prev.status,
                                      [status]: checked === true,
                                    },
                                  }))
                                }}
                              />
                              <label
                                htmlFor={`status-${status}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {status}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Plan Filter */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Plan</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(filters.plan).map(([plan, isChecked]) => (
                            <div key={plan} className="flex items-center space-x-2">
                              <Checkbox
                                id={`plan-${plan}`}
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  setFilters((prev) => ({
                                    ...prev,
                                    plan: {
                                      ...prev.plan,
                                      [plan]: checked === true,
                                    },
                                  }))
                                }}
                              />
                              <label
                                htmlFor={`plan-${plan}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {plan}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Date Range Filter */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Start Date Range</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="from" className="text-xs">
                              From
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  id="from"
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start text-left font-normal truncate"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                  <span className="truncate">
                                    {filters.dateRange.from
                                      ? format(filters.dateRange.from, "MMM d, yyyy")
                                      : "Pick a date"}
                                  </span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={filters.dateRange.from}
                                  onSelect={(date) => {
                                    setFilters((prev) => ({
                                      ...prev,
                                      dateRange: {
                                        ...prev.dateRange,
                                        from: date,
                                      },
                                    }))
                                  }}
                                  initialFocus
                                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="to" className="text-xs">
                              To
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  id="to"
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start text-left font-normal truncate"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                  <span className="truncate">
                                    {filters.dateRange.to ? format(filters.dateRange.to, "MMM d, yyyy") : "Pick a date"}
                                  </span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={filters.dateRange.to}
                                  onSelect={(date) => {
                                    setFilters((prev) => ({
                                      ...prev,
                                      dateRange: {
                                        ...prev.dateRange,
                                        to: date,
                                      },
                                    }))
                                  }}
                                  initialFocus
                                  disabled={(date) => {
                                    const today = new Date(new Date().setHours(0, 0, 0, 0))
                                    return date < today || (filters.dateRange.from && date < filters.dateRange.from)
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>

                      <Button onClick={applyFilters} className="w-full">
                        Apply Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeFilterCount > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="text-xs sm:text-sm text-muted-foreground">Active filters:</span>

                {/* Status filter badges */}
                {Object.entries(filters.status)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([status]) => (
                    <Badge key={`status-${status}`} variant="outline" className="flex items-center gap-1 bg-primary/10">
                      Status: {status}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            status: {
                              ...prev.status,
                              [status]: false,
                            },
                          }))
                          applyFilters()
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {status} filter</span>
                      </Button>
                    </Badge>
                  ))}

                {/* Plan filter badges */}
                {Object.entries(filters.plan)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([plan]) => (
                    <Badge key={`plan-${plan}`} variant="outline" className="flex items-center gap-1 bg-primary/10">
                      Plan: {plan}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            plan: {
                              ...prev.plan,
                              [plan]: false,
                            },
                          }))
                          applyFilters()
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {plan} filter</span>
                      </Button>
                    </Badge>
                  ))}

                {/* Date range filter badge */}
                {(filters.dateRange.from || filters.dateRange.to) && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-primary/10">
                    Date:
                    {filters.dateRange.from && format(filters.dateRange.from, "MM/dd/yy")}
                    {filters.dateRange.from && filters.dateRange.to && " - "}
                    {filters.dateRange.to && format(filters.dateRange.to, "MM/dd/yy")}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: {
                            from: undefined,
                            to: undefined,
                          },
                        }))
                        applyFilters()
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove date filter</span>
                    </Button>
                  </Badge>
                )}

                <Button variant="ghost" size="sm" className="h-7 rounded-full text-xs" onClick={resetFilters}>
                  Clear all
                </Button>
              </div>
            )}

            {isMobileView ? (
              // Mobile card view for subscribers
              <div className="space-y-3">
                {filteredSubscribers.map((subscriber) => (
                  <div key={subscriber.id} className="mobile-table-card">
                    <div className="mobile-table-card-header">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${subscriber.avatar}`}
                            alt={subscriber.name}
                          />
                          <AvatarFallback className="text-xs">{subscriber.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{subscriber.name}</div>
                          <div className="text-xs text-muted-foreground">{subscriber.email}</div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(subscriber)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditSubscriber(subscriber)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit subscription
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendEmail(subscriber)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {subscriber.status !== "Cancelled" ? (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleCancelSubscription(subscriber)}
                            >
                              Cancel subscription
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteAccount(subscriber.id)}
                            >
                              Delete account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mobile-table-card-content mt-2">
                      <div>
                        <div className="mobile-table-card-label">Plan</div>
                        <Badge variant="outline" className="bg-primary/10 text-primary mt-1">
                          {subscriber.plan}
                        </Badge>
                      </div>
                      <div>
                        <div className="mobile-table-card-label">Status</div>
                        <Badge
                          variant={
                            subscriber.status === "Active"
                              ? "default"
                              : subscriber.status === "Paused"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            subscriber.status === "Active"
                              ? "bg-primary/20 text-primary hover:bg-primary/30 mt-1"
                              : subscriber.status === "Paused"
                                ? "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 dark:text-amber-400 mt-1"
                                : "mt-1"
                          }
                        >
                          {subscriber.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="mobile-table-card-label">Start Date</div>
                        <div className="mobile-table-card-value">{subscriber.startDate}</div>
                      </div>
                      <div>
                        <div className="mobile-table-card-label">Next Delivery</div>
                        <div className="mobile-table-card-value">{subscriber.nextDelivery}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop table view
              <div className="w-full overflow-auto">
                <Table className="min-w-[800px] lg:min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscriber</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Next Delivery</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.length > 0 ? (
                      filteredSubscribers.map((subscriber) => (
                        <TableRow key={subscriber.id} className="hover:bg-muted/50">
                          <TableCell className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-border">
                              <AvatarImage
                                src={`/placeholder.svg?height=36&width=36&text=${subscriber.avatar}`}
                                alt={subscriber.name}
                              />
                              <AvatarFallback className="text-xs">{subscriber.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{subscriber.name}</span>
                              <span className="text-xs text-muted-foreground">{subscriber.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {subscriber.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                subscriber.status === "Active"
                                  ? "default"
                                  : subscriber.status === "Paused"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                subscriber.status === "Active"
                                  ? "bg-primary/20 text-primary hover:bg-primary/30"
                                  : subscriber.status === "Paused"
                                    ? "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 dark:text-amber-400"
                                    : ""
                              }
                            >
                              {subscriber.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{subscriber.startDate}</TableCell>
                          <TableCell>{subscriber.nextDelivery}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleEditSubscriber(subscriber)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit {subscriber.name}</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleViewDetails(subscriber)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditSubscriber(subscriber)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit subscription
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSendEmail(subscriber)}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send email
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {subscriber.status !== "Cancelled" ? (
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => handleCancelSubscription(subscriber)}
                                    >
                                      Cancel subscription
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={() => handleDeleteAccount(subscriber.id)}
                                    >
                                      Delete account
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="rounded-full bg-muted p-3">
                              <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">No subscribers found</p>
                              <p className="text-sm text-muted-foreground">
                                Try adjusting your filters or add a new subscriber
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2" onClick={resetFilters}>
                              Reset filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {filteredSubscribers.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-8">
                <div className="rounded-full bg-muted p-3">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">No subscribers found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or add a new subscriber</p>
                </div>
                <Button variant="outline" size="sm" className="mt-2" onClick={resetFilters}>
                  Reset filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs with mobile optimizations */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Subscriber</DialogTitle>
          </DialogHeader>
          <DialogDescription>Create a new subscriber to start sending meal plans.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="name" className="sm:text-right">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                value={newSubscriber.name}
                onChange={(e) => handleNewSubscriberChange("name", e.target.value)}
                className="sm:col-span-3"
              />
              {formErrors.name && (
                <p className="col-span-1 sm:col-span-4 mt-1 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="email" className="sm:text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={newSubscriber.email}
                onChange={(e) => handleNewSubscriberChange("email", e.target.value)}
                className="sm:col-span-3"
              />
              {formErrors.email && (
                <p className="col-span-1 sm:col-span-4 mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="plan" className="sm:text-right">
                Plan
              </Label>
              <Select onValueChange={(value) => handleNewSubscriberChange("plan", value)}>
                <SelectTrigger className="sm:col-span-3">
                  <SelectValue placeholder="Select a plan" defaultValue={newSubscriber.plan} />
                </SelectTrigger>
                <SelectContent>
                  {mealPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.name}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.plan && (
                <p className="col-span-1 sm:col-span-4 mt-1 text-sm text-red-500">{formErrors.plan}</p>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmitSubscriber} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  Adding...
                  <svg className="ml-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                      opacity=".5"
                    />
                    <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        from="0 12 0"
                        repeatCount="indefinite"
                        to="360 12 0"
                        type="rotate"
                      />
                    </path>
                  </svg>
                </>
              ) : (
                "Add Subscriber"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subscriber Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
          </DialogHeader>
          <DialogDescription>Make changes to the subscriber's information.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="name" className="sm:text-right">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                value={selectedSubscriber?.name || ""}
                onChange={(e) => handleEditSubscriberChange("name", e.target.value)}
                className="sm:col-span-3"
              />
              {formErrors.name && (
                <p className="col-span-1 sm:col-span-4 mt-1 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="email" className="sm:text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={selectedSubscriber?.email || ""}
                onChange={(e) => handleEditSubscriberChange("email", e.target.value)}
                className="sm:col-span-3"
              />
              {formErrors.email && (
                <p className="col-span-1 sm:col-span-4 mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="plan" className="sm:text-right">
                Plan
              </Label>
              <Select
                onValueChange={(value) => handleEditSubscriberChange("plan", value)}
                defaultValue={selectedSubscriber?.plan}
              >
                <SelectTrigger className="sm:col-span-3">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  {mealPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.name}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.plan && (
                <p className="col-span-1 sm:col-span-4 mt-1 text-sm text-red-500">{formErrors.plan}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="status" className="sm:text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) => handleEditSubscriberChange("status", value)}
                defaultValue={selectedSubscriber?.status}
              >
                <SelectTrigger className="sm:col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleUpdateSubscriber} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? (
                <>
                  Updating...
                  <svg className="ml-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                      opacity=".5"
                    />
                    <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        from="0 12 0"
                        repeatCount="indefinite"
                        to="360 12 0"
                        type="rotate"
                      />
                    </path>
                  </svg>
                </>
              ) : (
                "Update Subscriber"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Subscriber Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>View detailed information about the subscriber.</DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
              <Label className="sm:text-right">Name</Label>
              <span>{selectedSubscriber?.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
              <Label className="sm:text-right">Email</Label>
              <span>{selectedSubscriber?.email}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
              <Label className="sm:text-right">Plan</Label>
              <span>{selectedSubscriber?.plan}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
              <Label className="sm:text-right">Status</Label>
              <span>{selectedSubscriber?.status}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
              <Label className="sm:text-right">Start Date</Label>
              <span>{selectedSubscriber?.startDate}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
              <Label className="sm:text-right">Next Delivery</Label>
              <span>{selectedSubscriber?.nextDelivery}</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsViewDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Cancel Dialog */}
      <Dialog open={isConfirmCancelDialogOpen} onOpenChange={setIsConfirmCancelDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>Are you sure you want to cancel this subscription?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsConfirmCancelDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmCancelSubscription}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

