import { useMemo } from "react"
import { resolveDependencies, getEstimatedSize, ACCENT_HSL } from "@/lib/export-utils"
import { cn } from "@/lib/utils"
import { FileCode, Folder, Package, Palette, FileText, Download } from "lucide-react"

interface ExportPreviewProps {
  selectedComponents: string[]
  allComponents: Map<string, string>
  accentColor: string
  customHSL?: string
}

export function ExportPreview({
  selectedComponents,
  allComponents,
  accentColor,
  customHSL,
}: ExportPreviewProps) {
  // Resolve dependencies
  const resolved = useMemo(() => {
    if (selectedComponents.length === 0) {
      return { resolvedFiles: [], allRadixDeps: [], allOtherDeps: [], hasLucide: false }
    }
    return resolveDependencies(selectedComponents, allComponents)
  }, [selectedComponents, allComponents])

  // Get estimated size
  const sizeInfo = useMemo(() => {
    if (selectedComponents.length === 0) {
      return { files: 0, bytes: 0, formatted: "0 KB" }
    }
    return getEstimatedSize(selectedComponents, allComponents)
  }, [selectedComponents, allComponents])

  // Auto-included components (dependencies)
  const autoIncluded = useMemo(() => {
    return resolved.resolvedFiles.filter(f => !selectedComponents.includes(f))
  }, [resolved.resolvedFiles, selectedComponents])

  // Get accent HSL for display
  const accentHSL = customHSL || ACCENT_HSL[accentColor]?.light || ACCENT_HSL.blue.light

  // Format filename for display
  const formatName = (filename: string) => {
    return filename
      .replace(".tsx", "")
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (selectedComponents.length === 0) {
    return (
      <div className="border border-border p-carbon-06 text-center text-muted-foreground">
        <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p>Select components to preview the export</p>
      </div>
    )
  }

  return (
    <div className="border border-border divide-y divide-border">
      {/* Header */}
      <div className="p-carbon-05 bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Preview
          </h3>
          <div className="text-sm text-muted-foreground">
            {sizeInfo.formatted}
          </div>
        </div>
      </div>

      {/* Accent Color */}
      <div className="p-carbon-04 flex items-center gap-3">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <div className="flex-1">
          <div className="text-sm font-medium">Accent Color</div>
          <div className="text-xs text-muted-foreground">{accentColor}</div>
        </div>
        <div
          className="w-8 h-8 border border-border"
          style={{ backgroundColor: `hsl(${accentHSL})` }}
          title={`hsl(${accentHSL})`}
        />
      </div>

      {/* File Tree */}
      <div className="p-carbon-04">
        <div className="text-sm font-medium mb-3">Generated Files</div>
        <div className="font-mono text-xs space-y-1">
          {/* Root folder */}
          <div className="flex items-center gap-2">
            <Folder className="h-3 w-3 text-carbon-blue-60" />
            <span>carboncn-design-system/</span>
          </div>
          
          {/* Components folder */}
          <div className="ml-4 flex items-center gap-2">
            <Folder className="h-3 w-3 text-carbon-blue-60" />
            <span>components/ui/</span>
            <span className="text-muted-foreground">({resolved.resolvedFiles.length} files)</span>
          </div>
          
          {/* Component files (show first 5) */}
          {resolved.resolvedFiles.slice(0, 5).map(file => (
            <div key={file} className="ml-8 flex items-center gap-2">
              <FileCode className="h-3 w-3 text-carbon-purple-60" />
              <span className={cn(
                autoIncluded.includes(file) && "text-muted-foreground italic"
              )}>
                {file}
              </span>
              {autoIncluded.includes(file) && (
                <span className="text-xs text-muted-foreground">(auto)</span>
              )}
            </div>
          ))}
          {resolved.resolvedFiles.length > 5 && (
            <div className="ml-8 text-muted-foreground">
              ... and {resolved.resolvedFiles.length - 5} more
            </div>
          )}

          {/* Lib folder */}
          <div className="ml-4 flex items-center gap-2">
            <Folder className="h-3 w-3 text-carbon-blue-60" />
            <span>lib/</span>
          </div>
          <div className="ml-8 flex items-center gap-2">
            <FileCode className="h-3 w-3 text-carbon-purple-60" />
            <span>utils.ts</span>
          </div>

          {/* Styles folder */}
          <div className="ml-4 flex items-center gap-2">
            <Folder className="h-3 w-3 text-carbon-blue-60" />
            <span>styles/</span>
          </div>
          <div className="ml-8 flex items-center gap-2">
            <FileCode className="h-3 w-3 text-carbon-cyan-60" />
            <span>globals.css</span>
          </div>

          {/* Root files */}
          <div className="ml-4 flex items-center gap-2">
            <FileCode className="h-3 w-3 text-carbon-green-60" />
            <span>tailwind.config.js</span>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <FileCode className="h-3 w-3 text-carbon-yellow-40" />
            <span>package.json</span>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <FileText className="h-3 w-3 text-muted-foreground" />
            <span>README.md</span>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <FileText className="h-3 w-3 text-carbon-magenta-60" />
            <span className="font-semibold">PROMPT.md</span>
            <span className="text-muted-foreground">(LLM Guide)</span>
          </div>
        </div>
      </div>

      {/* Dependencies */}
      {(resolved.allRadixDeps.length > 0 || resolved.hasLucide) && (
        <div className="p-carbon-04">
          <div className="text-sm font-medium mb-2">Required Dependencies</div>
          <div className="flex flex-wrap gap-1">
            {resolved.allRadixDeps.map(dep => (
              <span
                key={dep}
                className="text-xs px-2 py-0.5 bg-carbon-blue-10 dark:bg-carbon-blue-90 text-carbon-blue-60 dark:text-carbon-blue-40"
              >
                {dep.replace("@radix-ui/", "")}
              </span>
            ))}
            {resolved.hasLucide && (
              <span className="text-xs px-2 py-0.5 bg-carbon-purple-10 dark:bg-carbon-purple-90 text-carbon-purple-60 dark:text-carbon-purple-40">
                lucide-react
              </span>
            )}
          </div>
        </div>
      )}

      {/* Auto-included note */}
      {autoIncluded.length > 0 && (
        <div className="p-carbon-04 bg-carbon-blue-10 dark:bg-carbon-blue-90/20">
          <div className="text-xs text-carbon-blue-70 dark:text-carbon-blue-40">
            <strong>{autoIncluded.length}</strong> additional component{autoIncluded.length !== 1 ? "s" : ""} will be auto-included as dependencies:
            <span className="ml-1">{autoIncluded.map(f => formatName(f)).join(", ")}</span>
          </div>
        </div>
      )}
    </div>
  )
}

