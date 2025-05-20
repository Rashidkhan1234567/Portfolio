import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectsHero from "@/components/projects-hero"
import ProjectCard from "@/components/project-card"

export default function ProjectsPage() {
  // Define projects data directly in the component to ensure it's always available
  const projects = [
    {
      id: 1,
      title: "Neon Dreams",
      category: "3D Visualization",
      description: "A futuristic cityscape visualization with dynamic lighting and atmospheric effects.",
      image: "/images/project-1.png",
      slug: "neon-dreams",
    },
    {
      id: 2,
      title: "Organic Structures",
      category: "Product Design",
      description: "Exploring biomorphic forms and organic textures in product design concepts.",
      image: "/images/project-2.png",
      slug: "organic-structures",
    },
    {
      id: 3,
      title: "Future Living",
      category: "Architectural Visualization",
      description: "Conceptual architectural spaces that blend technology with sustainable living.",
      image: "/images/project-3.png",
      slug: "future-living",
    },
    {
      id: 4,
      title: "Liquid Motion",
      category: "Animation",
      description: "Fluid dynamics simulation creating mesmerizing abstract visual compositions.",
      image: "/images/project-4.png",
      slug: "liquid-motion",
    },
    {
      id: 5,
      title: "Geometric Harmony",
      category: "3D Art",
      description: "Exploration of geometric patterns and mathematical harmony in 3D space.",
      image: "/images/project-5.png",
      slug: "geometric-harmony",
    },
    {
      id: 6,
      title: "Virtual Showroom",
      category: "Interactive Design",
      description: "An immersive virtual product showcase with interactive elements.",
      image: "/images/project-6.png",
      slug: "virtual-showroom",
    },
  ]

  // Ensure categories is defined and has default values
  const categories = [
    "All",
    "3D Visualization",
    "Product Design",
    "Architectural Visualization",
    "Animation",
    "3D Art",
    "Interactive Design",
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Projects Hero */}
      <ProjectsHero />

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12">
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Project Showcase</h1>
            <p className="text-slate-400 max-w-2xl">
              Explore my portfolio of 3D design work, from concept to execution, showcasing a range of styles and
              techniques
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {/* Add null check before mapping */}
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className={
                    category === "All"
                      ? "bg-fuchsia-600 hover:bg-fuchsia-700"
                      : "text-white border-white/20 hover:bg-white/10"
                  }
                >
                  {category}
                </Button>
              ))
            ) : (
              <Button variant="default" className="bg-fuchsia-600 hover:bg-fuchsia-700">
                All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add null check before mapping */}
            {projects && projects.length > 0 ? (
              projects.map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-400">No projects available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
