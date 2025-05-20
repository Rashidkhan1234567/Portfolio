"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Fallback({ componentName }) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Log error to console for debugging
    console.error(`Failed to load ${componentName} component`)
  }, [componentName])

  return (
    <div className="w-full h-64 flex items-center justify-center bg-secondary/20 rounded-lg border border-dashed">
      <div className="text-center p-4">
        <h3 className="text-lg font-medium mb-2">Failed to load {componentName}</h3>
        <p className="text-muted-foreground mb-4">This component couldn't be rendered due to an error.</p>
        <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>

        {showDetails && (
          <div className="mt-4 text-left bg-background p-4 rounded-md text-sm">
            <p className="mb-2">Possible solutions:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Check if all dependencies are installed correctly</li>
              <li>Make sure Three.js and related libraries are properly loaded</li>
              <li>Check browser compatibility (WebGL support)</li>
              <li>Try refreshing the page</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
