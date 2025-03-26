"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, CreditCard, Home, Package, ShoppingBasket, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { UserProfileDialog } from "@/components/user-profile-dialog"
import { UserSettingsDialog } from "@/components/user-settings-dialog"
import { LogoutConfirmDialog } from "@/components/logout-confirm-dialog"
import { toast } from "sonner"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Subscribers",
    icon: Users,
    href: "/subscribers",
  },
  {
    title: "Meal Selection",
    icon: ShoppingBasket,
    href: "/meal-selection",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/payments",
  },
  {
    title: "Deliveries",
    icon: Package,
    href: "/deliveries",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, this would handle the actual logout process
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account.",
    })
    setIsLogoutConfirmOpen(false)
  }

  return (
    <Sidebar aria-label="Main navigation" variant="floating" className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShoppingBasket className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight">MealSub</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-2">
          <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Main</p>
          <SidebarMenu aria-label="Dashboard navigation">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title} className="group">
                  <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                    <item.icon
                      className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center justify-between px-2 pb-2">
          <p className="text-xs text-muted-foreground">© 2023 MealSub</p>
          <ThemeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-lg" aria-label="User menu">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@mealsub.com</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsLogoutConfirmOpen(true)}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarTrigger className="absolute right-4 top-4 md:hidden" aria-label="Toggle sidebar" />

      {/* Profile Dialog */}
      <UserProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />

      {/* Settings Dialog */}
      <UserSettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog open={isLogoutConfirmOpen} onOpenChange={setIsLogoutConfirmOpen} onConfirm={handleLogout} />
    </Sidebar>
  )
}

