import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectDetailScene from "@/components/project-detail-scene"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch this data from an API or CMS
  const project = {
    title: "Neon Dreams",
    slug: params.slug,
    category: "3D Visualization",
    client: "Cybertron Industries",
    year: "2023",
    description:
      "A futuristic cityscape visualization with dynamic lighting and atmospheric effects. This project explores the intersection of architecture, technology, and light in an imagined future metropolis.",
    challenge:
      "The main challenge was to create a believable futuristic environment that balances between fantasy and plausibility, while maintaining a cohesive visual language throughout the various scenes.",
    solution:
      "By developing a custom lighting system and material library, I was able to create a consistent yet diverse visual atmosphere that conveys both the scale and intimacy of the urban environment.",
    images: ["/images/project-detail-1.png", "/images/project-detail-2.png", "/images/project-detail-3.png"],
    nextProject: {
      title: "Organic Structures",
      slug: "organic-structures",
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Project Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <ProjectDetailScene slug={params.slug} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-4xl text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">{project.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              {project.category}
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-12">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-slate-400 mb-6">{project.description}</p>

              <h3 className="text-2xl font-bold text-white mb-4 mt-8">The Challenge</h3>
              <p className="text-slate-400 mb-6">{project.challenge}</p>

              <h3 className="text-2xl font-bold text-white mb-4 mt-8">The Solution</h3>
              <p className="text-slate-400 mb-6">{project.solution}</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-slate-400">Client</h4>
                  <p className="text-white">{project.client}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400">Year</h4>
                  <p className="text-white">{project.year}</p>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400">Category</h4>
                  <p className="text-white">{project.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Images */}
          <div className="space-y-8 mb-16">
            {project.images.map((image, index) => (
              <div key={index} className="relative w-full h-[60vh] rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg?height=800&width=1200"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Next Project */}
          <div className="border-t border-white/10 pt-12 text-center">
            <p className="text-slate-400 mb-4">Next Project</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{project.nextProject.title}</h3>
            <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
              <Link href={`/projects/${project.nextProject.slug}`}>View Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
