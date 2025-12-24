import { motion } from "framer-motion"
import {
  Component,
  Palette,
  Code2,
  Bot,
  Moon,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    icon: Component,
    title: "50+ Components",
    description:
      "Comprehensive library covering forms, navigation, data display, feedback, and more.",
  },
  {
    icon: Palette,
    title: "IBM Carbon Design",
    description:
      "Enterprise-proven design language with industrial precision and functional beauty.",
  },
  {
    icon: Code2,
    title: "shadcn/ui + Radix",
    description:
      "Built on rock-solid primitives with full customization control.",
  },
  {
    icon: Bot,
    title: "AI-Optimized",
    description:
      "Structured for seamless AI-assisted development and code generation.",
  },
  {
    icon: Moon,
    title: "Dark/Light Themes",
    description:
      "Full theme support with customizable accent colors and Carbon tokens.",
  },
  {
    icon: ShieldCheck,
    title: "WCAG 2.1 Accessible",
    description:
      "Keyboard navigation, screen reader support, and proper focus management.",
    href: "https://www.w3.org/WAI/WCAG21/Understanding/",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-carbon-05">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Built for Scale
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to build enterprise-grade applications with
            confidence.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const content = (
              <>
                <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </>
            )

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {feature.href ? (
                  <a
                    href={feature.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-6 bg-card border border-border hover:border-primary hover:bg-accent/5 transition-colors group"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex gap-4 p-6 bg-card border border-border hover:bg-accent/5 transition-colors group">
                    {content}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

