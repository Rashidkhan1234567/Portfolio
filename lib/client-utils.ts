/**
 * Utility functions for client-side operations
 */

/**
 * Safely access window object
 * @returns true if window is defined, false otherwise
 */
export function isClient(): boolean {
  return typeof window !== "undefined"
}

/**
 * Safely access document object
 * @returns true if document is defined, false otherwise
 */
export function hasDocument(): boolean {
  return typeof document !== "undefined"
}

/**
 * Safely add an event listener to window
 * @param event The event to listen for
 * @param handler The event handler
 * @returns A function to remove the event listener
 */
export function safeWindowEventListener(event: string, handler: EventListenerOrEventListenerObject): () => void {
  if (!isClient()) return () => {}

  try {
    window.addEventListener(event, handler)
    return () => {
      try {
        window.removeEventListener(event, handler)
      } catch (error) {
        console.error(`Error removing ${event} listener:`, error)
      }
    }
  } catch (error) {
    console.error(`Error adding ${event} listener:`, error)
    return () => {}
  }
}

/**
 * Safely scroll to an element by ID
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element
 */
export function safeScrollToElement(elementId: string, offset = 0): void {
  if (!isClient() || !hasDocument()) return

  try {
    const element = document.getElementById(elementId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      })
    }
  } catch (error) {
    console.error(`Error scrolling to element ${elementId}:`, error)
  }
}

/**
 * Safely get an element by ID
 * @param elementId The ID of the element to get
 * @returns The element or null if not found or an error occurs
 */
export function safeGetElementById(elementId: string): HTMLElement | null {
  if (!isClient() || !hasDocument()) return null

  try {
    return document.getElementById(elementId)
  } catch (error) {
    console.error(`Error getting element ${elementId}:`, error)
    return null
  }
}
