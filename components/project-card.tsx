"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, Eye, Server, Globe, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function ProjectCard({ project }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Mark component as mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark theme during SSR
  const isDarkMode = !mounted
    ? true
    : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Add null check for project
  if (!project) {
    return null
  }

  // Check if project has multiple deployment links
  const hasMultipleLinks = project.frontendUrl && project.backendUrl

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`overflow-hidden border-2 h-full flex flex-col hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${
          isDarkMode ? "dark-mode-card" : "light-mode-shadow"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-video overflow-hidden">
          {project.isGif ? (
            // For GIFs, use a regular img tag to ensure animation works
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title || "Project"}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          ) : (
            // For static images, use Next.js Image component with unoptimized for external URLs
            <Image
              src={project.image || `/placeholder.svg?height=400&width=600`}
              alt={project.title || "Project"}
              width={600}
              height={400}
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
              unoptimized={project.image?.startsWith?.("https://") || false}
            />
          )}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {hasMultipleLinks ? (
              // Multiple links for full-stack projects
              <div className="flex gap-2">
                <motion.a
                  href={project.frontendUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDarkMode ? "bg-primary" : "bg-blue-600"
                  } text-white p-2 rounded-full hover:bg-primary/80 transition-colors`}
                  aria-label="Frontend Preview"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Globe className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={project.backendUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                  aria-label="Backend API"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Server className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-foreground p-2 rounded-full hover:bg-secondary/80 transition-colors"
                  aria-label="View Code"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              </div>
            ) : (
              // Single link for regular projects
              <div className="flex gap-2">
                <motion.a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDarkMode ? "bg-primary" : "bg-blue-600"
                  } text-white p-2 rounded-full hover:bg-primary/80 transition-colors`}
                  aria-label="Live Preview"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Eye className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-foreground p-2 rounded-full hover:bg-secondary/80 transition-colors"
                  aria-label="View Code"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              </div>
            )}
          </motion.div>
        </div>

        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-2">
            {project.title || "Untitled Project"}
            {project.isFullStack && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Full-Stack</span>
            )}
          </CardTitle>
          <CardDescription className="line-clamp-2">{project.description || ""}</CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-grow">
          {/* Backend dependency warning */}
          {project.backendWarning && (
            <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-600 dark:text-yellow-400">{project.backendWarning}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {/* Add null check before mapping */}
            {project.tags && project.tags.length > 0 ? (
              project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className={`text-xs ${
                    isDarkMode ? "bg-secondary" : "bg-blue-100 text-blue-800"
                  } px-2 py-1 rounded-full`}
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.span>
              ))
            ) : (
              <motion.span
                className={`text-xs ${
                  isDarkMode ? "bg-secondary" : "bg-blue-100 text-blue-800"
                } px-2 py-1 rounded-full`}
              >
                Project
              </motion.span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {hasMultipleLinks ? (
            <div className="w-full space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={`${
                    isDarkMode
                      ? "hover:bg-primary hover:text-white"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  } transition-colors duration-300`}
                >
                  <a
                    href={project.frontendUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    <Globe className="h-3 w-3" />
                    Frontend
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 bg-transparent"
                >
                  <a
                    href={project.backendUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    <Server className="h-3 w-3" />
                    Backend
                  </a>
                </Button>
              </div>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <a
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            </div>
          ) : (
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`w-full ${
                isDarkMode
                  ? "hover:bg-primary hover:text-white"
                  : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              } transition-colors duration-300`}
            >
              <a
                href={project.liveUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Project
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
