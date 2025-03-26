"use client"

import type React from "react"

import { useState } from "react"

// Sample subscriber data by region
const subscriberData = [
  { id: "us", name: "United States", count: 450, growth: "+12%" },
  { id: "ca", name: "Canada", count: 120, growth: "+8%" },
  { id: "uk", name: "United Kingdom", count: 210, growth: "+15%" },
  { id: "au", name: "Australia", count: 95, growth: "+5%" },
  { id: "de", name: "Germany", count: 85, growth: "+10%" },
  { id: "fr", name: "France", count: 72, growth: "+7%" },
  { id: "jp", name: "Japan", count: 45, growth: "+20%" },
  { id: "br", name: "Brazil", count: 35, growth: "+25%" },
  { id: "in", name: "India", count: 20, growth: "+30%" },
]

export function SubscriberMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handleRegionHover = (regionId: string, event: React.MouseEvent) => {
    setSelectedRegion(regionId)
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }

  const handleRegionLeave = () => {
    setSelectedRegion(null)
  }

  const getRegionColor = (regionId: string) => {
    const region = subscriberData.find((r) => r.id === regionId)
    if (!region) return "fill-muted/20"

    // Color based on subscriber count
    if (region.count > 200) return "fill-primary/80"
    if (region.count > 100) return "fill-primary/60"
    if (region.count > 50) return "fill-primary/40"
    return "fill-primary/20"
  }

  const getRegionClass = (regionId: string) => {
    const baseClass = `${getRegionColor(regionId)} stroke-border hover:fill-primary/90 cursor-pointer transition-colors duration-200`
    return selectedRegion === regionId ? `${baseClass} stroke-primary stroke-[1.5px]` : baseClass
  }

  const selectedRegionData = selectedRegion ? subscriberData.find((r) => r.id === selectedRegion) : null

  return (
    <div className="relative h-full w-full">
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/80"></div>
          <span className="text-xs">200+ subscribers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/60"></div>
          <span className="text-xs">100-200 subscribers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/40"></div>
          <span className="text-xs">50-100 subscribers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/20"></div>
          <span className="text-xs">&lt;50 subscribers</span>
        </div>
      </div>

      <svg viewBox="0 0 1000 500" className="h-full w-full" aria-label="World map showing subscriber distribution">
        {/* Simplified world map - using rectangles to represent continents/regions */}
        <rect
          x="150"
          y="120"
          width="200"
          height="100"
          className={getRegionClass("us")}
          onMouseEnter={(e) => handleRegionHover("us", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="United States region"
        />
        <rect
          x="150"
          y="70"
          width="180"
          height="50"
          className={getRegionClass("ca")}
          onMouseEnter={(e) => handleRegionHover("ca", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="Canada region"
        />
        <rect
          x="450"
          y="100"
          width="80"
          height="60"
          className={getRegionClass("uk")}
          onMouseEnter={(e) => handleRegionHover("uk", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="United Kingdom region"
        />
        <rect
          x="480"
          y="120"
          width="100"
          height="60"
          className={getRegionClass("de")}
          onMouseEnter={(e) => handleRegionHover("de", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="Germany region"
        />
        <rect
          x="460"
          y="150"
          width="90"
          height="60"
          className={getRegionClass("fr")}
          onMouseEnter={(e) => handleRegionHover("fr", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="France region"
        />
        <rect
          x="700"
          y="150"
          width="120"
          height="60"
          className={getRegionClass("jp")}
          onMouseEnter={(e) => handleRegionHover("jp", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="Japan region"
        />
        <rect
          x="250"
          y="250"
          width="150"
          height="100"
          className={getRegionClass("br")}
          onMouseEnter={(e) => handleRegionHover("br", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="Brazil region"
        />
        <rect
          x="600"
          y="200"
          width="150"
          height="100"
          className={getRegionClass("in")}
          onMouseEnter={(e) => handleRegionHover("in", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="India region"
        />
        <rect
          x="750"
          y="300"
          width="100"
          height="80"
          className={getRegionClass("au")}
          onMouseEnter={(e) => handleRegionHover("au", e)}
          onMouseLeave={handleRegionLeave}
          aria-label="Australia region"
        />
      </svg>

      {selectedRegion && selectedRegionData && (
        <div
          className="pointer-events-none absolute z-20 rounded-md border bg-card p-3 shadow-md"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
            transform: "translate(-50%, -100%)",
          }}
          role="tooltip"
        >
          <div className="font-medium">{selectedRegionData.name}</div>
          <div className="text-sm text-muted-foreground">Subscribers: {selectedRegionData.count}</div>
          <div className="text-sm text-primary">Growth: {selectedRegionData.growth}</div>
        </div>
      )}

      {selectedRegion && (
        <div className="absolute bottom-4 left-4 rounded-md border bg-card p-4 shadow-md">
          <h3 className="text-lg font-medium">Regional Details</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {subscriberData.map((region) => (
              <div
                key={region.id}
                className={`rounded-md border p-3 transition-colors ${selectedRegion === region.id ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <div className="font-medium">{region.name}</div>
                <div className="text-2xl font-bold">{region.count}</div>
                <div className="text-sm text-primary">{region.growth}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sr-only">
        <h3>Subscriber Geographic Distribution</h3>
        <ul>
          {subscriberData.map((region) => (
            <li key={region.id}>
              {region.name}: {region.count} subscribers, {region.growth} growth
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

