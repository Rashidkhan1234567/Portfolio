"use client"

import { useEffect } from "react"
import { registerGlobalErrorHandler } from "@/lib/error-handler"

export default function GlobalErrorHandler() {
  useEffect(() => {
    registerGlobalErrorHandler()
  }, [])

  return null
}
