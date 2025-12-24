import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"
type AccentColor = "blue" | "green" | "orange" | "purple" | "teal" | "custom"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultAccent?: AccentColor
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  accent: AccentColor
  customColor: string
  setTheme: (theme: Theme) => void
  setAccent: (accent: AccentColor) => void
  setCustomColor: (color: string) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  accent: "blue",
  customColor: "#0f62fe",
  setTheme: () => null,
  setAccent: () => null,
  setCustomColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Convert hex to HSL for CSS variables
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the hash if present
  hex = hex.replace(/^#/, '')

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccent = "blue",
  storageKey = "carbon-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [accent, setAccent] = useState<AccentColor>(
    () => (localStorage.getItem(`${storageKey}-accent`) as AccentColor) || defaultAccent
  )
  const [customColor, setCustomColor] = useState<string>(
    () => localStorage.getItem(`${storageKey}-custom-color`) || "#0f62fe"
  )

  // Handle theme changes
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  // Handle accent color changes
  useEffect(() => {
    const root = window.document.documentElement

    // Remove all accent classes
    root.classList.remove("accent-blue", "accent-green", "accent-orange", "accent-purple", "accent-teal", "accent-custom")

    if (accent === "custom") {
      // Apply custom color via CSS variables
      const hsl = hexToHSL(customColor)
      root.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--ring", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.classList.add("accent-custom")
    } else {
      // Remove custom CSS variables and use class-based accent
      root.style.removeProperty("--primary")
      root.style.removeProperty("--ring")
      root.classList.add(`accent-${accent}`)
    }
  }, [accent, customColor])

  const value = {
    theme,
    accent,
    customColor,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    setAccent: (accent: AccentColor) => {
      localStorage.setItem(`${storageKey}-accent`, accent)
      setAccent(accent)
    },
    setCustomColor: (color: string) => {
      localStorage.setItem(`${storageKey}-custom-color`, color)
      setCustomColor(color)
      // Also set accent to custom when changing custom color
      if (accent !== "custom") {
        localStorage.setItem(`${storageKey}-accent`, "custom")
        setAccent("custom")
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

// Accent color options for UI
export const accentColors: { value: AccentColor; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "#0f62fe" },
  { value: "green", label: "Green", color: "#198038" },
  { value: "orange", label: "Orange", color: "#ff6b00" },
  { value: "purple", label: "Purple", color: "#8a3ffc" },
  { value: "teal", label: "Teal", color: "#007d79" },
]
