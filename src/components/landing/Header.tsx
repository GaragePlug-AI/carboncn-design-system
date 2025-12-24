import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"

// Filled GitHub icon (GitHub logo)
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CC</span>
          </div>
          <span className="font-medium hidden md:inline-block">CarbonCN</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            className={cn(
              "text-sm transition-colors hover:text-foreground",
              location.pathname === "/"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/components"
            className={cn(
              "text-sm transition-colors hover:text-foreground",
              location.pathname === "/components"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            Components
          </Link>
          <Link
            to="/export"
            className={cn(
              "text-sm transition-colors hover:text-foreground",
              location.pathname === "/export"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            Export
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/GaragePlug-AI/carboncn-design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}

