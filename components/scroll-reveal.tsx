"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

// Animation variants for different directions
const variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hiddenLeft: {
    opacity: 0,
    x: -50,
  },
  visibleLeft: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hiddenRight: {
    opacity: 0,
    x: 50,
  },
  visibleRight: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hiddenScale: {
    opacity: 0,
    scale: 0.8,
  },
  visibleScale: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function ScrollReveal({
  children,
  direction = "up", // "up", "left", "right", "scale"
  delay = 0,
  duration = 0.6,
  threshold = 0.1, // Percentage of element that needs to be in view
  once = true, // Whether to animate only once or every time element comes into view
  className = "",
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Skip animation during SSR
  if (!mounted) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  // Determine which animation variant to use based on direction
  let initial, animate
  switch (direction) {
    case "left":
      initial = "hiddenLeft"
      animate = "visibleLeft"
      break
    case "right":
      initial = "hiddenRight"
      animate = "visibleRight"
      break
    case "scale":
      initial = "hiddenScale"
      animate = "visibleScale"
      break
    default: // "up"
      initial = "hidden"
      animate = "visible"
  }

  // Custom transition based on props
  const transition = {
    duration,
    delay,
    ease: "easeOut",
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
