import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SonnerProvider } from "@/components/sonner-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Meal Subscription Dashboard",
  description: "Manage your meal subscription service",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <DashboardSidebar />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </SidebarProvider>
          <SonnerProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'