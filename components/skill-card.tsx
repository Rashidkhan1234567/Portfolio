"use client"

import { motion } from "framer-motion"

export default function SkillCard({ name, icon }) {
  return (
    <motion.div
      className="bg-card border rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-medium">{name}</h3>
    </motion.div>
  )
}
