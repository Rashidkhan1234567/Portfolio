"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function ProjectPreview({ project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] w-full">
        <Image
          src={project.image || "/placeholder.svg?height=400&width=300"}
          alt={project.title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="transform translate-y-8 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-sm font-medium text-fuchsia-400 mb-2">{project.category}</p>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-white gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            View Project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
