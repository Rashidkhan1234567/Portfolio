"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiVite,
  SiVercel,
  SiGithub,
  SiNpm,
  SiBootstrap,
  SiJquery,
} from "react-icons/si"
import { TbBrandReactNative } from "react-icons/tb"
import ScrollReveal from "@/components/scroll-reveal"

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "HTML5", icon: <SiHtml5 className="h-8 w-8 text-[#E34F26]" /> },
        { name: "CSS3", icon: <SiCss3 className="h-8 w-8 text-[#1572B6]" /> },
        { name: "JavaScript", icon: <SiJavascript className="h-8 w-8 text-[#F7DF1E]" /> },
        { name: "React.js", icon: <SiReact className="h-8 w-8 text-[#61DAFB]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8" /> },
        { name: "TypeScript", icon: <SiTypescript className="h-8 w-8 text-[#3178C6]" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="h-8 w-8 text-[#7952B3]" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="h-8 w-8 text-[#06B6D4]" /> },
        { name: "jQuery", icon: <SiJquery className="h-8 w-8 text-[#0769AD]" /> },
      ],
    },
    {
      title: "Backend & Mobile Development",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8 text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="h-8 w-8" /> },
        { name: "MongoDB", icon: <SiMongodb className="h-8 w-8 text-[#47A248]" /> },
        { name: "Firebase", icon: <SiFirebase className="h-8 w-8 text-[#FFCA28]" /> },
        { name: "React Native", icon: <TbBrandReactNative className="h-8 w-8 text-[#61DAFB]" /> },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: <SiGit className="h-8 w-8 text-[#F05032]" /> },
        { name: "GitHub", icon: <SiGithub className="h-8 w-8" /> },
        { name: "Vercel", icon: <SiVercel className="h-8 w-8" /> },
        { name: "npm", icon: <SiNpm className="h-8 w-8 text-[#CB3837]" /> },
        { name: "Vite", icon: <SiVite className="h-8 w-8 text-[#646CFF]" /> },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              I've worked with a variety of technologies in the web development world. Here are the main tools and
              technologies I use to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollReveal key={category.title} delay={categoryIndex * 0.1}>
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{category.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <ScrollReveal key={skill.name} direction="scale" delay={categoryIndex * 0.1 + skillIndex * 0.05}>
                      <div className="bg-card border rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <div className="mb-3 transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                          {skill.icon}
                        </div>
                        <h3 className="font-medium">{skill.name}</h3>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
