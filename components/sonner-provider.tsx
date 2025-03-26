"use client"

import { useTheme } from "next-themes"
import { Toaster } from "sonner"

export function SonnerProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      theme={theme as "light" | "dark" | "system" | undefined}
      position="top-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
        className: "rounded-md shadow-md",
      }}
      closeButton
      richColors
    />
  )
}

