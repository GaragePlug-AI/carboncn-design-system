// Export utilities: dependency resolver, accent-aware CSS builder, ZIP generator

import JSZip from "jszip"
import { saveAs } from "file-saver"
import { generateLLMPrompt, type ComponentFile } from "./llm-prompt-generator"

// Accent color HSL values
export const ACCENT_HSL: Record<string, { light: string; dark: string }> = {
  blue: { light: "217 91% 53%", dark: "217 91% 53%" },
  green: { light: "152 69% 31%", dark: "149 62% 40%" },
  orange: { light: "24 100% 46%", dark: "24 95% 53%" },
  purple: { light: "271 81% 56%", dark: "271 81% 66%" },
  teal: { light: "174 100% 24%", dark: "174 100% 36%" },
}

// Parse imports from component source to detect dependencies
export function parseImports(source: string): {
  internalDeps: string[]      // Other UI components
  radixDeps: string[]         // @radix-ui packages
  lucideDeps: string[]        // lucide-react icons
  otherDeps: string[]         // Other npm packages
} {
  const internalDeps: string[] = []
  const radixDeps: string[] = []
  const lucideDeps: string[] = []
  const otherDeps: string[] = []

  // Match import statements
  const importRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?["']([^"']+)["']/g
  let match

  while ((match = importRegex.exec(source)) !== null) {
    const importPath = match[1]

    if (importPath.startsWith("@/components/ui/")) {
      // Internal component dependency
      const componentName = importPath.replace("@/components/ui/", "")
      internalDeps.push(componentName + ".tsx")
    } else if (importPath.startsWith("./") || importPath.startsWith("../")) {
      // Relative import - check if it's a UI component
      if (importPath.includes("/ui/")) {
        const parts = importPath.split("/")
        const filename = parts[parts.length - 1]
        if (!filename.includes(".")) {
          internalDeps.push(filename + ".tsx")
        } else {
          internalDeps.push(filename)
        }
      }
    } else if (importPath.startsWith("@radix-ui/")) {
      radixDeps.push(importPath)
    } else if (importPath === "lucide-react") {
      lucideDeps.push(importPath)
    } else if (!importPath.startsWith("react") && !importPath.startsWith("@/lib")) {
      otherDeps.push(importPath)
    }
  }

  return {
    internalDeps: [...new Set(internalDeps)],
    radixDeps: [...new Set(radixDeps)],
    lucideDeps: [...new Set(lucideDeps)],
    otherDeps: [...new Set(otherDeps)],
  }
}

// Resolve all dependencies recursively
export function resolveDependencies(
  selectedFiles: string[],
  allComponents: Map<string, string>
): {
  resolvedFiles: string[]
  allRadixDeps: string[]
  allOtherDeps: string[]
  hasLucide: boolean
  hasCharts: boolean
} {
  const resolved = new Set<string>(selectedFiles)
  const allRadixDeps = new Set<string>()
  const allOtherDeps = new Set<string>()
  let hasLucide = false
  let hasCharts = false

  const queue = [...selectedFiles]

  while (queue.length > 0) {
    const file = queue.shift()!
    const content = allComponents.get(file)
    
    if (!content) continue

    // Check if this is a chart component
    if (file.includes("chart") || file.startsWith("charts/")) {
      hasCharts = true
    }

    const { internalDeps, radixDeps, lucideDeps, otherDeps } = parseImports(content)

    // Add radix deps
    radixDeps.forEach(dep => allRadixDeps.add(dep))
    
    // Add other deps (filter out recharts as we handle it separately)
    otherDeps.filter(dep => dep !== "recharts").forEach(dep => allOtherDeps.add(dep))
    
    // Check for lucide
    if (lucideDeps.length > 0) hasLucide = true

    // Check for recharts import
    if (otherDeps.includes("recharts")) hasCharts = true

    // Add internal dependencies
    for (const dep of internalDeps) {
      if (!resolved.has(dep) && allComponents.has(dep)) {
        resolved.add(dep)
        queue.push(dep)
      }
    }
  }

  return {
    resolvedFiles: [...resolved].sort(),
    allRadixDeps: [...allRadixDeps].sort(),
    allOtherDeps: [...allOtherDeps].sort(),
    hasLucide,
    hasCharts,
  }
}

// Generate globals.css with the selected accent color
export function generateGlobalCSS(accentColor: string, customHSL?: string): string {
  const accent = ACCENT_HSL[accentColor] || ACCENT_HSL.blue
  const lightPrimary = customHSL || accent.light
  const darkPrimary = customHSL || accent.dark

  return `/* CarbonCN Design System - Global Styles */
/* Generated with accent color: ${accentColor} */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Carbon White Theme */
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    
    --card: 0 0% 96%;
    --card-foreground: 0 0% 9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 9%;
    
    /* Primary - accent color */
    --primary: ${lightPrimary};
    --primary-foreground: 0 0% 100%;
    
    --secondary: 0 0% 22%;
    --secondary-foreground: 0 0% 100%;
    
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 32%;
    
    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 9%;
    
    --destructive: 0 84% 48%;
    --destructive-foreground: 0 0% 100%;
    
    --border: 0 0% 88%;
    --input: 0 0% 88%;
    --ring: ${lightPrimary};
    
    /* Carbon uses 0 radius by default */
    --radius: 0px;
    
    /* Carbon Status Colors */
    --success: 152 69% 31%;
    --success-bg: 136 52% 86%;
    --warning: 46 100% 47%;
    --warning-bg: 48 89% 91%;
    --info: 217 91% 53%;
    --info-bg: 214 100% 93%;
    --error: 0 84% 48%;
    --error-bg: 0 100% 97%;
  }

  .dark {
    /* Carbon G100 Theme */
    --background: 0 0% 9%;
    --foreground: 0 0% 96%;
    
    --card: 0 0% 15%;
    --card-foreground: 0 0% 96%;
    
    --popover: 0 0% 15%;
    --popover-foreground: 0 0% 96%;
    
    --primary: ${darkPrimary};
    --primary-foreground: 0 0% 100%;
    
    --secondary: 0 0% 32%;
    --secondary-foreground: 0 0% 100%;
    
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 66%;
    
    --accent: 0 0% 22%;
    --accent-foreground: 0 0% 96%;
    
    --destructive: 0 62% 30%;
    --destructive-foreground: 0 0% 100%;
    
    --border: 0 0% 22%;
    --input: 0 0% 22%;
    --ring: ${darkPrimary};
    
    --success: 152 69% 31%;
    --success-bg: 150 100% 6%;
    --warning: 46 100% 47%;
    --warning-bg: 40 100% 5%;
    --info: 217 91% 53%;
    --info-bg: 222 100% 23%;
    --error: 0 84% 48%;
    --error-bg: 0 73% 17%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Carbon Typography Styles */
  h1 { @apply text-[2.625rem] leading-[3.125rem] font-light tracking-normal; }
  h2 { @apply text-[2rem] leading-[2.5rem] font-normal tracking-normal; }
  h3 { @apply text-[1.75rem] leading-[2.25rem] font-normal tracking-normal; }
  h4 { @apply text-[1.25rem] leading-[1.75rem] font-normal tracking-normal; }
  h5 { @apply text-base leading-6 font-semibold tracking-normal; }
  h6 { @apply text-sm leading-[1.125rem] font-semibold tracking-[0.16px]; }

  /* Focus visible styles */
  *:focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-background;
  }
}

@layer utilities {
  /* Carbon body text styles */
  .body-01 { @apply text-sm leading-5 font-normal tracking-[0.16px]; }
  .body-02 { @apply text-base leading-6 font-normal tracking-normal; }
  .body-compact-01 { @apply text-sm leading-[1.125rem] font-normal tracking-[0.16px]; }
  .body-compact-02 { @apply text-base leading-[1.375rem] font-normal tracking-normal; }
  .label-01 { @apply text-xs leading-4 font-normal tracking-[0.32px]; }
  .label-02 { @apply text-sm leading-[1.125rem] font-normal tracking-[0.16px]; }
  .helper-text-01 { @apply text-xs leading-4 font-normal tracking-[0.32px]; }
  .caption-01 { @apply text-xs leading-4 font-normal tracking-[0.32px]; }

  /* Carbon productive motion */
  .motion-productive { transition-timing-function: cubic-bezier(0.2, 0, 0.38, 0.9); }
  .motion-expressive { transition-timing-function: cubic-bezier(0.4, 0.14, 0.3, 1); }
  
  .duration-fast-01 { transition-duration: 70ms; }
  .duration-fast-02 { transition-duration: 110ms; }
  .duration-moderate-01 { transition-duration: 150ms; }
  .duration-moderate-02 { transition-duration: 240ms; }

  /* Carbon 2x Grid System */
  .carbon-grid {
    @apply grid gap-8;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 672px) { .carbon-grid { grid-template-columns: repeat(8, 1fr); } }
  @media (min-width: 1056px) { .carbon-grid { grid-template-columns: repeat(16, 1fr); } }

  .carbon-grid-container { @apply w-full mx-auto px-0; }
  @media (min-width: 672px) { .carbon-grid-container { @apply px-4; } }
  @media (min-width: 1056px) { .carbon-grid-container { @apply px-4; } }
  @media (min-width: 1312px) { .carbon-grid-container { @apply px-4; } }
  @media (min-width: 1584px) { .carbon-grid-container { @apply px-6; max-width: 1584px; } }

  /* Column span utilities for 16-column grid */
  .col-span-full-16 { grid-column: span 16 / span 16; }
  .col-span-12-16 { grid-column: span 12 / span 12; }
  .col-span-8-16 { grid-column: span 8 / span 8; }
  .col-span-4-16 { grid-column: span 4 / span 4; }

  /* Caret blink animation for OTP input */
  @keyframes caret-blink {
    0%, 70%, 100% { opacity: 1; }
    20%, 50% { opacity: 0; }
  }
  .animate-caret-blink { animation: caret-blink 1.25s ease-out infinite; }
}
`
}

// Generate tailwind.config.js
export function generateTailwindConfig(): string {
  return `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',    // Carbon sm
      'md': '672px',    // Carbon md
      'lg': '1056px',   // Carbon lg
      'xlg': '1312px',  // Carbon xlg
      'max': '1584px',  // Carbon max
      '2xl': '1400px',
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        carbon: {
          gray: {
            100: '#161616', 90: '#262626', 80: '#393939', 70: '#525252',
            60: '#6f6f6f', 50: '#8d8d8d', 40: '#a8a8a8', 30: '#c6c6c6',
            20: '#e0e0e0', 10: '#f4f4f4',
          },
          blue: {
            100: '#001141', 90: '#001d6c', 80: '#002d9c', 70: '#0043ce',
            60: '#0f62fe', 50: '#4589ff', 40: '#78a9ff', 30: '#a6c8ff',
            20: '#d0e2ff', 10: '#edf5ff',
          },
          green: {
            100: '#071908', 90: '#022d0d', 80: '#044317', 70: '#0e6027',
            60: '#198038', 50: '#24a148', 40: '#42be65', 30: '#6fdc8c',
            20: '#a7f0ba', 10: '#defbe6',
          },
          red: {
            100: '#2d0709', 90: '#520408', 80: '#750e13', 70: '#a2191f',
            60: '#da1e28', 50: '#fa4d56', 40: '#ff8389', 30: '#ffb3b8',
            20: '#ffd7d9', 10: '#fff1f1',
          },
          yellow: {
            100: '#1c1500', 90: '#302400', 80: '#483700', 70: '#684e00',
            60: '#8e6a00', 50: '#b28600', 40: '#d2a106', 30: '#f1c21b',
            20: '#fddc69', 10: '#fcf4d6',
          },
          purple: {
            100: '#1c0f30', 90: '#31135e', 80: '#491d8b', 70: '#6929c4',
            60: '#8a3ffc', 50: '#a56eff', 40: '#be95ff', 30: '#d4bbff',
            20: '#e8daff', 10: '#f6f2ff',
          },
          teal: {
            100: '#081a1c', 90: '#022b30', 80: '#004144', 70: '#005d5d',
            60: '#007d79', 50: '#009d9a', 40: '#08bdba', 30: '#3ddbd9',
            20: '#9ef0f0', 10: '#d9fbfb',
          },
          cyan: {
            100: '#061727', 90: '#012749', 80: '#003a6d', 70: '#00539a',
            60: '#0072c3', 50: '#1192e8', 40: '#33b1ff', 30: '#82cfff',
            20: '#bae6ff', 10: '#e5f6ff',
          },
          magenta: {
            100: '#2a0a18', 90: '#510224', 80: '#740937', 70: '#9f1853',
            60: '#d02670', 50: '#ee5396', 40: '#ff7eb6', 30: '#ffafd2',
            20: '#ffd6e8', 10: '#fff0f7',
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        'carbon-01': '0.125rem',
        'carbon-02': '0.25rem',
        'carbon-03': '0.5rem',
        'carbon-04': '0.75rem',
        'carbon-05': '1rem',
        'carbon-06': '1.5rem',
        'carbon-07': '2rem',
        'carbon-08': '2.5rem',
        'carbon-09': '3rem',
        'carbon-10': '4rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
`
}

// Generate utils.ts
export function generateUtils(): string {
  return `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
}

// Generate package.json with only required dependencies
export function generatePackageJson(
  radixDeps: string[],
  otherDeps: string[],
  hasLucide: boolean,
  hasCharts: boolean = false
): string {
  const deps: Record<string, string> = {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "tailwindcss-animate": "^1.0.7",
  }

  if (hasLucide) {
    deps["lucide-react"] = "^0.300.0"
  }

  if (hasCharts) {
    deps["recharts"] = "^2.12.0"
  }

  // Add radix dependencies
  for (const dep of radixDeps) {
    deps[dep] = "^1.0.0"
  }

  // Add other dependencies
  for (const dep of otherDeps) {
    if (!dep.startsWith("@/")) {
      deps[dep] = "^1.0.0"
    }
  }

  const pkg = {
    name: "carboncn-components",
    version: "1.0.0",
    description: "CarbonCN Design System components export",
    dependencies: Object.fromEntries(
      Object.entries(deps).sort(([a], [b]) => a.localeCompare(b))
    ),
    devDependencies: {
      "tailwindcss": "^3.4.0",
      "autoprefixer": "^10.4.0",
      "postcss": "^8.4.0",
    },
    peerDependencies: {
      "react": "^18.0.0",
      "react-dom": "^18.0.0",
    },
  }

  return JSON.stringify(pkg, null, 2)
}

// Generate README.md
export function generateReadme(
  componentCount: number,
  accentColor: string,
  githubUrl: string
): string {
  return `# CarbonCN Design System Export

This export contains ${componentCount} components from the CarbonCN Design System.

## Accent Color

This export is configured with **${accentColor}** as the primary accent color.

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Install Fonts

\`\`\`bash
npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
\`\`\`

Then import in your main entry file:

\`\`\`tsx
import '@fontsource/ibm-plex-sans/300.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-mono/400.css'
\`\`\`

### 3. Copy Files

- Copy \`components/ui/\` to \`src/components/ui/\`
- Copy \`lib/utils.ts\` to \`src/lib/utils.ts\`
- Merge \`styles/globals.css\` with your global CSS
- Merge \`tailwind.config.js\` with your Tailwind config

### 4. Configure Path Alias

Add to your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
\`\`\`

## Usage

\`\`\`tsx
import { Button } from "@/components/ui/button"

function App() {
  return <Button>Click me</Button>
}
\`\`\`

## LLM Integration

See \`PROMPT.md\` for comprehensive documentation that can be used with AI assistants to understand and extend this design system.

## More Information

For the latest components and updates, visit: ${githubUrl}
`
}

// Main export function - generates and downloads the ZIP
export async function exportDesignSystem(options: {
  selectedFiles: string[]
  allComponents: Map<string, string>
  accentColor: string
  customHSL?: string
  githubUrl: string
}): Promise<void> {
  const { selectedFiles, allComponents, accentColor, customHSL, githubUrl } = options

  // Resolve dependencies
  const { resolvedFiles, allRadixDeps, allOtherDeps, hasLucide, hasCharts } = resolveDependencies(
    selectedFiles,
    allComponents
  )

  // Create ZIP
  const zip = new JSZip()

  // Add components
  const componentsFolder = zip.folder("components/ui")!
  const componentFiles: ComponentFile[] = []
  
  for (const filename of resolvedFiles) {
    const content = allComponents.get(filename)
    if (content) {
      componentsFolder.file(filename, content)
      componentFiles.push({ filename, content })
    }
  }

  // Add lib/utils.ts
  const libFolder = zip.folder("lib")!
  libFolder.file("utils.ts", generateUtils())

  // Add styles/globals.css
  const stylesFolder = zip.folder("styles")!
  const accentHSL = customHSL || ACCENT_HSL[accentColor]?.light || ACCENT_HSL.blue.light
  stylesFolder.file("globals.css", generateGlobalCSS(accentColor, customHSL))

  // Add tailwind.config.js
  zip.file("tailwind.config.js", generateTailwindConfig())

  // Add package.json
  zip.file("package.json", generatePackageJson(allRadixDeps, allOtherDeps, hasLucide, hasCharts))

  // Add README.md
  zip.file("README.md", generateReadme(resolvedFiles.length, accentColor, githubUrl))

  // Add PROMPT.md (LLM documentation)
  const promptContent = generateLLMPrompt(componentFiles, {
    githubUrl,
    accentColor,
    accentHSL,
  })
  zip.file("PROMPT.md", promptContent)

  // Generate and download
  const blob = await zip.generateAsync({ type: "blob" })
  saveAs(blob, `carboncn-design-system-${accentColor}.zip`)
}

// Get estimated size of export
export function getEstimatedSize(
  selectedFiles: string[],
  allComponents: Map<string, string>
): { files: number; bytes: number; formatted: string } {
  const { resolvedFiles } = resolveDependencies(selectedFiles, allComponents)
  
  let totalBytes = 0
  for (const filename of resolvedFiles) {
    const content = allComponents.get(filename)
    if (content) {
      totalBytes += new Blob([content]).size
    }
  }

  // Add approximate size for config files
  totalBytes += 5000  // globals.css
  totalBytes += 4000  // tailwind.config.js
  totalBytes += 500   // utils.ts
  totalBytes += 1000  // package.json
  totalBytes += 2000  // README.md
  totalBytes += 15000 // PROMPT.md (principles only, no embedded source)

  const formatted = totalBytes > 1024 * 1024
    ? `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(totalBytes / 1024).toFixed(1)} KB`

  return {
    files: resolvedFiles.length,
    bytes: totalBytes,
    formatted,
  }
}

