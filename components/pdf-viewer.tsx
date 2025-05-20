"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PdfViewer({ url, title }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="w-full h-full min-h-[500px] bg-card rounded-lg overflow-hidden border">
      {isLoading && (
        <div className="w-full h-full min-h-[500px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading {title}...</p>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center p-6 text-center">
          <FileText className="h-16 w-16 text-primary/40 mb-4" />
          <h3 className="text-xl font-bold mb-2">{title} Preview Unavailable</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            The preview for this document couldn't be loaded. You can still download it to view on your device.
          </p>
          <Button asChild className="rounded-full px-6">
            <a href={url} download className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Download {title}
            </a>
          </Button>
        </div>
      ) : (
        <iframe
          src={url}
          className={`w-full h-full min-h-[500px] ${isLoading ? "hidden" : "block"}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}
