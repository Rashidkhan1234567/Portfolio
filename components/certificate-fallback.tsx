"use client"

import { Award } from "lucide-react"

export default function CertificateFallback({ title, issuer }) {
  return (
    <div className="w-full h-full aspect-video bg-secondary/20 flex flex-col items-center justify-center p-4 text-center">
      <Award className="h-16 w-16 text-primary/40 mb-4" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{issuer}</p>
    </div>
  )
}
