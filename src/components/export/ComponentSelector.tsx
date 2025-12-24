import { useMemo } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CATEGORIES, getComponentCategory, type ComponentCategory } from "@/lib/component-registry"
import { cn } from "@/lib/utils"
import { Check, Minus } from "lucide-react"

interface ComponentSelectorProps {
  availableComponents: string[]
  selectedComponents: string[]
  onSelectionChange: (selected: string[]) => void
}

export function ComponentSelector({
  availableComponents,
  selectedComponents,
  onSelectionChange,
}: ComponentSelectorProps) {
  // Group components by category
  const groupedComponents = useMemo(() => {
    const groups: Record<ComponentCategory, string[]> = {
      actions: [],
      forms: [],
      "data-display": [],
      feedback: [],
      navigation: [],
      layout: [],
      overlays: [],
      typography: [],
    }

    for (const filename of availableComponents) {
      const category = getComponentCategory(filename)
      groups[category].push(filename)
    }

    // Sort each group
    for (const key of Object.keys(groups) as ComponentCategory[]) {
      groups[key].sort()
    }

    return groups
  }, [availableComponents])

  // Check if component is selected
  const isSelected = (filename: string) => selectedComponents.includes(filename)

  // Toggle single component
  const toggleComponent = (filename: string) => {
    if (isSelected(filename)) {
      onSelectionChange(selectedComponents.filter(f => f !== filename))
    } else {
      onSelectionChange([...selectedComponents, filename])
    }
  }

  // Toggle entire category
  const toggleCategory = (category: ComponentCategory) => {
    const categoryComponents = groupedComponents[category]
    const allSelected = categoryComponents.every(c => isSelected(c))

    if (allSelected) {
      // Deselect all in category
      onSelectionChange(selectedComponents.filter(c => !categoryComponents.includes(c)))
    } else {
      // Select all in category
      const newSelection = [...new Set([...selectedComponents, ...categoryComponents])]
      onSelectionChange(newSelection)
    }
  }

  // Get category selection state
  const getCategoryState = (category: ComponentCategory): "all" | "some" | "none" => {
    const categoryComponents = groupedComponents[category]
    if (categoryComponents.length === 0) return "none"
    
    const selectedCount = categoryComponents.filter(c => isSelected(c)).length
    if (selectedCount === 0) return "none"
    if (selectedCount === categoryComponents.length) return "all"
    return "some"
  }

  // Select all / deselect all
  const selectAll = () => onSelectionChange([...availableComponents])
  const deselectAll = () => onSelectionChange([])

  // Format filename for display
  const formatName = (filename: string) => {
    return filename
      .replace(".tsx", "")
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-carbon-06">
      {/* Header with select all/none */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedComponents.length} of {availableComponents.length} components selected
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="ghost" size="sm" onClick={deselectAll}>
            Deselect All
          </Button>
        </div>
      </div>

      {/* Category groups */}
      <div className="space-y-carbon-05">
        {CATEGORIES.map(category => {
          const components = groupedComponents[category.id]
          if (components.length === 0) return null

          const state = getCategoryState(category.id)

          return (
            <div key={category.id} className="border border-border">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-carbon-04 bg-muted/50 hover:bg-muted transition-colors",
                  "text-left"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 border flex items-center justify-center transition-colors",
                    state === "all" && "bg-primary border-primary",
                    state === "some" && "bg-primary/50 border-primary",
                    state === "none" && "border-border"
                  )}
                >
                  {state === "all" && <Check className="h-3 w-3 text-primary-foreground" />}
                  {state === "some" && <Minus className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-muted-foreground">{category.description}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {components.filter(c => isSelected(c)).length}/{components.length}
                </div>
              </button>

              {/* Component list */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-border">
                {components.map(filename => (
                  <label
                    key={filename}
                    className={cn(
                      "flex items-center gap-2 p-carbon-03 cursor-pointer hover:bg-muted/30 transition-colors",
                      "border-r border-b border-border last:border-r-0",
                      isSelected(filename) && "bg-primary/5"
                    )}
                  >
                    <Checkbox
                      checked={isSelected(filename)}
                      onCheckedChange={() => toggleComponent(filename)}
                    />
                    <span className="text-sm truncate">{formatName(filename)}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

