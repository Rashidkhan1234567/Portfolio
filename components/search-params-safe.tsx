"use client"

import { useSearchParams as useNextSearchParams } from "next/navigation"
import { Suspense, type ReactNode } from "react"

// A wrapper component that safely uses useSearchParams
export function SearchParamsWrapper({ children }: { children: (searchParams: URLSearchParams) => ReactNode }) {
  const searchParams = useNextSearchParams()
  return <>{children(searchParams)}</>
}

// A component that safely provides search params
export function SafeSearchParams({
  fallback = null,
  children,
}: { fallback?: ReactNode; children: (searchParams: URLSearchParams) => ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsWrapper>{(searchParams) => children(searchParams)}</SearchParamsWrapper>
    </Suspense>
  )
}
