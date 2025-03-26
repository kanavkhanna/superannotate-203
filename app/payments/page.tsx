"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { Download, FileDown, AlertCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

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

      // Success case
      const fileName = `payments_${new Date().toISOString().split("T")[0]}.${format}`
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
      <div className="p-4 grid gap-4 md:grid-cols-3">
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$420.00</div>
            <p className="text-xs text-muted-foreground">3 failed transactions</p>
          </CardContent>
        </Card>
      </div>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View all payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
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
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Completed"
                            ? "default"
                            : payment.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

