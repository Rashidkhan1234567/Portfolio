"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import ProjectCard from "@/components/project-card"
import ScrollReveal from "@/components/scroll-reveal"

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const projects = [
    {
      id: 1,
      title: "Suburbia",
      description:
        "A modern real estate platform for finding and listing properties with advanced search features and interactive maps.",
      image: "/projects/suburbia.gif",
      isGif: true,
      liveUrl: "https://suburbia-1.vercel.app/",
      githubUrl: "https://github.com/Rashidkhan1234567/suburbia",
      tags: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    },
    {
      id: 2,
      title: "Award",
      description:
        "A platform for recognizing and celebrating achievements with customizable award templates and sharing capabilities.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Awards.gif-oHC0ZnjMxnsFWjskkUvxgIpSUiyTi4.jpeg",
      isGif: false,
      liveUrl: "https://awards-chi.vercel.app/",
      githubUrl: "https://github.com/Rashidkhan1234567/awards",
      tags: ["React", "Firebase", "Tailwind CSS"],
    },
    {
      id: 3,
      title: "Microfinance Hackathon",
      description:
        "A comprehensive microfinance platform built for hackathon with separate frontend and backend deployments. Features loan management, user authentication, and financial tracking.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/microfinance-preview.png",
      isGif: false,
      isFullStack: true,
      frontendUrl: "https://front-end-five-liart.vercel.app/",
      backendUrl: "https://back-end-rho-seven.vercel.app/",
      githubUrl: "https://github.com/Rashidkhan1234567/Microfinance-Hackathon",
      backendWarning:
        "Note: Some features like sign-in/sign-up forms may not work if the backend server is down. Both frontend and backend are deployed separately.",
      tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Full-Stack"],
    },
    {
      id: 4,
      title: "Generate ID Card",
      description:
        "A tool for creating professional ID cards with customizable templates, photo upload, and instant download options.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generate%20ID%20Card-t0QYX6DYGZCeUb6jUtKXVWHe6BUKTl.png",
      isGif: false,
      liveUrl: "https://rashidkhan1234567.github.io/Generate-ID-Card/",
      githubUrl: "https://github.com/Rashidkhan1234567/Generate-ID-Card",
      tags: ["JavaScript", "HTML", "CSS"],
    },
    {
      id: 5,
      title: "Tic-Tac-Toe",
      description:
        "Classic Tic-Tac-Toe game with modern UI, player statistics, and options for playing against AI or another player.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tic-Tac-Toe-UfykHuBaK7oeWFR9vCOm28Pxj2xARM.png",
      isGif: false,
      liveUrl: "https://rashidkhan1234567.github.io/Tic-Tac-Toe/",
      githubUrl: "https://github.com/Rashidkhan1234567/Tic-Tac-Toe",
      tags: ["JavaScript", "HTML", "CSS"],
    },
    {
      id: 6,
      title: "Timer App",
      description:
        "A sleek timer application with countdown, stopwatch, and interval timer features for productivity and fitness tracking.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timer-App-Wd9Iy9Iy9Iy9Iy9Iy9Iy9Iy9Iy9Iy9Iy9.png",
      isGif: false,
      liveUrl: "https://rashidkhan1234567.github.io/timer/",
      githubUrl: "https://github.com/Rashidkhan1234567/timer",
      tags: ["JavaScript", "HTML", "CSS"],
    },
  ]

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Here are some of my recent projects. Each project represents a unique challenge and showcases different
              skills and technologies.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add null check before mapping */}
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects available at the moment.</p>
            </div>
          )}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Want to see more of my work? Check out my GitHub profile for additional projects.
            </p>
            <a
              href="https://github.com/Rashidkhan1234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-card hover:bg-card/80 text-foreground px-6 py-3 rounded-full border transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              View GitHub Profile
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
