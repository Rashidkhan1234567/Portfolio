import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import AboutScene from "@/components/about-scene"
import SkillsChart from "@/components/skills-chart"

export default function AboutPage() {
  const skills = [
    { name: "3D Modeling", level: 90 },
    { name: "Texturing", level: 85 },
    { name: "Lighting", level: 95 },
    { name: "Animation", level: 80 },
    { name: "Rendering", level: 90 },
    { name: "Compositing", level: 75 },
  ]

  const experiences = [
    {
      position: "Senior 3D Designer",
      company: "Digital Frontiers Studio",
      period: "2020 - Present",
      description:
        "Lead designer for high-profile client projects, specializing in architectural visualization and product design.",
    },
    {
      position: "3D Visualization Artist",
      company: "Immersive Solutions",
      period: "2017 - 2020",
      description: "Created photorealistic 3D visualizations for marketing campaigns and interactive experiences.",
    },
    {
      position: "Junior 3D Artist",
      company: "Creative Dimensions",
      period: "2015 - 2017",
      description:
        "Assisted senior designers with modeling, texturing, and rendering tasks for various client projects.",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* About Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <AboutScene />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-4xl text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">About Me</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Passionate 3D designer with a focus on creating immersive digital experiences
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-12">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">My Journey</h2>
              <p className="text-slate-400 mb-6">
                With over 8 years of experience in 3D design and visualization, I've had the privilege of working with
                clients across various industries, from architecture and product design to entertainment and
                advertising.
              </p>
              <p className="text-slate-400 mb-6">
                My passion for 3D design began during my studies in Digital Arts, where I discovered the power of
                combining technical precision with artistic expression. Since then, I've been on a continuous journey of
                learning and exploration, always pushing the boundaries of what's possible in the digital realm.
              </p>
              <p className="text-slate-400">
                I believe that great design is about more than just aesthetics—it's about creating meaningful
                experiences that resonate with people. Whether I'm designing a virtual environment, a product
                visualization, or an animated sequence, my goal is always to create work that captivates and inspires.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 flex items-center justify-center">
              <div className="text-white text-opacity-30 text-lg">Designer Portrait</div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills & Expertise</h2>
            <SkillsChart skills={skills} />
          </div>

          {/* Experience */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-lg p-6 transition-all duration-300 hover:bg-slate-800/70"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                    <p className="text-fuchsia-400">{exp.period}</p>
                  </div>
                  <p className="text-cyan-300 mb-2">{exp.company}</p>
                  <p className="text-slate-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Software */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Tools & Software</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Blender",
                "Cinema 4D",
                "Maya",
                "ZBrush",
                "Substance Painter",
                "Unreal Engine",
                "After Effects",
                "Photoshop",
              ].map((tool) => (
                <div key={tool} className="bg-slate-800/50 px-6 py-3 rounded-full text-white">
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Create Something Amazing Together</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision
            </p>
            <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
