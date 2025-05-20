"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

export default function AboutSection() {
  const ref = useRef(null)

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <ScrollReveal direction="left" className="md:col-span-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 glow hover:glow-strong transition-all duration-500 transform hover:scale-105">
              <Image
                src="/profile.jpg"
                alt="Muhammad Rashid Khan"
                fill
                className="object-cover"
                priority
                quality={100}
                unoptimized
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="md:col-span-3" delay={0.2}>
            <h3 className="text-2xl font-bold mb-4">
              Full-Stack Developer with a passion for creating exceptional digital experiences
            </h3>

            <p className="text-muted-foreground mb-6">
              A passionate and detail-oriented Full Stack MERN Web and App Developer from Karachi with a strong
              foundation in multiple programming languages. Currently certified from SMIT, I specialize in creating
              responsive, user-friendly applications and websites.
            </p>

            <p className="text-muted-foreground mb-6">
              Committed to continuous learning and leveraging my technical expertise to deliver innovative solutions
              that meet client and organizational goals.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <ScrollReveal direction="up" delay={0.3}>
                <div>
                  <h4 className="font-semibold mb-1">Name</h4>
                  <p className="text-muted-foreground">Muhammad Rashid Khan</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">rashidkhaan618@gmail.com</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-muted-foreground">+92 317 2392757</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6}>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground">Pakistan, Karachi</p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.7}>
              <Button asChild className="rounded-full px-6 hover:scale-105 transition-transform duration-300">
                <Link href="/resume" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Resume
                </Link>
              </Button>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
