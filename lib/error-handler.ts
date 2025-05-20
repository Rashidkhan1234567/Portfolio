// Global error handling utility

/**
 * Safely attempts to fetch a resource with proper error handling
 * @param url The URL to fetch
 * @param options Fetch options
 * @returns Promise with the fetch result or null if failed
 */
export async function safeFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    const response = await fetch(url, options)
    return response
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error)
    return null
  }
}

/**
 * Registers a global error handler for uncaught errors
 */
export function registerGlobalErrorHandler() {
  if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      console.error("Global error caught:", event.message)

      // Prevent the error from bubbling up if it's a fetch error
      if (
        event.message.includes("Failed to fetch") ||
        event.message.includes("NetworkError") ||
        event.message.includes("Load failed")
      ) {
        event.preventDefault()
      }
    })

    // Also handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason)

      // Prevent the error from bubbling up if it's a fetch error
      if (
        event.reason &&
        (event.reason.message?.includes("Failed to fetch") ||
          event.reason.message?.includes("NetworkError") ||
          event.reason.message?.includes("Load failed"))
      ) {
        event.preventDefault()
      }
    })
  }
}
