// Lightweight component registry - just category mapping for UI grouping
// Actual component details are parsed from source files at export time

export type ComponentCategory = 
  | "actions"
  | "forms"
  | "data-display"
  | "feedback"
  | "navigation"
  | "layout"
  | "overlays"
  | "typography"

export interface CategoryInfo {
  id: ComponentCategory
  name: string
  description: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "actions", name: "Actions", description: "Buttons, toggles, and interactive controls" },
  { id: "forms", name: "Forms", description: "Input fields, selects, checkboxes, and form controls" },
  { id: "data-display", name: "Data Display", description: "Tables, lists, cards, and data visualization" },
  { id: "feedback", name: "Feedback", description: "Alerts, notifications, loading states, and progress" },
  { id: "navigation", name: "Navigation", description: "Menus, tabs, breadcrumbs, and navigation patterns" },
  { id: "layout", name: "Layout", description: "Containers, grids, separators, and spacing" },
  { id: "overlays", name: "Overlays", description: "Modals, dialogs, popovers, and drawers" },
  { id: "typography", name: "Typography", description: "Text, labels, and typographic elements" },
]

// Simple mapping of component files to categories
// Components not listed here default to "data-display"
export const COMPONENT_CATEGORIES: Record<string, ComponentCategory> = {
  // Actions
  "button.tsx": "actions",
  "toggle.tsx": "actions",
  "toggle-group.tsx": "actions",
  "switch.tsx": "actions",
  "copy-button.tsx": "actions",
  "menu-button.tsx": "actions",
  
  // Forms
  "input.tsx": "forms",
  "textarea.tsx": "forms",
  "text-area.tsx": "forms",
  "select.tsx": "forms",
  "checkbox.tsx": "forms",
  "radio-group.tsx": "forms",
  "slider.tsx": "forms",
  "form.tsx": "forms",
  "label.tsx": "forms",
  "input-otp.tsx": "forms",
  "input-group.tsx": "forms",
  "number-input.tsx": "forms",
  "search.tsx": "forms",
  "combobox.tsx": "forms",
  "multi-select.tsx": "forms",
  "date-picker.tsx": "forms",
  "time-picker.tsx": "forms",
  "file-uploader.tsx": "forms",
  "fluid-form.tsx": "forms",
  
  // Data Display
  "table.tsx": "data-display",
  "data-table.tsx": "data-display",
  "card.tsx": "data-display",
  "avatar.tsx": "data-display",
  "badge.tsx": "data-display",
  "tag.tsx": "data-display",
  "list.tsx": "data-display",
  "structured-list.tsx": "data-display",
  "accordion.tsx": "data-display",
  "collapsible.tsx": "data-display",
  "carousel.tsx": "data-display",
  "chart.tsx": "data-display",
  "tree-view.tsx": "data-display",
  "code-snippet.tsx": "data-display",
  "tile.tsx": "data-display",
  "aspect-ratio.tsx": "data-display",
  "skeleton.tsx": "data-display",
  "hover-card.tsx": "data-display",
  
  // Charts (Enterprise Suite)
  "charts/index.tsx": "data-display",
  "charts/bar-chart.tsx": "data-display",
  "charts/line-chart.tsx": "data-display",
  "charts/area-chart.tsx": "data-display",
  "charts/pie-chart.tsx": "data-display",
  "charts/gauge-chart.tsx": "data-display",
  "charts/sparkline.tsx": "data-display",
  "charts/combo-chart.tsx": "data-display",
  "charts/heatmap.tsx": "data-display",
  "charts/treemap.tsx": "data-display",
  "charts/radar-chart.tsx": "data-display",
  "charts/funnel-chart.tsx": "data-display",
  "charts/scatter-chart.tsx": "data-display",
  "charts/waterfall-chart.tsx": "data-display",
  
  // Feedback
  "alert.tsx": "feedback",
  "notification.tsx": "feedback",
  "actionable-notification.tsx": "feedback",
  "toaster.tsx": "feedback",
  "progress.tsx": "feedback",
  "loading.tsx": "feedback",
  "inline-loading.tsx": "feedback",
  "spinner.tsx": "feedback",
  "tooltip.tsx": "feedback",
  "definition-tooltip.tsx": "feedback",
  "toggle-tip.tsx": "feedback",
  
  // Navigation
  "tabs.tsx": "navigation",
  "breadcrumb.tsx": "navigation",
  "pagination.tsx": "navigation",
  "menubar.tsx": "navigation",
  "navigation-menu.tsx": "navigation",
  "dropdown-menu.tsx": "navigation",
  "context-menu.tsx": "navigation",
  "command.tsx": "navigation",
  "side-nav.tsx": "navigation",
  "sidebar.tsx": "navigation",
  "ui-shell-header.tsx": "navigation",
  "content-switcher.tsx": "navigation",
  "overflow-menu.tsx": "navigation",
  "link.tsx": "navigation",
  
  // Layout
  "separator.tsx": "layout",
  "resizable.tsx": "layout",
  "scroll-area.tsx": "layout",
  "layer.tsx": "layout",
  
  // Overlays
  "dialog.tsx": "overlays",
  "modal.tsx": "overlays",
  "drawer.tsx": "overlays",
  "sheet.tsx": "overlays",
  "popover.tsx": "overlays",
  "tearsheet.tsx": "overlays",
  
  // Typography
  "kbd.tsx": "typography",
}

// Get category for a component file
export function getComponentCategory(filename: string): ComponentCategory {
  return COMPONENT_CATEGORIES[filename] || "data-display"
}

// Get category info by ID
export function getCategoryInfo(id: ComponentCategory): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.id === id)
}

