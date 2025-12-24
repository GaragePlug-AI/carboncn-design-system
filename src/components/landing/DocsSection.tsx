import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const installCommand = `# Core utilities (required)
npm install clsx tailwind-merge class-variance-authority lucide-react

# Tailwind plugin for animations
npm install tailwindcss-animate

# Install Radix primitives as needed for specific components
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-popover
npm install @radix-ui/react-tooltip @radix-ui/react-checkbox @radix-ui/react-switch
npm install @radix-ui/react-tabs @radix-ui/react-accordion @radix-ui/react-slider`

const tailwindConfig = `// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        carbon: {
          gray: {
            10: '#f4f4f4', 20: '#e0e0e0', 30: '#c6c6c6',
            40: '#a8a8a8', 50: '#8d8d8d', 60: '#6f6f6f',
            70: '#525252', 80: '#393939', 90: '#262626',
            100: '#161616',
          },
          blue: {
            60: '#0f62fe', 70: '#0043ce',
          },
          // ... more colors
        },
      },
      spacing: {
        'carbon-01': '0.125rem', 'carbon-02': '0.25rem',
        'carbon-03': '0.5rem', 'carbon-04': '0.75rem',
        'carbon-05': '1rem', 'carbon-06': '1.5rem',
        'carbon-07': '2rem', 'carbon-08': '2.5rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`

const cssVariables = `/* index.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    --primary: 217 91% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 22%;
    --muted: 0 0% 96%;
    --accent: 0 0% 96%;
    --destructive: 0 84% 48%;
    --border: 0 0% 88%;
    --radius: 0px; /* Carbon uses 0 radius */
  }
  
  .dark {
    --background: 0 0% 9%;
    --foreground: 0 0% 96%;
    /* ... dark theme values */
  }
  
  /* Accent color themes */
  .accent-blue { --primary: 217 91% 53%; }
  .accent-green { --primary: 152 69% 31%; }
  .accent-purple { --primary: 271 81% 56%; }
}`

const componentDependencies = [
  { component: "Button", packages: "class-variance-authority" },
  { component: "Dialog", packages: "@radix-ui/react-dialog" },
  { component: "Select", packages: "@radix-ui/react-select" },
  { component: "Checkbox", packages: "@radix-ui/react-checkbox" },
  { component: "Tabs", packages: "@radix-ui/react-tabs" },
  { component: "Accordion", packages: "@radix-ui/react-accordion" },
  { component: "Tooltip", packages: "@radix-ui/react-tooltip" },
  { component: "Popover", packages: "@radix-ui/react-popover" },
  { component: "Slider", packages: "@radix-ui/react-slider" },
  { component: "Switch", packages: "@radix-ui/react-switch" },
  { component: "Command", packages: "cmdk" },
  { component: "Drawer", packages: "vaul" },
  { component: "Carousel", packages: "embla-carousel-react" },
  { component: "Chart", packages: "recharts" },
  { component: "Input OTP", packages: "input-otp" },
  { component: "Resizable", packages: "react-resizable-panels" },
]

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-carbon-gray-100 text-carbon-gray-10 p-4 overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-carbon-gray-80 hover:bg-carbon-gray-70 text-white"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export function DocsSection() {
  return (
    <section className="py-24" id="get-started">
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
            Get Started
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Set up CarbonCN in your project in minutes. Copy components, configure styling, and start building.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="install" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto no-scrollbar">
              <TabsTrigger value="install">Installation</TabsTrigger>
              <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
              <TabsTrigger value="css">CSS Variables</TabsTrigger>
              <TabsTrigger value="deps">Dependencies</TabsTrigger>
            </TabsList>

            <TabsContent value="install" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">1. Install dependencies</h3>
                  <p className="text-muted-foreground mb-4">
                    Install the core utilities and Radix UI primitives that power CarbonCN components.
                  </p>
                  <CodeBlock code={installCommand} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">2. Install fonts</h3>
                  <p className="text-muted-foreground mb-4">
                    CarbonCN uses IBM Plex fonts for authentic Carbon styling.
                  </p>
                  <CodeBlock code="npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">3. Add the cn utility</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a utility file for class merging. All components depend on this.
                  </p>
                  <CodeBlock code={`// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">4. Copy components</h3>
                  <p className="text-muted-foreground">
                    Browse the component showcase and copy the source files you need into your project's
                    <code className="mx-1 px-1.5 py-0.5 bg-muted rounded text-sm">src/components/ui/</code>
                    directory. Make sure to install any component-specific dependencies listed in the Dependencies tab.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tailwind" className="mt-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Configure Tailwind</h3>
                <p className="text-muted-foreground mb-4">
                  Extend your Tailwind configuration with Carbon design tokens for colors, spacing, and typography.
                </p>
                <CodeBlock code={tailwindConfig} />
              </div>
            </TabsContent>

            <TabsContent value="css" className="mt-6">
              <div>
                <h3 className="text-lg font-medium mb-3">CSS Variables</h3>
                <p className="text-muted-foreground mb-4">
                  Add CSS variables for theming support. This enables light/dark mode and accent color switching.
                </p>
                <CodeBlock code={cssVariables} />
              </div>
            </TabsContent>

            <TabsContent value="deps" className="mt-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Component Dependencies</h3>
                <p className="text-muted-foreground mb-4">
                  Each component may require specific packages. Reference this table when adding components.
                </p>
                <div className="border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="text-left p-3 font-medium">Component</th>
                        <th className="text-left p-3 font-medium">Required Package(s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentDependencies.map((dep, i) => (
                        <tr key={dep.component} className={i % 2 === 0 ? "" : "bg-muted/50"}>
                          <td className="p-3 font-medium">{dep.component}</td>
                          <td className="p-3 font-mono text-sm">{dep.packages}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

