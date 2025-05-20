"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function SkillsChart({ skills }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <div key={index} className="bg-slate-800/30 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium">{skill.name}</h3>
            <span className="text-fuchsia-400 font-bold">{skill.level}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
