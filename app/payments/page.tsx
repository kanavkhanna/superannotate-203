"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { Download, FileDown, AlertCircle, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

const initialPayments = [
  {
    id: "PAY-001",
    customer: "John Smith",
    amount: 129.99,
    status: "Completed",
    date: "2023-07-01",
    method: "Credit Card",
    subscription: "Monthly Vegetarian",
  },
  {
    id: "PAY-002",
    customer: "Sarah Johnson",
    amount: 149.99,
    status: "Completed",
    date: "2023-07-01",
    method: "PayPal",
    subscription: "Monthly Keto",
  },
  {
    id: "PAY-003",
    customer: "Michael Brown",
    amount: 139.99,
    status: "Failed",
    date: "2023-07-01",
    method: "Credit Card",
    subscription: "Monthly Paleo",
  },
  {
    id: "PAY-004",
    customer: "Emily Davis",
    amount: 129.99,
    status: "Completed",
    date: "2023-07-01",
    method: "Bank Transfer",
    subscription: "Monthly Vegan",
  },
  {
    id: "PAY-005",
    customer: "David Wilson",
    amount: 119.99,
    status: "Pending",
    date: "2023-07-01",
    method: "Credit Card",
    subscription: "Monthly Standard",
  },
  {
    id: "PAY-006",
    customer: "Jennifer Lee",
    amount: 129.99,
    status: "Completed",
    date: "2023-07-01",
    method: "PayPal",
    subscription: "Monthly Vegetarian",
  },
  {
    id: "PAY-007",
    customer: "Robert Taylor",
    amount: 149.99,
    status: "Completed",
    date: "2023-07-01",
    method: "Credit Card",
    subscription: "Monthly Keto",
  },
  {
    id: "PAY-008",
    customer: "Lisa Anderson",
    amount: 139.99,
    status: "Completed",
    date: "2023-07-01",
    method: "Bank Transfer",
    subscription: "Monthly Paleo",
  },
]

export default function PaymentsPage() {
  const [payments] = useState(initialPayments)
  const [isExportPopoverOpen, setIsExportPopoverOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [isMobileView, setIsMobileView] = useState(false)

  // Check if we're in mobile view on component mount and window resize
  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    // Initial check
    checkMobileView()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView)
  }, [])

  // Function to generate file content based on format
  function generateFileContent(payments, format) {
    switch (format) {
      case "csv":
        // Generate CSV content
        const headers = ["ID", "Customer", "Subscription", "Amount", "Method", "Date", "Status"]
        const csvContent = [
          headers.join(","),
          ...payments.map((p) =>
            [p.id, p.customer, p.subscription, p.amount.toFixed(2), p.method, p.date, p.status].join(","),
          ),
        ].join("\n")
        return { content: csvContent, type: "text/csv" }

      case "json":
        // Generate JSON content
        return { content: JSON.stringify(payments, null, 2), type: "application/json" }

      case "excel":
        // For simplicity, we'll just use CSV with an Excel MIME type
        const excelHeaders = ["ID", "Customer", "Subscription", "Amount", "Method", "Date", "Status"]
        const excelContent = [
          excelHeaders.join(","),
          ...payments.map((p) =>
            [p.id, p.customer, p.subscription, p.amount.toFixed(2), p.method, p.date, p.status].join(","),
          ),
        ].join("\n")
        return { content: excelContent, type: "application/vnd.ms-excel" }

      case "pdf":
        // For PDF, we'll just create a simple text representation
        // In a real app, you'd use a PDF generation library
        const pdfContent = `Payment Report\n\n${payments
          .map(
            (p) =>
              `${p.id} | ${p.customer} | ${p.subscription} | $${p.amount.toFixed(2)} | ${p.method} | ${p.date} | ${p.status}`,
          )
          .join("\n")}`
        return { content: pdfContent, type: "application/pdf" }

      default:
        return { content: JSON.stringify(payments, null, 2), type: "application/json" }
    }
  }

  // Handle export function
  const handleExport = async (format: string) => {
    // Show loading toast
    const loadingToast = toast.loading(`Exporting ${payments.length} payments...`)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Randomly simulate an error (20% chance)
      if (Math.random() < 0.2) {
        throw new Error("Network error during export")
      }

      // Generate the file name
      const fileName = `payments_${new Date().toISOString().split("T")[0]}.${format}`

      // Generate file content
      const { content, type } = generateFileContent(payments, format)

      // Create a blob with the file content
      const blob = new Blob([content], { type })

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a temporary link element
      const link = document.createElement("a")
      link.href = url
      link.download = fileName

      // Append the link to the body
      document.body.appendChild(link)

      // Trigger the download
      link.click()

      // Clean up
      URL.revokeObjectURL(url)
      document.body.removeChild(link)

      // Success case
      toast.dismiss(loadingToast)
      toast.success("Export completed", {
        description: `${payments.length} payments exported to ${fileName}`,
      })

      console.log(`Exported ${payments.length} payments to ${fileName}`)
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

  // Function to render payment status badge
  const renderStatusBadge = (status) => (
    <Badge variant={status === "Completed" ? "default" : status === "Pending" ? "secondary" : "destructive"}>
      {status}
    </Badge>
  )

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Payments"
        description="Track and manage subscription payments"
        actions={
          <Popover open={isExportPopoverOpen} onOpenChange={setIsExportPopoverOpen}>
            <PopoverTrigger asChild>
              <Button aria-label="Export payment data" className="gap-1 rounded-full">
                <Download className="h-4 w-4" aria-hidden="true" />
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
                    Export {payments.length} payments
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        }
      />

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,568.00</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">8 pending transactions</p>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$420.00</div>
            <p className="text-xs text-muted-foreground">3 failed transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History - Responsive Table/Cards */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View all payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {isMobileView ? (
              // Mobile view - Card layout
              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{payment.customer}</p>
                          <p className="text-sm text-muted-foreground">{payment.id}</p>
                        </div>
                        {renderStatusBadge(payment.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium">${payment.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p>{payment.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Method</p>
                          <p>{payment.method}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Subscription</p>
                          <p>{payment.subscription}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-primary">
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Desktop view - Table layout
              <ScrollArea className="h-[calc(100vh-24rem)] rounded-md">
                <Table aria-label="Payment history">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.subscription}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

