import Link from "next/link"
import { Github, Linkedin, FileText, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 print-hide">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <span className="gradient-text">Rashid</span>
              <span>.dev</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Full-Stack Developer specializing in modern web technologies
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/Rashidkhan1234567"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rashid-khan-4213ab299/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/leovibesx/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <Link
                href="/resume"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Resume"
              >
                <FileText className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">© {currentYear} Muhammad Rashid Khan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
