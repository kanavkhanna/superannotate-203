import * as React from "react"

import { cn } from "@/lib/utils"

export const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("relative", className)} ref={ref} {...props} />
  },
)
Chart.displayName = "Chart"

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("rounded-md border bg-card text-card-foreground shadow-sm", className)} ref={ref} {...props} />
    )
  },
)
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "pointer-events-none absolute z-50 flex h-auto w-auto items-center justify-center overflow-hidden whitespace-nowrap rounded-md border border-border bg-popover p-2 text-sm text-popover-foreground shadow-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex flex-col items-start justify-start space-y-1", className)} ref={ref} {...props} />
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

