import Link from "next/link"
import Script from "next/script"

export function Footer() {
  return (
    <footer className="border-t py-6 px-6 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
              <Link
                href="/report-bug"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Report a Bug
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Status</h3>
            <Link
              href="https://hyperdyn.statuspage.io"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              All systems Normal
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">© 2025 AttendanceXR. All rights reserved.</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-10 animate-gradient-x"></div>
      <Script src="https://hyperdyn.statuspage.io/embed/script.js" />
    </footer>
  )
}

