import { useState } from "react"
import { Settings2, Sun, Moon, Monitor, Pipette } from "lucide-react"
import { useTheme, accentColors } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"
import { Label } from "./label"

export function ThemeSwitcher() {
  const { theme, accent, customColor, setTheme, setAccent, setCustomColor } = useTheme()
  const [showColorPicker, setShowColorPicker] = useState(false)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-9 w-9"
          aria-label="Theme settings"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-carbon-04">
          {/* Appearance Section */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-carbon-03">
              Appearance
            </p>
            <div className="flex gap-1">
              <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex-1 gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex-1 gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setTheme("system")}
                className="shrink-0"
                title="System"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Accent Color Section */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-carbon-03">
              Accent Color
            </p>
            <div className="flex flex-wrap gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccent(color.value)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    accent === color.value
                      ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                      : "border-transparent"
                  )}
                  style={{ backgroundColor: color.color }}
                  title={color.label}
                  aria-label={`${color.label} accent color`}
                  aria-pressed={accent === color.value}
                />
              ))}
              {/* Custom color button */}
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all relative overflow-hidden",
                  "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  accent === "custom"
                    ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    : "border-border"
                )}
                style={{ 
                  background: accent === "custom" 
                    ? customColor 
                    : "conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff0080, #ff0000)" 
                }}
                title="Custom color"
                aria-label="Custom accent color"
                aria-pressed={accent === "custom"}
              >
                {accent !== "custom" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <Pipette className="h-3.5 w-3.5 text-foreground" />
                  </span>
                )}
              </button>
            </div>

            {/* Custom Color Picker */}
            {showColorPicker && (
              <div className="mt-carbon-03 p-carbon-03 bg-muted rounded-sm">
                <Label htmlFor="custom-color" className="text-xs mb-carbon-02 block">
                  Custom Color
                </Label>
                <div className="flex gap-2 items-center">
                  <input
                    id="custom-color"
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={customColor.toUpperCase()}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                        if (value.length === 7) {
                          setCustomColor(value)
                        }
                      }
                    }}
                    placeholder="#0F62FE"
                    className="flex-1 h-8 px-2 text-sm font-mono bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-carbon-02">
                  Pick or enter a hex color code
                </p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeSwitcher
