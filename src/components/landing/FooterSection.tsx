import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-carbon-05">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 w-full"
        >
          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="text-lg font-medium mb-1">CarbonCN Design System</div>
            <p className="text-sm text-muted-foreground">
              Created by{" "}
              <a
                href="https://www.garageplug.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                GaragePlug AI Labs
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://carbondesignsystem.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Carbon
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              shadcn/ui
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.figma.com/community/file/874592104192380079/ibm-carbon-design-system"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Figma
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.garageplug.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GaragePlug AI Labs
            </a>
            . Open source under MIT.
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

