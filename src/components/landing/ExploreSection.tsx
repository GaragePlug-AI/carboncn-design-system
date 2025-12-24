import { motion } from "framer-motion"
import { ArrowRight, Zap, FormInput, Compass, BarChart3, MessageSquare, Layers, LayoutGrid, Type, Palette } from "lucide-react"
import { Link } from "react-router-dom"

const categories = [
  {
    icon: Zap,
    title: "Actions",
    description: "Buttons, toggles, and interactive controls for user actions.",
    count: "8",
    href: "/components#actions",
  },
  {
    icon: FormInput,
    title: "Forms",
    description: "Input fields, selects, checkboxes, and form controls.",
    count: "18",
    href: "/components#forms",
  },
  {
    icon: Compass,
    title: "Navigation",
    description: "Tabs, breadcrumbs, menus, and navigation patterns.",
    count: "8",
    href: "/components#navigation",
  },
  {
    icon: BarChart3,
    title: "Data Display",
    description: "Tables, cards, lists, charts, and data visualization components.",
    count: "25+",
    href: "/components#data-display",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "Notifications, progress indicators, and loading states.",
    count: "6",
    href: "/components#feedback",
  },
  {
    icon: Layers,
    title: "Overlay",
    description: "Modals, dialogs, tooltips, and floating elements.",
    count: "8",
    href: "/components#overlay",
  },
  {
    icon: LayoutGrid,
    title: "Layout",
    description: "Separators, scroll areas, and layout utilities.",
    count: "6",
    href: "/components#layout",
  },
  {
    icon: Type,
    title: "Typography",
    description: "Headings, body text, and text styling components.",
    count: "5",
    href: "/components#typography",
  },
  {
    icon: Palette,
    title: "Colors",
    description: "Color scales, themes, and design tokens.",
    count: "3",
    href: "/components#colors",
  },
]

export function ExploreSection() {
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
            Explore Components
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse 75+ components organized by category. Click any category to explore.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={category.href}
                className="block h-full p-5 md:p-6 bg-background border border-border hover:border-primary group transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <category.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <span className="text-xl md:text-2xl font-light text-primary">
                    {category.count}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-medium mb-1">{category.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center text-primary text-xs md:text-sm font-medium group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

