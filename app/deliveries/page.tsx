"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  CalendarIcon,
  CheckCircle,
  Clock,
  MapPin,
  Download,
  Filter,
  Edit,
  MoreHorizontal,
  FileDown,
  AlertCircle,
  X,
  Package,
  Eye,
  Calendar,
  UserCheck,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"

const initialDeliveries = [
  {
    id: "DEL-001",
    customer: "John Smith",
    address: "123 Main St, Anytown",
    date: "2023-07-05",
    timeSlot: "9:00 AM - 12:00 PM",
    status: "Scheduled",
    items: "Weekly Vegetarian Box",
    driver: "Michael Rodriguez",
    avatar: "JS",
  },
  {
    id: "DEL-002",
    customer: "Sarah Johnson",
    address: "456 Oak Ave, Somewhere",
    date: "2023-07-05",
    timeSlot: "1:00 PM - 4:00 PM",
    status: "Scheduled",
    items: "Weekly Keto Box",
    driver: "David Chen",
    avatar: "SJ",
  },
  {
    id: "DEL-003",
    customer: "Michael Brown",
    address: "789 Pine Rd, Nowhere",
    date: "2023-07-06",
    timeSlot: "9:00 AM - 12:00 PM",
    status: "Scheduled",
    items: "Weekly Paleo Box",
    driver: "Jessica Kim",
    avatar: "MB",
  },
  {
    id: "DEL-004",
    customer: "Emily Davis",
    address: "321 Elm St, Everywhere",
    date: "2023-07-06",
    timeSlot: "1:00 PM - 4:00 PM",
    status: "Scheduled",
    items: "Weekly Vegan Box",
    driver: "Michael Rodriguez",
    avatar: "ED",
  },
  {
    id: "DEL-005",
    customer: "David Wilson",
    address: "654 Maple Dr, Somewhere",
    date: "2023-07-07",
    timeSlot: "9:00 AM - 12:00 PM",
    status: "Scheduled",
    items: "Weekly Standard Box",
    driver: "David Chen",
    avatar: "DW",
  },
  {
    id: "DEL-006",
    customer: "Jennifer Lee",
    address: "987 Birch Ln, Anytown",
    date: "2023-07-07",
    timeSlot: "1:00 PM - 4:00 PM",
    status: "Scheduled",
    items: "Weekly Vegetarian Box",
    driver: "Jessica Kim",
    avatar: "JL",
  },
  {
    id: "DEL-007",
    customer: "Robert Taylor",
    address: "246 Cedar St, Nowhere",
    date: "2023-07-08",
    timeSlot: "9:00 AM - 12:00 PM",
    status: "Scheduled",
    items: "Weekly Keto Box",
    driver: "Michael Rodriguez",
    avatar: "RT",
  },
  {
    id: "DEL-008",
    customer: "Lisa Anderson",
    address: "135 Walnut Ave, Everywhere",
    date: "2023-07-08",
    timeSlot: "1:00 PM - 4:00 PM",
    status: "Scheduled",
    items: "Weekly Paleo Box",
    driver: "David Chen",
    avatar: "LA",
  },
]

const initialPastDeliveries = [
  {
    id: "DEL-101",
    customer: "John Smith",
    address: "123 Main St, Anytown",
    date: "2023-06-28",
    timeSlot: "9:00 AM - 12:00 PM",
    status: "Delivered",
    items: "Weekly Vegetarian Box",
    driver: "Michael Rodriguez",
    avatar: "JS",
  },
  {
    id: "DEL-102",
    customer: "Sarah Johnson",
    address: "456 Oak Ave, Somewhere",
    date: "2023-06-28",
    timeSlot: "1:00 PM - 4:00 PM",
    status: "Delivered",
    items: "Weekly Keto Box",
    driver: "David Chen",
    avatar: "SJ",
  },
  {
    id: "DEL-103",
    customer: "Michael Brown",
    address: "789 Pine Rd, Nowhere",
    date: "2023-06-29",
    timeSlot: "9:00 AM - 12:00 PM",
    status: "Failed",
    items: "Weekly Paleo Box",
    driver: "Jessica Kim",
    avatar: "MB",
  },
  {
    id: "DEL-104",
    customer: "Emily Davis",
    address: "321 Elm St, Everywhere",
    date: "2023-06-29",
    timeSlot: "1:00 PM - 4:00 PM",
    status: "Delivered",
    items: "Weekly Vegan Box",
    driver: "Michael Rodriguez",
    avatar: "ED",
  },
]

const customers = [
  { id: "CUST-001", name: "John Smith" },
  { id: "CUST-002", name: "Sarah Johnson" },
  { id: "CUST-003", name: "Michael Brown" },
  { id: "CUST-004", name: "Emily Davis" },
  { id: "CUST-005", name: "David Wilson" },
  { id: "CUST-006", name: "Jennifer Lee" },
  { id: "CUST-007", name: "Robert Taylor" },
  { id: "CUST-008", name: "Lisa Anderson" },
]

const drivers = [
  { id: "DRV-001", name: "Michael Rodriguez" },
  { id: "DRV-002", name: "David Chen" },
  { id: "DRV-003", name: "Jessica Kim" },
]

const mealPlans = [
  { id: "PLAN-001", name: "Weekly Vegetarian Box" },
  { id: "PLAN-002", name: "Weekly Keto Box" },
  { id: "PLAN-003", name: "Weekly Paleo Box" },
  { id: "PLAN-004", name: "Weekly Vegan Box" },
  { id: "PLAN-005", name: "Weekly Standard Box" },
]

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries)
  const [pastDeliveries, setPastDeliveries] = useState(initialPastDeliveries)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false)
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [isAssignDriverDialogOpen, setIsAssignDriverDialogOpen] = useState(false)
  const [isExportPopoverOpen, setIsExportPopoverOpen] = useState(false)
  const [isPastExportPopoverOpen, setIsPastExportPopoverOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [pastExportFormat, setPastExportFormat] = useState("csv")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [newDelivery, setNewDelivery] = useState({
    customer: "",
    address: "",
    date: "",
    timeSlot: "morning",
    items: "",
    driver: "",
  })
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false)
  const [filteredDeliveries, setFilteredDeliveries] = useState(
    [...deliveries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  )
  const [filteredPastDeliveries, setFilteredPastDeliveries] = useState(
    [...pastDeliveries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  )
  const [filters, setFilters] = useState({
    status: {
      Scheduled: false,
      Delivered: false,
      Failed: false,
    },
    driver: {
      "Michael Rodriguez": false,
      "David Chen": false,
      "Jessica Kim": false,
    },
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
  })
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const [isCancelConfirmDialogOpen, setIsCancelConfirmDialogOpen] = useState(false)
  const [deliveryToCancel, setDeliveryToCancel] = useState<string | null>(null)

  // Mobile view detection
  const [isMobileView, setIsMobileView] = useState(false)

  // Check if we're in mobile view on component mount and window resize
  useEffect(() => {
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

  const handleScheduleDelivery = () => {
    setIsScheduleDialogOpen(true)
    // Reset form errors when opening the dialog
    setFormErrors({})
  }

  const handleEditDelivery = (delivery: any) => {
    setSelectedDelivery({ ...delivery })
    setIsEditDialogOpen(true)
    setFormErrors({})
  }

  const handleViewDetails = (delivery: any) => {
    setSelectedDelivery({ ...delivery })
    setIsViewDetailsDialogOpen(true)
  }

  const handleReschedule = (delivery: any) => {
    setSelectedDelivery({ ...delivery })
    setIsRescheduleDialogOpen(true)
    setFormErrors({})
  }

  const handleAssignDriver = (delivery: any) => {
    setSelectedDelivery({ ...delivery })
    setIsAssignDriverDialogOpen(true)
    setFormErrors({})
  }

  const handleNewDeliveryChange = (field: string, value: string) => {
    setNewDelivery((prev) => ({
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

  const handleSelectedDeliveryChange = (field: string, value: string) => {
    setSelectedDelivery((prev: any) => ({
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

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId)
    if (customer) {
      handleNewDeliveryChange("customer", customer.name)
    }
  }

  const handleDriverSelect = (driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId)
    if (driver) {
      handleNewDeliveryChange("driver", driver.name)
    }
  }

  const handleItemsSelect = (planId: string) => {
    const plan = mealPlans.find((p) => p.id === planId)
    if (plan) {
      handleNewDeliveryChange("items", plan.name)
    }
  }

  const handleEditDriverSelect = (driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId)
    if (driver && selectedDelivery) {
      handleSelectedDeliveryChange("driver", driver.name)
    }
  }

  const handleEditItemsSelect = (planId: string) => {
    const plan = mealPlans.find((p) => p.id === planId)
    if (plan && selectedDelivery) {
      handleSelectedDeliveryChange("items", plan.name)
    }
  }

  const validateForm = (delivery: any) => {
    const errors: Record<string, string> = {}

    if (!delivery.customer) {
      errors.customer = "Customer is required"
    }

    if (!delivery.address) {
      errors.address = "Address is required"
    }

    if (!delivery.date) {
      errors.date = "Date is required"
    } else {
      const selectedDate = new Date(delivery.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        errors.date = "Date cannot be in the past"
      }
    }

    if (!delivery.items) {
      errors.items = "Items are required"
    }

    if (!delivery.driver) {
      errors.driver = "Driver is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddDelivery = async () => {
    if (!validateForm(newDelivery)) {
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

      // Create a new delivery object
      const newDeliveryObj = {
        id: `DEL-${String(deliveries.length + 1).padStart(3, "0")}`,
        customer: newDelivery.customer,
        address: newDelivery.address,
        date: newDelivery.date,
        timeSlot: newDelivery.timeSlot === "morning" ? "9:00 AM - 12:00 PM" : "1:00 PM - 4:00 PM",
        status: "Scheduled",
        items: newDelivery.items,
        driver: newDelivery.driver,
        avatar: newDelivery.customer
          .split(" ")
          .map((n) => n[0])
          .join(""),
      }

      // Add to deliveries
      const updatedDeliveries = [...deliveries, newDeliveryObj]
      setDeliveries(updatedDeliveries)
      setFilteredDeliveries(updatedDeliveries)

      // Success case
      toast.success("Delivery scheduled successfully", {
        description: `Delivery for ${newDelivery.customer} has been scheduled for ${newDelivery.date}.`,
      })

      // Reset the form
      setNewDelivery({
        customer: "",
        address: "",
        date: "",
        timeSlot: "morning",
        items: "",
        driver: "",
      })

      // Close the dialog
      setIsScheduleDialogOpen(false)
    } catch (error) {
      toast.error("Failed to schedule delivery", {
        description: "There was an error scheduling the delivery. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Error scheduling delivery:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateDelivery = async () => {
    if (!selectedDelivery || !validateForm(selectedDelivery)) {
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

      // Update deliveries
      const updatedDeliveries = deliveries.map((delivery) =>
        delivery.id === selectedDelivery.id ? selectedDelivery : delivery,
      )

      setDeliveries(updatedDeliveries)
      setFilteredDeliveries(updatedDeliveries)

      // Success case
      toast.success("Delivery updated successfully", {
        description: `Delivery for ${selectedDelivery.customer} has been updated.`,
      })

      // Close the dialog
      setIsEditDialogOpen(false)
    } catch (error) {
      toast.error("Failed to update delivery", {
        description: "There was an error updating the delivery. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Error updating delivery:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRescheduleDelivery = async () => {
    if (!selectedDelivery || !selectedDelivery.date) {
      toast.error("Please select a valid date", {
        description: "A date is required to reschedule the delivery.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update deliveries
      const updatedDeliveries = deliveries.map((delivery) =>
        delivery.id === selectedDelivery.id
          ? {
              ...delivery,
              date: selectedDelivery.date,
              timeSlot: selectedDelivery.timeSlot,
            }
          : delivery,
      )

      setDeliveries(updatedDeliveries)
      setFilteredDeliveries(updatedDeliveries)

      // Success case
      toast.success("Delivery rescheduled successfully", {
        description: `Delivery for ${selectedDelivery.customer} has been rescheduled to ${selectedDelivery.date}.`,
      })

      // Close the dialog
      setIsRescheduleDialogOpen(false)
    } catch (error) {
      toast.error("Failed to reschedule delivery", {
        description: "There was an error rescheduling the delivery. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Error rescheduling delivery:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAssignDriverSubmit = async () => {
    if (!selectedDelivery || !selectedDelivery.driver) {
      toast.error("Please select a driver", {
        description: "A driver must be assigned to the delivery.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update deliveries
      const updatedDeliveries = deliveries.map((delivery) =>
        delivery.id === selectedDelivery.id
          ? {
              ...delivery,
              driver: selectedDelivery.driver,
            }
          : delivery,
      )

      setDeliveries(updatedDeliveries)
      setFilteredDeliveries(updatedDeliveries)

      // Success case
      toast.success("Driver assigned successfully", {
        description: `${selectedDelivery.driver} has been assigned to the delivery for ${selectedDelivery.customer}.`,
      })

      // Close the dialog
      setIsAssignDriverDialogOpen(false)
    } catch (error) {
      toast.error("Failed to assign driver", {
        description: "There was an error assigning the driver. Please try again.",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      })
      console.error("Error assigning driver:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExport = async (format: string, isUpcoming = true) => {
    // In a real application, this would generate and download a file
    const dataToExport = isUpcoming ? deliveries : pastDeliveries
    const fileName = `deliveries_${isUpcoming ? "upcoming" : "past"}_${new Date().toISOString().split("T")[0]}.${format}`

    // Show loading toast
    const loadingToast = toast.loading(`Exporting ${dataToExport.length} deliveries...`)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Randomly simulate an error (20% chance)
      if (Math.random() < 0.2) {
        throw new Error("Network error during export")
      }

      // Success case
      toast.dismiss(loadingToast)
      toast.success("Export completed", {
        description: `${dataToExport.length} deliveries exported to ${fileName}`,
      })

      console.log(`Exported ${dataToExport.length} deliveries to ${fileName}`)
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
      if (isUpcoming) {
        setIsExportPopoverOpen(false)
      } else {
        setIsPastExportPopoverOpen(false)
      }
    }
  }

  const confirmCancelDelivery = (deliveryId: string) => {
    setDeliveryToCancel(deliveryId)
    setIsCancelConfirmDialogOpen(true)
  }

  const handleCancelDelivery = () => {
    if (!deliveryToCancel) return

    // Find the delivery to cancel
    const deliveryToCancelObj = deliveries.find((delivery) => delivery.id === deliveryToCancel)

    if (!deliveryToCancelObj) return

    // Store original state for undo functionality
    const originalDeliveries = [...deliveries]
    const originalFilteredDeliveries = [...filteredDeliveries]
    const originalPastDeliveries = [...pastDeliveries]
    const originalFilteredPastDeliveries = [...filteredPastDeliveries]

    // Update deliveries
    const updatedDeliveries = deliveries.filter((delivery) => delivery.id !== deliveryToCancel)
    const updatedPastDeliveries = [
      ...pastDeliveries,
      {
        ...deliveryToCancelObj,
        status: "Cancelled",
      },
    ]

    setDeliveries(updatedDeliveries)
    setFilteredDeliveries(updatedDeliveries.filter((d) => filteredDeliveries.some((fd) => fd.id === d.id)))
    setPastDeliveries(updatedPastDeliveries)
    setFilteredPastDeliveries([
      ...filteredPastDeliveries,
      {
        ...deliveryToCancelObj,
        status: "Cancelled",
      },
    ])

    // Close the confirmation dialog
    setIsCancelConfirmDialogOpen(false)
    setDeliveryToCancel(null)

    // Show toast with undo button
    toast.success("Delivery cancelled successfully", {
      description: `Delivery for ${deliveryToCancelObj.customer} has been cancelled.`,
      action: {
        label: "Undo",
        onClick: () => {
          // Restore original state
          setDeliveries(originalDeliveries)
          setFilteredDeliveries(originalFilteredDeliveries)
          setPastDeliveries(originalPastDeliveries)
          setFilteredPastDeliveries(originalFilteredPastDeliveries)

          toast.success("Cancellation undone", {
            description: `Delivery for ${deliveryToCancelObj.customer} has been restored.`,
          })
        },
      },
    })
  }

  const applyFilters = () => {
    let result = [...deliveries]
    let pastResult = [...pastDeliveries]

    // Filter by status
    const selectedStatuses = Object.entries(filters.status)
      .filter(([_, isSelected]) => isSelected)
      .map(([status]) => status)

    if (selectedStatuses.length > 0) {
      result = result.filter((del) => selectedStatuses.includes(del.status))
      pastResult = pastResult.filter((del) => selectedStatuses.includes(del.status))
    }

    // Filter by driver
    const selectedDrivers = Object.entries(filters.driver)
      .filter(([_, isSelected]) => isSelected)
      .map(([driver]) => driver)

    if (selectedDrivers.length > 0) {
      result = result.filter((del) => selectedDrivers.includes(del.driver))
      pastResult = pastResult.filter((del) => selectedDrivers.includes(del.driver))
    }

    // Filter by date range
    if (filters.dateRange.from) {
      result = result.filter((del) => {
        const delDate = new Date(del.date)
        return delDate >= filters.dateRange.from!
      })
      pastResult = pastResult.filter((del) => {
        const delDate = new Date(del.date)
        return delDate >= filters.dateRange.from!
      })
    }

    if (filters.dateRange.to) {
      result = result.filter((del) => {
        const delDate = new Date(del.date)
        return delDate <= filters.dateRange.to!
      })
      pastResult = pastResult.filter((del) => {
        const delDate = new Date(del.date)
        return delDate <= filters.dateRange.to!
      })
    }

    result = result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    pastResult = pastResult.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setFilteredDeliveries(result)
    setFilteredPastDeliveries(pastResult)

    // Count active filters
    let count = 0
    count += selectedStatuses.length > 0 ? 1 : 0
    count += selectedDrivers.length > 0 ? 1 : 0
    count += filters.dateRange.from || filters.dateRange.to ? 1 : 0
    setActiveFilterCount(count)

    setIsFilterPopoverOpen(false)
  }

  const resetFilters = () => {
    setFilters({
      status: {
        Scheduled: false,
        Delivered: false,
        Failed: false,
      },
      driver: {
        "Michael Rodriguez": false,
        "David Chen": false,
        "Jessica Kim": false,
      },
      dateRange: {
        from: undefined,
        to: undefined,
      },
    })
    setFilteredDeliveries(deliveries)
    setFilteredPastDeliveries(pastDeliveries)
    setActiveFilterCount(0)
  }

  const removeFilter = (filterType: string, value: string) => {
    setFilters((prev) => {
      const updated = { ...prev }
      if (filterType === "status" || filterType === "driver") {
        updated[filterType] = {
          ...updated[filterType],
          [value]: false,
        }
      } else if (filterType === "dateRange") {
        updated.dateRange = {
          from: undefined,
          to: undefined,
        }
      }
      return updated
    })

    // Re-apply remaining filters
    setTimeout(applyFilters, 0)
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <DashboardHeader
        title="Deliveries"
        description="Schedule and track meal deliveries"
        actions={
          <Button aria-label="Schedule new delivery" className="gap-1 rounded-full" onClick={handleScheduleDelivery}>
            <Truck className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Schedule Delivery</span>
          </Button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-4 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <CalendarIcon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">24</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">8</span>
              <span>completed</span>
              <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                16
              </span>
              <span>pending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Truck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">342</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">+5%</span>
              <span>from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Success Rate</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">98.5%</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">+0.3%</span>
              <span>last 30 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">42 min</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">-3 min</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-2 sm:p-4 w-full">
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 sm:mb-6 w-full justify-start rounded-full bg-muted/50 p-1 text-xs sm:text-sm overflow-x-auto">
            <TabsTrigger value="upcoming" className="rounded-full">
              Upcoming Deliveries
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-full">
              Past Deliveries
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <Card className="w-full">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div>
                    <CardTitle>Upcoming Deliveries</CardTitle>
                    <CardDescription>View and manage scheduled deliveries</CardDescription>
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
                            <Button className="w-full gap-1" onClick={() => handleExport(exportFormat, true)}>
                              <FileDown className="h-4 w-4" />
                              Export {deliveries.length} deliveries
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
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
                            <h4 className="font-medium leading-none">Filter Deliveries</h4>
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

                          {/* Driver Filter */}
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium">Driver</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(filters.driver).map(([driver, isChecked]) => (
                                <div key={driver} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`driver-${driver}`}
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      setFilters((prev) => ({
                                        ...prev,
                                        driver: {
                                          ...prev.driver,
                                          [driver]: checked === true,
                                        },
                                      }))
                                    }}
                                  />
                                  <label
                                    htmlFor={`driver-${driver}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {driver}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Date Range Filter */}
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium">Date Range</h5>
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
                                    <CalendarComponent
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
                                      disabled={(date) => {
                                        const today = new Date()
                                        today.setHours(0, 0, 0, 0)
                                        return date < today
                                      }}
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
                                        {filters.dateRange.to
                                          ? format(filters.dateRange.to, "MMM d, yyyy")
                                          : "Pick a date"}
                                      </span>
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
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
                                        const today = new Date()
                                        today.setHours(0, 0, 0, 0)
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
                        <Badge
                          key={`status-${status}`}
                          variant="outline"
                          className="flex items-center gap-1 bg-primary/10"
                        >
                          Status: {status}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => removeFilter("status", status)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {status} filter</span>
                          </Button>
                        </Badge>
                      ))}

                    {/* Driver filter badges */}
                    {Object.entries(filters.driver)
                      .filter(([_, isSelected]) => isSelected)
                      .map(([driver]) => (
                        <Badge
                          key={`driver-${driver}`}
                          variant="outline"
                          className="flex items-center gap-1 bg-primary/10"
                        >
                          Driver: {driver}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => removeFilter("driver", driver)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {driver} filter</span>
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
                          onClick={() => removeFilter("dateRange", "")}
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
                  // Mobile card view for deliveries
                  <div className="space-y-3">
                    {filteredDeliveries.map((delivery) => (
                      <div key={delivery.id} className="mobile-table-card">
                        <div className="mobile-table-card-header">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${delivery.avatar}`}
                                alt={delivery.customer}
                              />
                              <AvatarFallback className="text-xs">{delivery.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{delivery.customer}</div>
                              <div className="text-xs text-muted-foreground">{delivery.id}</div>
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
                              <DropdownMenuItem onClick={() => handleViewDetails(delivery)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReschedule(delivery)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAssignDriver(delivery)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Assign driver
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => confirmCancelDelivery(delivery.id)}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel delivery
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mobile-table-card-content mt-2">
                          <div>
                            <div className="mobile-table-card-label">Date</div>
                            <Badge variant="outline" className="bg-primary/10 text-primary mt-1">
                              {delivery.date}
                            </Badge>
                          </div>
                          <div>
                            <div className="mobile-table-card-label">Time</div>
                            <div className="flex items-center gap-1 text-sm mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{delivery.timeSlot}</span>
                            </div>
                          </div>
                          <div>
                            <div className="mobile-table-card-label">Address</div>
                            <div className="flex items-start gap-1 mt-1">
                              <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                              <span className="text-sm">{delivery.address}</span>
                            </div>
                          </div>
                          <div>
                            <div className="mobile-table-card-label">Driver</div>
                            <div className="mobile-table-card-value">{delivery.driver}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="mobile-table-card-label">Items</div>
                            <div className="mobile-table-card-value">{delivery.items}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Desktop table view
                  <div className="w-full overflow-auto">
                    <Table className="min-w-[800px] lg:min-w-full" aria-label="Upcoming deliveries">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Driver</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeliveries.length > 0 ? (
                          filteredDeliveries.map((delivery) => (
                            <TableRow key={delivery.id} className="hover:bg-muted/50">
                              <TableCell className="flex items-center gap-3">
                                <Avatar className="h-9 w-9 border border-border">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=36&width=36&text=${delivery.avatar}`}
                                    alt={delivery.customer}
                                  />
                                  <AvatarFallback className="text-xs">{delivery.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="font-medium">{delivery.customer}</span>
                                  <span className="text-xs text-muted-foreground">{delivery.id}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <Badge variant="outline" className="mb-1 w-fit bg-primary/10 text-primary">
                                    {delivery.date}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span>{delivery.timeSlot}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-1">
                                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                                  <span className="text-sm">{delivery.address}</span>
                                </div>
                              </TableCell>
                              <TableCell>{delivery.items}</TableCell>
                              <TableCell>{delivery.driver}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => handleEditDelivery(delivery)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit {delivery.customer}</span>
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
                                      <DropdownMenuItem onClick={() => handleViewDetails(delivery)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleReschedule(delivery)}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Reschedule
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleAssignDriver(delivery)}>
                                        <UserCheck className="mr-2 h-4 w-4" />
                                        Assign driver
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => confirmCancelDelivery(delivery.id)}
                                      >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel delivery
                                      </DropdownMenuItem>
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
                                  <Package className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium">No deliveries found</p>
                                  <p className="text-sm text-muted-foreground">
                                    Try adjusting your filters or schedule a new delivery
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

                {filteredDeliveries.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-2 py-8">
                    <div className="rounded-full bg-muted p-3">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">No deliveries found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your filters or schedule a new delivery
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past">
            <Card className="w-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Past Deliveries</CardTitle>
                    <CardDescription>View history of completed deliveries</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Popover open={isPastExportPopoverOpen} onOpenChange={setIsPastExportPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1 rounded-full">
                          <Download className="h-4 w-4" />
                          Export
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
                                className={pastExportFormat === "csv" ? "bg-primary/20" : ""}
                                onClick={() => setPastExportFormat("csv")}
                              >
                                CSV
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className={pastExportFormat === "excel" ? "bg-primary/20" : ""}
                                onClick={() => setPastExportFormat("excel")}
                              >
                                Excel
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className={pastExportFormat === "pdf" ? "bg-primary/20" : ""}
                                onClick={() => setPastExportFormat("pdf")}
                              >
                                PDF
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className={pastExportFormat === "json" ? "bg-primary/20" : ""}
                                onClick={() => setPastExportFormat("json")}
                              >
                                JSON
                              </Button>
                            </div>
                            <Button className="w-full gap-1" onClick={() => handleExport(pastExportFormat, false)}>
                              <FileDown className="h-4 w-4" />
                              Export {pastDeliveries.length} deliveries
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`gap-1 rounded-full ${activeFilterCount > 0 ? "bg-primary/20 text-primary" : ""}`}
                        >
                          <Filter className="h-4 w-4" />
                          Filter
                          {activeFilterCount > 0 && (
                            <Badge className="ml-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                              {activeFilterCount}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-auto">
                  <Table className="min-w-[800px] lg:min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPastDeliveries.length > 0 ? (
                        filteredPastDeliveries.map((delivery) => (
                          <TableRow key={delivery.id} className="hover:bg-muted/50">
                            <TableCell className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 border border-border">
                                <AvatarImage
                                  src={`/placeholder.svg?height=36&width=36&text=${delivery.avatar}`}
                                  alt={delivery.customer}
                                />
                                <AvatarFallback className="text-xs">{delivery.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">{delivery.customer}</span>
                                <span className="text-xs text-muted-foreground">{delivery.id}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <Badge variant="outline" className="mb-1 w-fit bg-muted/80 text-muted-foreground">
                                  {delivery.date}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span>{delivery.timeSlot}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-start gap-1">
                                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                                <span className="text-sm">{delivery.address}</span>
                              </div>
                            </TableCell>
                            <TableCell>{delivery.items}</TableCell>
                            <TableCell>{delivery.driver}</TableCell>
                            <TableCell>
                              <Badge
                                variant={delivery.status === "Delivered" ? "default" : "destructive"}
                                className={
                                  delivery.status === "Delivered"
                                    ? "bg-primary/20 text-primary hover:bg-primary/30"
                                    : ""
                                }
                              >
                                {delivery.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="rounded-full bg-muted p-3">
                                <Package className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium">No past deliveries found</p>
                                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs with mobile optimizations */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[550px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Schedule New Delivery</DialogTitle>
            <DialogDescription>Create a new delivery for a customer. Fill in all the details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="customer" className="sm:text-right">
                Customer
              </Label>
              <div className="sm:col-span-3">
                <Select onValueChange={handleCustomerSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.customer && <p className="mt-1 text-xs text-destructive">{formErrors.customer}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="address" className="sm:text-right">
                Address
              </Label>
              <div className="sm:col-span-3">
                <Input
                  id="address"
                  value={newDelivery.address}
                  onChange={(e) => handleNewDeliveryChange("address", e.target.value)}
                  placeholder="Enter delivery address"
                  className={formErrors.address ? "border-destructive" : ""}
                />
                {formErrors.address && <p className="mt-1 text-xs text-destructive">{formErrors.address}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="date" className="sm:text-right">
                Date
              </Label>
              <div className="sm:col-span-3">
                <Input
                  id="date"
                  type="date"
                  value={newDelivery.date}
                  onChange={(e) => handleNewDeliveryChange("date", e.target.value)}
                  className={formErrors.date ? "border-destructive" : ""}
                  min={new Date().toISOString().split("T")[0]}
                />
                {formErrors.date && <p className="mt-1 text-xs text-destructive">{formErrors.date}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="timeSlot" className="sm:text-right">
                Time Slot
              </Label>
              <div className="sm:col-span-3">
                <Select
                  defaultValue={newDelivery.timeSlot}
                  onValueChange={(value) => handleNewDeliveryChange("timeSlot", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="items" className="sm:text-right">
                Items
              </Label>
              <div className="sm:col-span-3">
                <Select onValueChange={handleItemsSelect}>
                  <SelectTrigger className={formErrors.items ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select meal plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.items && <p className="mt-1 text-xs text-destructive">{formErrors.items}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
              <Label htmlFor="driver" className="sm:text-right">
                Driver
              </Label>
              <div className="sm:col-span-3">
                <Select onValueChange={handleDriverSelect}>
                  <SelectTrigger className={formErrors.driver ? "border-destructive" : ""}>
                    <SelectValue placeholder="Assign a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.driver && <p className="mt-1 text-xs text-destructive">{formErrors.driver}</p>}
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddDelivery} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Scheduling..." : "Schedule Delivery"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Other dialogs with similar mobile optimizations */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[550px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Delivery</DialogTitle>
            <DialogDescription>Update delivery details for this order.</DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
                <Label htmlFor="edit-customer" className="sm:text-right">
                  Customer
                </Label>
                <div className="sm:col-span-3">
                  <Input
                    id="edit-customer"
                    value={selectedDelivery.customer}
                    onChange={(e) => handleSelectedDeliveryChange("customer", e.target.value)}
                    className={formErrors.customer ? "border-destructive" : ""}
                    disabled
                  />
                  {formErrors.customer && <p className="mt-1 text-xs text-destructive">{formErrors.customer}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
                <Label htmlFor="edit-address" className="sm:text-right">
                  Address
                </Label>
                <div className="sm:col-span-3">
                  <Input
                    id="edit-address"
                    value={selectedDelivery.address}
                    onChange={(e) => handleSelectedDeliveryChange("address", e.target.value)}
                    className={formErrors.address ? "border-destructive" : ""}
                  />
                  {formErrors.address && <p className="mt-1 text-xs text-destructive">{formErrors.address}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
                <Label htmlFor="edit-date" className="sm:text-right">
                  Date
                </Label>
                <div className="sm:col-span-3">
                  <Input
                    id="edit-date"
                    type="date"
                    value={selectedDelivery.date}
                    onChange={(e) => handleSelectedDeliveryChange("date", e.target.value)}
                    className={formErrors.date ? "border-destructive" : ""}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {formErrors.date && <p className="mt-1 text-xs text-destructive">{formErrors.date}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
                <Label htmlFor="edit-timeSlot" className="sm:text-right">
                  Time Slot
                </Label>
                <div className="sm:col-span-3">
                  <Select
                    value={selectedDelivery.timeSlot === "9:00 AM - 12:00 PM" ? "morning" : "afternoon"}
                    onValueChange={(value) =>
                      handleSelectedDeliveryChange(
                        "timeSlot",
                        value === "morning" ? "9:00 AM - 12:00 PM" : "1:00 PM - 4:00 PM",
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
                <Label htmlFor="edit-items" className="sm:text-right">
                  Items
                </Label>
                <div className="sm:col-span-3">
                  <Select
                    value={mealPlans.find((plan) => plan.name === selectedDelivery.items)?.id || ""}
                    onValueChange={handleEditItemsSelect}
                  >
                    <SelectTrigger className={formErrors.items ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select meal plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealPlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.items && <p className="mt-1 text-xs text-destructive">{formErrors.items}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 form-grid">
                <Label htmlFor="edit-driver" className="sm:text-right">
                  Driver
                </Label>
                <div className="sm:col-span-3">
                  <Select
                    value={drivers.find((driver) => driver.name === selectedDelivery.driver)?.id || ""}
                    onValueChange={handleEditDriverSelect}
                  >
                    <SelectTrigger className={formErrors.driver ? "border-destructive" : ""}>
                      <SelectValue placeholder="Assign a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.driver && <p className="mt-1 text-xs text-destructive">{formErrors.driver}</p>}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" onClick={handleUpdateDelivery} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Update Delivery" : "Updating..."}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[450px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Reschedule Delivery</DialogTitle>
            <DialogDescription>Change the date and time for this delivery.</DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reschedule-date">Date</Label>
                <Input
                  id="reschedule-date"
                  type="date"
                  value={selectedDelivery.date}
                  onChange={(e) => handleSelectedDeliveryChange("date", e.target.value)}
                  className={formErrors.date ? "border-destructive" : ""}
                  min={new Date().toISOString().split("T")[0]}
                />
                {formErrors.date && <p className="text-xs text-destructive">{formErrors.date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reschedule-timeSlot">Time Slot</Label>
                <Select
                  value={selectedDelivery.timeSlot === "9:00 AM - 12:00 PM" ? "morning" : "afternoon"}
                  onValueChange={(value) =>
                    handleSelectedDeliveryChange(
                      "timeSlot",
                      value === "morning" ? "9:00 AM - 12:00 PM" : "1:00 PM - 4:00 PM",
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleRescheduleDelivery} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Rescheduling..." : "Reschedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAssignDriverDialogOpen} onOpenChange={setIsAssignDriverDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[450px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Assign Driver</DialogTitle>
            <DialogDescription>Change the assigned driver for this delivery.</DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="assign-driver">Driver</Label>
                <Select
                  value={drivers.find((driver) => driver.name === selectedDelivery.driver)?.id || ""}
                  onValueChange={handleEditDriverSelect}
                >
                  <SelectTrigger className={formErrors.driver ? "border-destructive" : ""}>
                    <SelectValue placeholder="Assign a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.driver && <p className="text-xs text-destructive">{formErrors.driver}</p>}
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsAssignDriverDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleAssignDriverSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Assigning..." : "Assign Driver"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelConfirmDialogOpen} onOpenChange={setIsCancelConfirmDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Cancel Delivery</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this delivery? This action will remove it from the upcoming deliveries
              list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsCancelConfirmDialogOpen(false)} className="w-full sm:w-auto">
              No, keep it
            </Button>
            <Button variant="destructive" onClick={handleCancelDelivery} className="w-full sm:w-auto">
              Yes, cancel delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

