"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface LogoutConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function LogoutConfirmDialog({ open, onOpenChange, onConfirm }: LogoutConfirmDialogProps) {
  const handleLogout = () => {
    // In a real app, this would handle the actual logout process
    // For example: signOut() or auth.logout()

    // Simulate logout with a delay
    toast.loading("Logging out...")

    setTimeout(() => {
      toast.dismiss()
      toast.success("Logged out successfully", {
        description: "You have been logged out of your account.",
        action: {
          label: "Login again",
          onClick: () => {
            toast.info("Login page", {
              description: "In a real app, this would redirect to the login page",
            })
          },
        },
      })

      // In a real app, this would redirect to a login page
      // For demo purposes, we'll just close the dialog
      onOpenChange(false)
      onConfirm()
    }, 1000)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account and will need to log in again to access the dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

