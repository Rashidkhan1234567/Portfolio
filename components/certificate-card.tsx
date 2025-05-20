"use client"

import Image from "next/image"
import { ExternalLink, Calendar, Clock, Award } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function CertificateCard({ certificate }) {
  const [isImageLoaded, setIsImageLoaded] = useState(true)

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{certificate.title}</CardTitle>
      </CardHeader>

      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-video overflow-hidden bg-secondary/20 cursor-pointer">
            <Image
              src={certificate.image || "/placeholder.svg"}
              alt={certificate.title}
              width={600}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
              onError={() => setIsImageLoaded(false)}
              quality={100}
              unoptimized
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <div className="relative aspect-video w-full">
            <Image
              src={certificate.image || "/placeholder.svg"}
              alt={certificate.title}
              fill
              className="object-contain"
              quality={100}
              unoptimized
            />
          </div>
        </DialogContent>
      </Dialog>

      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex justify-between items-center">
            <span className="font-medium">{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{certificate.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Duration: {certificate.duration}</span>
          </div>
          {certificate.certNumber && (
            <div className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5" />
              <span>Certificate No: {certificate.certNumber}</span>
            </div>
          )}
          {certificate.description && <p className="mt-2 text-xs">{certificate.description}</p>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              View Certificate
              <ExternalLink className="h-3 w-3" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-video w-full">
              <Image
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                fill
                className="object-contain"
                quality={100}
                unoptimized
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
