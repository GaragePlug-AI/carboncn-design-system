import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/landing/Header"
import { ComponentSelector } from "@/components/export/ComponentSelector"
import { ExportPreview } from "@/components/export/ExportPreview"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { exportDesignSystem, ACCENT_HSL } from "@/lib/export-utils"
import { Download, Package, AlertCircle } from "lucide-react"

// Official CarbonCN GitHub repository
const GITHUB_URL = "https://github.com/GaragePlug-AI/carboncn-design-system"

export function ExportPage() {
  const { accent, customColor } = useTheme()
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])
  const [allComponents, setAllComponents] = useState<Map<string, string>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // Load component source files using raw imports
  useEffect(() => {
    async function loadComponents() {
      setIsLoading(true)
      setError(null)

      const componentMap = new Map<string, string>()

      try {
        // Use dynamic imports with ?raw to load component source code
        const componentModules: Record<string, () => Promise<string>> = {
          "accordion.tsx": () => import("@/components/ui/accordion.tsx?raw").then(m => m.default),
          "actionable-notification.tsx": () => import("@/components/ui/actionable-notification.tsx?raw").then(m => m.default),
          "alert.tsx": () => import("@/components/ui/alert.tsx?raw").then(m => m.default),
          "aspect-ratio.tsx": () => import("@/components/ui/aspect-ratio.tsx?raw").then(m => m.default),
          "avatar.tsx": () => import("@/components/ui/avatar.tsx?raw").then(m => m.default),
          "breadcrumb.tsx": () => import("@/components/ui/breadcrumb.tsx?raw").then(m => m.default),
          "button.tsx": () => import("@/components/ui/button.tsx?raw").then(m => m.default),
          "card.tsx": () => import("@/components/ui/card.tsx?raw").then(m => m.default),
          "carousel.tsx": () => import("@/components/ui/carousel.tsx?raw").then(m => m.default),
          "chart.tsx": () => import("@/components/ui/chart.tsx?raw").then(m => m.default),
          "checkbox.tsx": () => import("@/components/ui/checkbox.tsx?raw").then(m => m.default),
          "code-snippet.tsx": () => import("@/components/ui/code-snippet.tsx?raw").then(m => m.default),
          "collapsible.tsx": () => import("@/components/ui/collapsible.tsx?raw").then(m => m.default),
          "combobox.tsx": () => import("@/components/ui/combobox.tsx?raw").then(m => m.default),
          "command.tsx": () => import("@/components/ui/command.tsx?raw").then(m => m.default),
          "content-switcher.tsx": () => import("@/components/ui/content-switcher.tsx?raw").then(m => m.default),
          "context-menu.tsx": () => import("@/components/ui/context-menu.tsx?raw").then(m => m.default),
          "copy-button.tsx": () => import("@/components/ui/copy-button.tsx?raw").then(m => m.default),
          "data-table.tsx": () => import("@/components/ui/data-table.tsx?raw").then(m => m.default),
          "date-picker.tsx": () => import("@/components/ui/date-picker.tsx?raw").then(m => m.default),
          "definition-tooltip.tsx": () => import("@/components/ui/definition-tooltip.tsx?raw").then(m => m.default),
          "dialog.tsx": () => import("@/components/ui/dialog.tsx?raw").then(m => m.default),
          "drawer.tsx": () => import("@/components/ui/drawer.tsx?raw").then(m => m.default),
          "dropdown-menu.tsx": () => import("@/components/ui/dropdown-menu.tsx?raw").then(m => m.default),
          "file-uploader.tsx": () => import("@/components/ui/file-uploader.tsx?raw").then(m => m.default),
          "fluid-form.tsx": () => import("@/components/ui/fluid-form.tsx?raw").then(m => m.default),
          "form.tsx": () => import("@/components/ui/form.tsx?raw").then(m => m.default),
          "hover-card.tsx": () => import("@/components/ui/hover-card.tsx?raw").then(m => m.default),
          "inline-loading.tsx": () => import("@/components/ui/inline-loading.tsx?raw").then(m => m.default),
          "input-group.tsx": () => import("@/components/ui/input-group.tsx?raw").then(m => m.default),
          "input-otp.tsx": () => import("@/components/ui/input-otp.tsx?raw").then(m => m.default),
          "input.tsx": () => import("@/components/ui/input.tsx?raw").then(m => m.default),
          "kbd.tsx": () => import("@/components/ui/kbd.tsx?raw").then(m => m.default),
          "label.tsx": () => import("@/components/ui/label.tsx?raw").then(m => m.default),
          "layer.tsx": () => import("@/components/ui/layer.tsx?raw").then(m => m.default),
          "link.tsx": () => import("@/components/ui/link.tsx?raw").then(m => m.default),
          "list.tsx": () => import("@/components/ui/list.tsx?raw").then(m => m.default),
          "loading.tsx": () => import("@/components/ui/loading.tsx?raw").then(m => m.default),
          "menu-button.tsx": () => import("@/components/ui/menu-button.tsx?raw").then(m => m.default),
          "menubar.tsx": () => import("@/components/ui/menubar.tsx?raw").then(m => m.default),
          "modal.tsx": () => import("@/components/ui/modal.tsx?raw").then(m => m.default),
          "multi-select.tsx": () => import("@/components/ui/multi-select.tsx?raw").then(m => m.default),
          "navigation-menu.tsx": () => import("@/components/ui/navigation-menu.tsx?raw").then(m => m.default),
          "notification.tsx": () => import("@/components/ui/notification.tsx?raw").then(m => m.default),
          "number-input.tsx": () => import("@/components/ui/number-input.tsx?raw").then(m => m.default),
          "overflow-menu.tsx": () => import("@/components/ui/overflow-menu.tsx?raw").then(m => m.default),
          "pagination.tsx": () => import("@/components/ui/pagination.tsx?raw").then(m => m.default),
          "popover.tsx": () => import("@/components/ui/popover.tsx?raw").then(m => m.default),
          "progress.tsx": () => import("@/components/ui/progress.tsx?raw").then(m => m.default),
          "radio-group.tsx": () => import("@/components/ui/radio-group.tsx?raw").then(m => m.default),
          "resizable.tsx": () => import("@/components/ui/resizable.tsx?raw").then(m => m.default),
          "scroll-area.tsx": () => import("@/components/ui/scroll-area.tsx?raw").then(m => m.default),
          "search.tsx": () => import("@/components/ui/search.tsx?raw").then(m => m.default),
          "select.tsx": () => import("@/components/ui/select.tsx?raw").then(m => m.default),
          "separator.tsx": () => import("@/components/ui/separator.tsx?raw").then(m => m.default),
          "sheet.tsx": () => import("@/components/ui/sheet.tsx?raw").then(m => m.default),
          "side-nav.tsx": () => import("@/components/ui/side-nav.tsx?raw").then(m => m.default),
          "sidebar.tsx": () => import("@/components/ui/sidebar.tsx?raw").then(m => m.default),
          "skeleton.tsx": () => import("@/components/ui/skeleton.tsx?raw").then(m => m.default),
          "slider.tsx": () => import("@/components/ui/slider.tsx?raw").then(m => m.default),
          "spinner.tsx": () => import("@/components/ui/spinner.tsx?raw").then(m => m.default),
          "structured-list.tsx": () => import("@/components/ui/structured-list.tsx?raw").then(m => m.default),
          "switch.tsx": () => import("@/components/ui/switch.tsx?raw").then(m => m.default),
          "table.tsx": () => import("@/components/ui/table.tsx?raw").then(m => m.default),
          "tabs.tsx": () => import("@/components/ui/tabs.tsx?raw").then(m => m.default),
          "tag.tsx": () => import("@/components/ui/tag.tsx?raw").then(m => m.default),
          "tearsheet.tsx": () => import("@/components/ui/tearsheet.tsx?raw").then(m => m.default),
          "text-area.tsx": () => import("@/components/ui/text-area.tsx?raw").then(m => m.default),
          "textarea.tsx": () => import("@/components/ui/textarea.tsx?raw").then(m => m.default),
          "tile.tsx": () => import("@/components/ui/tile.tsx?raw").then(m => m.default),
          "time-picker.tsx": () => import("@/components/ui/time-picker.tsx?raw").then(m => m.default),
          "toaster.tsx": () => import("@/components/ui/toaster.tsx?raw").then(m => m.default),
          "toggle-group.tsx": () => import("@/components/ui/toggle-group.tsx?raw").then(m => m.default),
          "toggle-tip.tsx": () => import("@/components/ui/toggle-tip.tsx?raw").then(m => m.default),
          "toggle.tsx": () => import("@/components/ui/toggle.tsx?raw").then(m => m.default),
          "tooltip.tsx": () => import("@/components/ui/tooltip.tsx?raw").then(m => m.default),
          "tree-view.tsx": () => import("@/components/ui/tree-view.tsx?raw").then(m => m.default),
          "ui-shell-header.tsx": () => import("@/components/ui/ui-shell-header.tsx?raw").then(m => m.default),
          // Charts (Enterprise Suite)
          "charts/index.tsx": () => import("@/components/ui/charts/index.tsx?raw").then(m => m.default),
          "charts/bar-chart.tsx": () => import("@/components/ui/charts/bar-chart.tsx?raw").then(m => m.default),
          "charts/line-chart.tsx": () => import("@/components/ui/charts/line-chart.tsx?raw").then(m => m.default),
          "charts/area-chart.tsx": () => import("@/components/ui/charts/area-chart.tsx?raw").then(m => m.default),
          "charts/pie-chart.tsx": () => import("@/components/ui/charts/pie-chart.tsx?raw").then(m => m.default),
          "charts/gauge-chart.tsx": () => import("@/components/ui/charts/gauge-chart.tsx?raw").then(m => m.default),
          "charts/sparkline.tsx": () => import("@/components/ui/charts/sparkline.tsx?raw").then(m => m.default),
          "charts/combo-chart.tsx": () => import("@/components/ui/charts/combo-chart.tsx?raw").then(m => m.default),
          "charts/heatmap.tsx": () => import("@/components/ui/charts/heatmap.tsx?raw").then(m => m.default),
          "charts/treemap.tsx": () => import("@/components/ui/charts/treemap.tsx?raw").then(m => m.default),
          "charts/radar-chart.tsx": () => import("@/components/ui/charts/radar-chart.tsx?raw").then(m => m.default),
          "charts/funnel-chart.tsx": () => import("@/components/ui/charts/funnel-chart.tsx?raw").then(m => m.default),
          "charts/scatter-chart.tsx": () => import("@/components/ui/charts/scatter-chart.tsx?raw").then(m => m.default),
          "charts/waterfall-chart.tsx": () => import("@/components/ui/charts/waterfall-chart.tsx?raw").then(m => m.default),
        }

        // Load all components in parallel
        const loadPromises = Object.entries(componentModules).map(async ([filename, loader]) => {
          try {
            const content = await loader()
            componentMap.set(filename, content)
          } catch (e) {
            console.warn(`Could not load ${filename}:`, e)
          }
        })

        await Promise.all(loadPromises)

        setAllComponents(componentMap)

        if (componentMap.size === 0) {
          setError("Could not load component files. Please ensure the development server is running.")
        }
      } catch (e) {
        console.error("Error loading components:", e)
        setError("Failed to load components. Please try refreshing the page.")
      } finally {
        setIsLoading(false)
      }
    }

    loadComponents()
  }, [])

  // Get available component filenames
  const availableComponents = useMemo(() => {
    return [...allComponents.keys()].sort()
  }, [allComponents])

  // Get custom HSL if using custom accent
  const customHSL = accent === "custom" ? hexToHSL(customColor) : undefined

  // Handle export
  const handleExport = async () => {
    if (selectedComponents.length === 0) return

    setIsExporting(true)
    try {
      await exportDesignSystem({
        selectedFiles: selectedComponents,
        allComponents,
        accentColor: accent,
        customHSL,
        githubUrl: GITHUB_URL,
      })
    } catch (e) {
      console.error("Export failed:", e)
      setError("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  // Convert hex to HSL string
  function hexToHSL(hex: string): string {
    hex = hex.replace(/^#/, '')
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
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  // Get accent display info
  const accentInfo = accent === "custom"
    ? { name: "Custom", hsl: customHSL || "", color: customColor }
    : { name: accent.charAt(0).toUpperCase() + accent.slice(1), hsl: ACCENT_HSL[accent]?.light || "", color: `hsl(${ACCENT_HSL[accent]?.light || ""})` }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-carbon-07">
        {/* Hero Section */}
        <div className="max-w-3xl mb-carbon-07">
          <h1 className="text-3xl md:text-4xl font-light mb-carbon-04">
            Export Design System
          </h1>
          <p className="text-lg text-muted-foreground">
            Select the components you need and download a ready-to-use package with all dependencies,
            configuration files, and comprehensive LLM documentation.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-carbon-05 p-carbon-04 bg-carbon-red-10 dark:bg-carbon-red-90/20 border border-carbon-red-60 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-carbon-red-60" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-carbon-10">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
              <p className="text-muted-foreground">Loading components...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-carbon-06">
            {/* Left: Component Selector */}
            <div className="lg:col-span-2">
              <div className="sticky top-20">
                <h2 className="text-xl font-medium mb-carbon-04">Select Components</h2>
                <ComponentSelector
                  availableComponents={availableComponents}
                  selectedComponents={selectedComponents}
                  onSelectionChange={setSelectedComponents}
                />
              </div>
            </div>

            {/* Right: Preview & Export */}
            <div className="space-y-carbon-05">
              <div className="sticky top-20 space-y-carbon-05">
                {/* Current Accent */}
                <div className="border border-border p-carbon-04">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Accent Color</span>
                    <div
                      className="w-6 h-6 border border-border"
                      style={{ backgroundColor: accentInfo.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>{accentInfo.name}</strong> - This will be the default primary color in the exported CSS.
                    Change it using the theme switcher in the header.
                  </p>
                </div>

                {/* Preview */}
                <ExportPreview
                  selectedComponents={selectedComponents}
                  allComponents={allComponents}
                  accentColor={accent}
                  customHSL={customHSL}
                />

                {/* Export Button */}
                <Button
                  onClick={handleExport}
                  disabled={selectedComponents.length === 0 || isExporting}
                  className="w-full"
                  size="lg"
                >
                  {isExporting ? (
                    <>
                      <Package className="mr-2 h-4 w-4 animate-spin" />
                      Generating ZIP...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Design System
                    </>
                  )}
                </Button>

                {/* Info */}
                <p className="text-xs text-muted-foreground text-center">
                  The download includes a comprehensive PROMPT.md file for LLM integration.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-carbon-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-light tracking-tight">CarbonCN Design System</span>
            <p className="text-sm text-muted-foreground">Built with Carbon Design System + shadcn/ui</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://carbondesignsystem.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Carbon</a>
            <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">shadcn/ui</a>
            <a href="https://www.figma.com/community/file/1203007658934444648" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Figma</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.garageplug.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              GaragePlug AI Labs
            </a>
            . Open source under MIT.
          </div>
        </div>
      </footer>
    </div>
  )
}

