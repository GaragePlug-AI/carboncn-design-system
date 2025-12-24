import { motion } from "framer-motion"
import { Eye, Zap, Layers, Gem } from "lucide-react"

const principles = [
  {
    icon: Eye,
    title: "Clarity",
    description:
      "Eliminate ambiguity. Enable people to see, understand, and act with confidence.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Streamline workflows and reduce cognitive load. Help users work smarter and faster.",
  },
  {
    icon: Layers,
    title: "Consistency",
    description:
      "Create familiarity through systematic patterns. Same solutions for same problems.",
  },
  {
    icon: Gem,
    title: "Beauty",
    description:
      "Demonstrate respect for users through thoughtful, elegant design that enhances experience.",
  },
]

export function PrinciplesSection() {
  return (
    <section className="py-24 bg-card">
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
            Design Principles
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built on IBM Carbon's proven design philosophy, adapted for modern
            development workflows.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-background border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <principle.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

