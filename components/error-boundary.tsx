"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  sectionName: string
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.sectionName}:`, error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-center p-6 bg-card rounded-lg border max-w-md">
            <h3 className="text-lg font-medium mb-2">Failed to load {this.props.sectionName}</h3>
            <p className="text-muted-foreground mb-4">This section couldn't be rendered due to an error.</p>
            <Button onClick={() => this.setState({ hasError: false })}>Try Again</Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
