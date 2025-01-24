import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

export function Breadcrumbs() {
  return (
    <nav className="flex px-6 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center hover:text-foreground">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4" />
            <span className="ml-1 md:ml-2">Dashboard</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

