import { useState, useRef, useMemo } from "react"
import { 
  ChevronDown, Settings, Plus, 
  Search as SearchIcon, Bell, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Copy, Trash2, Edit, Share2, Home, BarChart2, FileText, Users, HelpCircle,
  // Category icons
  Zap, FormInput, Compass, BarChart3, MessageSquare, 
  Layers, LayoutGrid, Type, Palette, LucideIcon
} from "lucide-react"

// ============ ORIGIN ICONS ============
// Carbon Design System icon - stylized "C" mark
function CarbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      className={`w-4 h-4 ${className}`}
      fill="currentColor"
      aria-label="Carbon Design System"
    >
      <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
      <path d="M8 5C6.3 5 5 6.3 5 8h2c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1H7v2h1c1.7 0 3-1.3 3-3s-1.3-3-3-3z"/>
    </svg>
  )
}

// shadcn/ui icon - stylized "S" mark
function ShadcnIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      className={`w-4 h-4 ${className}`}
      fill="currentColor"
      aria-label="shadcn/ui"
    >
      <path d="M8 1L1 5v6l7 4 7-4V5L8 1zm0 2.2l4.5 2.6L8 8.4 3.5 5.8 8 3.2zM3 6.9l4 2.3v4.5l-4-2.3V6.9zm6 6.8V9.2l4-2.3v4.5l-4 2.3z"/>
    </svg>
  )
}

// CarbonCN icon - "CC" mark
function CarbonCNIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 20 16" 
      className={`w-5 h-4 ${className}`}
      fill="currentColor"
      aria-label="CarbonCN Original"
    >
      <text x="0" y="12" fontSize="11" fontWeight="700" fontFamily="IBM Plex Sans, sans-serif">CC</text>
    </svg>
  )
}

// Origin type
type ComponentOrigin = "carbon" | "shadcn" | "carboncn"

// Origin badge colors and icons
const originConfig: Record<ComponentOrigin, { icon: React.FC<{ className?: string }>; color: string; label: string }> = {
  carbon: { icon: CarbonIcon, color: "text-carbon-blue-60", label: "Carbon" },
  shadcn: { icon: ShadcnIcon, color: "text-carbon-gray-60 dark:text-carbon-gray-40", label: "shadcn" },
  carboncn: { icon: CarbonCNIcon, color: "text-primary", label: "CarbonCN" },
}

// UI Components - Actions
import { Button } from "@/components/ui/button"
import { CopyButton, CopyText } from "@/components/ui/copy-button"
import { MenuButton, SplitMenuButton } from "@/components/ui/menu-button"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// UI Components - Forms
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search } from "@/components/ui/search"
import { NumberInput } from "@/components/ui/number-input"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { FileUploader } from "@/components/ui/file-uploader"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { InputGroup, InputAddon, InputGroupInput, InputButton } from "@/components/ui/input-group"
import { MultiSelect } from "@/components/ui/multi-select"
import { Combobox } from "@/components/ui/combobox"
import { TextArea } from "@/components/ui/text-area"
import { FluidForm, FluidFormGroup, FluidTextInput } from "@/components/ui/fluid-form"

// UI Components - Navigation
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link } from "@/components/ui/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ContentSwitcher } from "@/components/ui/content-switcher"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem, SideNavDivider } from "@/components/ui/side-nav"
import { HeaderName, HeaderNavigation, HeaderMenuItem, HeaderGlobalBar, HeaderGlobalAction, HeaderMenuButton } from "@/components/ui/ui-shell-header"

// UI Components - Data Display
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTable, DataTableToolbar, DataTableSearch, DataTableContainer, DataTableContent, DataTableHeader, DataTableBody, DataTableHeaderRow, DataTableRow, DataTableHeaderCell, DataTableCell, DataTablePagination } from "@/components/ui/data-table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tile, ClickableTile, SelectableTile } from "@/components/ui/tile"
import { Avatar, AvatarGroup, AvatarWithStatus } from "@/components/ui/avatar"
import { Tag } from "@/components/ui/tag"
import { OrderedList, UnorderedList, ListItem } from "@/components/ui/list"
import { StructuredList, StructuredListBody, StructuredListCell, StructuredListHead, StructuredListRow } from "@/components/ui/structured-list"
import { TreeView, type TreeNode } from "@/components/ui/tree-view"
import { CodeSnippet } from "@/components/ui/code-snippet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Kbd, KeyboardShortcut } from "@/components/ui/kbd"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// UI Components - Feedback
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Notification } from "@/components/ui/notification"
import { ActionableNotification } from "@/components/ui/actionable-notification"
import { useToast } from "@/components/ui/toaster"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { Loading } from "@/components/ui/loading"
import { Skeleton } from "@/components/ui/skeleton"
import { InlineLoading } from "@/components/ui/inline-loading"

// UI Components - Overlay
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogBody, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDescription, ModalTrigger } from "@/components/ui/modal"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ToggleTip, ToggleTipContent, ToggleTipTrigger } from "@/components/ui/toggle-tip"
import { DefinitionTooltip, DefinitionTooltipTrigger, DefinitionTooltipContent } from "@/components/ui/definition-tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from "@/components/ui/context-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OverflowMenu, OverflowMenuContent, OverflowMenuItem, OverflowMenuTrigger, OverflowMenuSeparator } from "@/components/ui/overflow-menu"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Tearsheet, TearsheetContent, TearsheetHeader, TearsheetTitle, TearsheetBody, TearsheetFooter, TearsheetTrigger } from "@/components/ui/tearsheet"

// UI Components - Layout
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Layer } from "@/components/ui/layer"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

// UI Components - Charts (Enterprise Suite)
import { chartColors } from "@/components/ui/charts"
import { CarbonBarChart, StackedBarChart, HorizontalBarChart } from "@/components/ui/charts/bar-chart"
import { CarbonLineChart, StepLineChart } from "@/components/ui/charts/line-chart"
import { CarbonAreaChart, StackedAreaChart } from "@/components/ui/charts/area-chart"
import { CarbonPieChart, CarbonDonutChart } from "@/components/ui/charts/pie-chart"
import { PercentageGauge } from "@/components/ui/charts/gauge-chart"
import { Sparkline, AreaSparkline, BarSparkline } from "@/components/ui/charts/sparkline"
import { CarbonComboChart } from "@/components/ui/charts/combo-chart"
import { CarbonHeatmap } from "@/components/ui/charts/heatmap"
import { CarbonTreemap } from "@/components/ui/charts/treemap"
import { CarbonRadarChart } from "@/components/ui/charts/radar-chart"
import { CarbonFunnelChart } from "@/components/ui/charts/funnel-chart"
import { CarbonScatterChart } from "@/components/ui/charts/scatter-chart"
import { CarbonWaterfallChart } from "@/components/ui/charts/waterfall-chart"

// UI Components - Form Layout
import { FormGroup, FormItem, FormLabel, FormHelperText, FormRow } from "@/components/ui/form"

// Categories for component organization
const CATEGORIES: { id: string; name: string; icon: LucideIcon }[] = [
  { id: "actions", name: "Actions", icon: Zap },
  { id: "forms", name: "Forms", icon: FormInput },
  { id: "navigation", name: "Navigation", icon: Compass },
  { id: "data-display", name: "Data Display", icon: BarChart3 },
  { id: "feedback", name: "Feedback", icon: MessageSquare },
  { id: "overlay", name: "Overlay", icon: Layers },
  { id: "layout", name: "Layout", icon: LayoutGrid },
  { id: "typography", name: "Typography", icon: Type },
  { id: "colors", name: "Colors", icon: Palette },
]

// All components with their names, component IDs, section IDs, and keywords for search
const COMPONENTS: { name: string; id: string; section: string; keywords?: string[] }[] = [
  // Actions
  { name: "Button Variants", id: "comp-button-variants", section: "actions", keywords: ["primary", "secondary", "ghost", "danger"] },
  { name: "Button Sizes", id: "comp-button-sizes", section: "actions", keywords: ["small", "medium", "large", "icon"] },
  { name: "Icon Button", id: "comp-icon-button", section: "actions", keywords: ["icon", "action"] },
  { name: "Button Group", id: "comp-button-group", section: "actions", keywords: ["group", "toolbar"] },
  { name: "Content Switcher", id: "comp-content-switcher", section: "actions", keywords: ["tabs", "toggle", "switch"] },
  { name: "Toggle", id: "comp-toggle", section: "actions", keywords: ["press", "switch"] },
  { name: "Toggle Group", id: "comp-toggle-group", section: "actions", keywords: ["toolbar", "format"] },
  { name: "Copy Button", id: "comp-copy-button", section: "actions", keywords: ["clipboard", "copy"] },
  // Forms
  { name: "Input", id: "comp-input", section: "forms", keywords: ["text", "field", "form"] },
  { name: "Input Group", id: "comp-input-group", section: "forms", keywords: ["addon", "prefix", "suffix"] },
  { name: "Search", id: "comp-search", section: "forms", keywords: ["find", "filter"] },
  { name: "Number Input", id: "comp-number-input", section: "forms", keywords: ["numeric", "stepper"] },
  { name: "TextArea", id: "comp-textarea", section: "forms", keywords: ["multiline", "textarea"] },
  { name: "Select", id: "comp-select", section: "forms", keywords: ["dropdown", "picker"] },
  { name: "Multi Select", id: "comp-multi-select", section: "forms", keywords: ["multiple", "tags"] },
  { name: "Combobox", id: "comp-combobox", section: "forms", keywords: ["autocomplete", "search"] },
  { name: "Checkbox", id: "comp-checkbox", section: "forms", keywords: ["check", "tick"] },
  { name: "Radio", id: "comp-radio", section: "forms", keywords: ["option", "choice"] },
  { name: "Switch", id: "comp-switch", section: "forms", keywords: ["toggle", "on/off"] },
  { name: "Slider", id: "comp-slider", section: "forms", keywords: ["range", "value"] },
  { name: "Date Picker", id: "comp-date-picker", section: "forms", keywords: ["calendar", "date"] },
  { name: "Time Picker", id: "comp-time-picker", section: "forms", keywords: ["clock", "time"] },
  { name: "File Uploader", id: "comp-file-uploader", section: "forms", keywords: ["upload", "file", "drag"] },
  { name: "Input OTP", id: "comp-input-otp", section: "forms", keywords: ["code", "verification"] },
  { name: "Form Layout", id: "comp-form-layout", section: "forms", keywords: ["layout", "group"] },
  { name: "Fluid Form", id: "comp-fluid-form", section: "forms", keywords: ["fluid", "inline"] },
  // Navigation
  { name: "Breadcrumb", id: "comp-breadcrumb", section: "navigation", keywords: ["path", "trail"] },
  { name: "Links", id: "comp-links", section: "navigation", keywords: ["anchor", "href"] },
  { name: "Tabs", id: "comp-tabs", section: "navigation", keywords: ["panel", "switch"] },
  { name: "Pagination", id: "comp-pagination", section: "navigation", keywords: ["page", "next", "prev"] },
  { name: "Menubar", id: "comp-menubar", section: "navigation", keywords: ["menu", "bar"] },
  { name: "Navigation Menu", id: "comp-navigation-menu", section: "navigation", keywords: ["nav", "dropdown"] },
  { name: "Side Nav", id: "comp-side-nav", section: "navigation", keywords: ["sidebar", "navigation"] },
  { name: "UI Shell Header", id: "comp-ui-shell-header", section: "navigation", keywords: ["header", "shell", "topbar"] },
  // Data Display
  { name: "Table", id: "comp-table", section: "data-display", keywords: ["grid", "rows", "columns"] },
  { name: "Data Table", id: "comp-data-table", section: "data-display", keywords: ["grid", "sort", "filter"] },
  { name: "Card", id: "comp-card", section: "data-display", keywords: ["container", "box"] },
  { name: "Tile", id: "comp-tile", section: "data-display", keywords: ["clickable", "selectable"] },
  { name: "Avatar", id: "comp-avatar", section: "data-display", keywords: ["user", "image", "profile"] },
  { name: "Tag", id: "comp-tag", section: "data-display", keywords: ["label", "badge", "chip"] },
  { name: "Badge", id: "comp-badge", section: "data-display", keywords: ["count", "notification"] },
  { name: "List", id: "comp-list", section: "data-display", keywords: ["ordered", "unordered", "items"] },
  { name: "Tree View", id: "comp-tree-view", section: "data-display", keywords: ["hierarchy", "nested", "folder"] },
  { name: "Accordion", id: "comp-accordion", section: "data-display", keywords: ["collapse", "expand"] },
  { name: "Carousel", id: "comp-carousel", section: "data-display", keywords: ["slider", "gallery"] },
  { name: "Bar Chart", id: "comp-bar-chart", section: "data-display", keywords: ["graph", "bars", "grouped", "stacked"] },
  { name: "Line Chart", id: "comp-line-chart", section: "data-display", keywords: ["graph", "trend", "time series"] },
  { name: "Area Chart", id: "comp-area-chart", section: "data-display", keywords: ["graph", "filled", "stacked"] },
  { name: "Pie & Donut", id: "comp-pie-chart", section: "data-display", keywords: ["circle", "percentage", "proportion"] },
  { name: "Gauge Chart", id: "comp-gauge-chart", section: "data-display", keywords: ["meter", "kpi", "progress"] },
  { name: "Sparkline", id: "comp-sparkline", section: "data-display", keywords: ["mini", "inline", "trend"] },
  { name: "Combo Chart", id: "comp-combo-chart", section: "data-display", keywords: ["bar", "line", "mixed"] },
  { name: "Heatmap", id: "comp-heatmap", section: "data-display", keywords: ["matrix", "intensity", "calendar"] },
  { name: "Treemap", id: "comp-treemap", section: "data-display", keywords: ["hierarchy", "proportional", "nested"] },
  { name: "Radar Chart", id: "comp-radar-chart", section: "data-display", keywords: ["spider", "comparison", "multi-axis"] },
  { name: "Funnel Chart", id: "comp-funnel-chart", section: "data-display", keywords: ["pipeline", "conversion", "sales"] },
  { name: "Scatter Chart", id: "comp-scatter-chart", section: "data-display", keywords: ["correlation", "dots", "bubble"] },
  { name: "Waterfall Chart", id: "comp-waterfall-chart", section: "data-display", keywords: ["cumulative", "financial", "bridge"] },
  // Feedback
  { name: "Inline Notification", id: "comp-inline-notification", section: "feedback", keywords: ["alert", "message"] },
  { name: "Toast Notification", id: "comp-toast-notification", section: "feedback", keywords: ["snackbar", "popup"] },
  { name: "Progress Bar", id: "comp-progress-bar", section: "feedback", keywords: ["loading", "percentage"] },
  { name: "Progress Circle", id: "comp-progress-circle", section: "feedback", keywords: ["circular", "loading"] },
  { name: "Loading Spinner", id: "comp-loading-spinner", section: "feedback", keywords: ["spinner", "wait"] },
  { name: "Skeleton", id: "comp-skeleton", section: "feedback", keywords: ["placeholder", "loading"] },
  // Overlay
  { name: "Dialog", id: "comp-dialog", section: "overlay", keywords: ["modal", "popup"] },
  { name: "Alert Dialog", id: "comp-alert-dialog", section: "overlay", keywords: ["confirm", "warning"] },
  { name: "Dropdown Menu", id: "comp-dropdown-menu", section: "overlay", keywords: ["context", "menu"] },
  { name: "Context Menu", id: "comp-context-menu", section: "overlay", keywords: ["right-click", "menu"] },
  { name: "Tooltip", id: "comp-tooltip", section: "overlay", keywords: ["hover", "hint"] },
  { name: "Popover", id: "comp-popover", section: "overlay", keywords: ["popup", "floating"] },
  { name: "Hover Card", id: "comp-hover-card", section: "overlay", keywords: ["preview", "hover"] },
  { name: "Command", id: "comp-command", section: "overlay", keywords: ["palette", "search", "cmdk"] },
  // Layout
  { name: "Aspect Ratio", id: "comp-aspect-ratio", section: "layout", keywords: ["ratio", "responsive"] },
  { name: "Separator", id: "comp-separator", section: "layout", keywords: ["divider", "line"] },
  { name: "Scroll Area", id: "comp-scroll-area", section: "layout", keywords: ["scrollbar", "overflow"] },
  { name: "Resizable", id: "comp-resizable", section: "layout", keywords: ["resize", "split"] },
  { name: "Layer", id: "comp-layer", section: "layout", keywords: ["stack", "z-index"] },
  { name: "Collapsible", id: "comp-collapsible", section: "layout", keywords: ["collapse", "expand"] },
  // Typography
  { name: "Heading", id: "comp-heading", section: "typography", keywords: ["h1", "h2", "h3", "title"] },
  { name: "Body", id: "comp-body", section: "typography", keywords: ["paragraph", "text"] },
  { name: "Label", id: "comp-label", section: "typography", keywords: ["form", "field"] },
  { name: "Helper Text", id: "comp-helper-text", section: "typography", keywords: ["hint", "description"] },
  { name: "Code", id: "comp-code", section: "typography", keywords: ["mono", "syntax"] },
  // Colors
  { name: "Gray Scale", id: "comp-gray-scale", section: "colors", keywords: ["neutral", "gray"] },
  { name: "Theme Colors", id: "comp-theme-colors", section: "colors", keywords: ["primary", "accent"] },
  { name: "Alert Colors", id: "comp-alert-colors", section: "colors", keywords: ["success", "warning", "error"] },
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-carbon-10 scroll-mt-20">
      <h2 className="text-2xl font-normal mb-carbon-06 pb-carbon-03 border-b border-carbon-gray-20 dark:border-carbon-gray-70">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ComponentGroup({ id, title, origin, children }: { id?: string; title: string; origin?: ComponentOrigin; children: React.ReactNode }) {
  const config = origin ? originConfig[origin] : null
  const OriginIcon = config?.icon
  
  return (
    <div id={id} className="mb-carbon-07 scroll-mt-40">
      <h3 className="flex items-center gap-carbon-02 text-sm font-semibold text-carbon-gray-70 dark:text-carbon-gray-30 mb-carbon-04 uppercase tracking-wider">
        {title}
        {OriginIcon && config && (
          <span className={`${config.color}`} title={config.label}>
            <OriginIcon />
          </span>
        )}
      </h3>
      {children}
    </div>
  )
}

export function ShowcasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sliderValue, setSliderValue] = useState([50])
  const [progress, setProgress] = useState(45)
  const [showNotifications, setShowNotifications] = useState(true)
  const [contentSwitcherValue, setContentSwitcherValue] = useState("first")
  const [searchValue, setSearchValue] = useState("")
  const [numberValue, setNumberValue] = useState(5)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState("")
  const [treeSelectedId, setTreeSelectedId] = useState<string | undefined>()
  const [selectedTile, setSelectedTile] = useState(false)
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([])
  const [comboboxValue, setComboboxValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [dataTablePage, setDataTablePage] = useState(1)
  const [togglePressed, setTogglePressed] = useState(false)
  const [textAlignment, setTextAlignment] = useState("left")
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  
  const { addToast } = useToast()
  const mainRef = useRef<HTMLElement>(null)

  const treeData: TreeNode[] = [
    {
      id: "1",
      label: "Documents",
      children: [
        { id: "1-1", label: "Reports", children: [
          { id: "1-1-1", label: "Q1 Report.pdf" },
          { id: "1-1-2", label: "Q2 Report.pdf" },
        ]},
        { id: "1-2", label: "Presentations" },
      ],
    },
    {
      id: "2",
      label: "Images",
      children: [
        { id: "2-1", label: "photo1.jpg" },
        { id: "2-2", label: "photo2.png" },
      ],
    },
  ]

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    if (!searchQuery) return []
    const query = searchQuery.toLowerCase()
    return COMPONENTS.filter(comp => 
      comp.name.toLowerCase().includes(query) ||
      comp.section.includes(query) ||
      comp.keywords?.some(kw => kw.toLowerCase().includes(query))
    ).slice(0, 8) // Limit to 8 results for cleaner UI
  }, [searchQuery])

  // Get category info for a component
  const getCategoryForSection = (sectionId: string) => {
    return CATEGORIES.find(cat => cat.id === sectionId)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Search & Category Navigation */}
      <div className="sticky top-14 z-40 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-carbon-05 py-carbon-04">
          {/* Search with Results Dropdown */}
          <div className="relative mb-carbon-04">
            <Search
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              className="max-w-md"
            />
            {/* Search Results Dropdown */}
            {searchQuery && filteredComponents.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full max-w-md bg-background border border-border shadow-lg z-50 rounded-sm">
                {filteredComponents.map((comp) => {
                  const category = getCategoryForSection(comp.section)
                  const CategoryIcon = category?.icon
                  return (
                    <button
                      key={comp.id}
                      onClick={() => {
                        scrollToSection(comp.id)
                        setSearchQuery("")
                      }}
                      className="w-full flex items-center gap-carbon-03 px-carbon-04 py-carbon-03 text-left hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80 transition-colors border-b border-border last:border-b-0"
                    >
                      {CategoryIcon && <CategoryIcon className="h-4 w-4 text-muted-foreground shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{comp.name}</div>
                        <div className="text-xs text-muted-foreground">{category?.name}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
            {searchQuery && filteredComponents.length === 0 && (
              <div className="absolute top-full left-0 mt-1 w-full max-w-md bg-background border border-border shadow-lg z-50 rounded-sm p-carbon-04 text-sm text-muted-foreground">
                No components found for "{searchQuery}"
              </div>
            )}
          </div>
          
          {/* Category Pills - Always visible */}
          <div className="flex flex-wrap gap-carbon-02">
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className="inline-flex items-center gap-carbon-02 px-carbon-04 py-carbon-02 text-sm bg-carbon-gray-10 dark:bg-carbon-gray-80 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary transition-colors"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main ref={mainRef} className="max-w-7xl mx-auto px-carbon-05 py-carbon-07">
        {/* Intro */}
        <div className="mb-carbon-10">
          <h1 className="mb-carbon-03">Component Showcase</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-carbon-06">
            All CarbonCN components organized by category. Click a category above or scroll to explore.
          </p>
          
          {/* Origin Legend */}
          <div className="flex flex-wrap gap-carbon-06 p-carbon-04 bg-carbon-gray-10 dark:bg-carbon-gray-90 border border-carbon-gray-20 dark:border-carbon-gray-70">
            <div className="flex items-center gap-carbon-02">
              <CarbonIcon className="text-carbon-blue-60" />
              <span className="text-sm font-medium">Carbon</span>
              <span className="text-xs text-muted-foreground">IBM Carbon Design System</span>
            </div>
            <div className="flex items-center gap-carbon-02">
              <ShadcnIcon className="text-carbon-gray-60 dark:text-carbon-gray-40" />
              <span className="text-sm font-medium">shadcn</span>
              <span className="text-xs text-muted-foreground">shadcn/ui Component</span>
            </div>
            <div className="flex items-center gap-carbon-02">
              <CarbonCNIcon className="text-primary" />
              <span className="text-sm font-medium">CarbonCN</span>
              <span className="text-xs text-muted-foreground">Original / Hybrid</span>
            </div>
          </div>
        </div>

        {/* ==================== ACTIONS ==================== */}
        <Section id="actions" title="Actions">
          <ComponentGroup id="comp-button-variants" title="Button Variants" origin="carbon">
            <div className="flex flex-wrap gap-carbon-03 mb-carbon-05">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="danger-tertiary">Danger Tertiary</Button>
              <Button variant="danger-ghost">Danger Ghost</Button>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-button-sizes" title="Button Sizes" origin="carbon">
            <div className="flex flex-wrap items-end gap-carbon-03 mb-carbon-05">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
              <Button size="2xl">2XL</Button>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-icon-button" title="Buttons with Icons" origin="carbon">
            <div className="flex flex-wrap gap-carbon-03 mb-carbon-04">
              <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
              <Button variant="secondary"><Settings className="mr-2 h-4 w-4" /> Settings</Button>
              <Button size="field-lg">Next <ChevronDown className="ml-2 h-4 w-4 -rotate-90" /></Button>
            </div>
          </ComponentGroup>

          <ComponentGroup title="Icon Only Buttons" origin="carbon">
            <div className="flex flex-wrap items-center gap-carbon-03 mb-carbon-05">
              <Button variant="primary" size="icon-sm"><Plus className="h-4 w-4" /></Button>
              <Button variant="primary" size="icon-md"><Plus className="h-5 w-5" /></Button>
              <Button variant="primary" size="icon-lg"><Plus className="h-5 w-5" /></Button>
              <Button variant="secondary" size="icon-lg"><Settings className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon-lg"><Bell className="h-5 w-5" /></Button>
              <Button variant="danger" size="icon-lg"><Trash2 className="h-5 w-5" /></Button>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-copy-button" title="Copy Button" origin="carboncn">
            <div className="flex items-center gap-carbon-05">
              <CopyButton value="npm install @carboncn/ui" />
              <CopyText value="Copy this text">Click to copy this text</CopyText>
            </div>
          </ComponentGroup>

          <ComponentGroup title="Menu Button" origin="carboncn">
            <div className="flex flex-wrap gap-carbon-03">
              <MenuButton
                label="Actions"
                items={[
                  { label: "Edit", icon: <Edit className="h-4 w-4" /> },
                  { label: "Duplicate", icon: <Copy className="h-4 w-4" /> },
                  { label: "Share", icon: <Share2 className="h-4 w-4" /> },
                  { divider: true, label: "" },
                  { label: "Delete", danger: true, icon: <Trash2 className="h-4 w-4" /> },
                ]}
              />
              <SplitMenuButton
                label="Save"
                onClick={() => addToast({ title: "Saved", description: "Changes saved successfully" })}
                items={[
                  { label: "Save as draft" },
                  { label: "Save and publish" },
                  { label: "Save as template" },
                ]}
              />
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-toggle" title="Toggle" origin="shadcn">
            <div className="flex flex-wrap gap-carbon-03">
              <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>
                {togglePressed ? "On" : "Off"}
              </Toggle>
              <Toggle variant="outline"><Bold className="h-4 w-4" /></Toggle>
              <Toggle variant="outline"><Italic className="h-4 w-4" /></Toggle>
              <Toggle variant="outline"><Underline className="h-4 w-4" /></Toggle>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-toggle-group" title="Toggle Group" origin="shadcn">
            <ToggleGroup type="single" value={textAlignment} onValueChange={(v) => v && setTextAlignment(v)}>
              <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </ComponentGroup>
        </Section>

        {/* ==================== FORMS ==================== */}
        <Section id="forms" title="Forms">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-carbon-07">
            <ComponentGroup id="comp-input" title="Text Input" origin="carbon">
              <div className="space-y-carbon-05">
                <div>
                  <Label htmlFor="default-input">Label</Label>
                  <Input id="default-input" placeholder="Placeholder text" className="mt-carbon-02" />
                  <p className="helper-text-01 text-carbon-gray-60 mt-carbon-02">Helper text</p>
                </div>
                <div>
                  <Label htmlFor="error-input">With Error</Label>
                  <Input id="error-input" error placeholder="Invalid input" className="mt-carbon-02" />
                  <p className="helper-text-01 text-carbon-red-60 mt-carbon-02">Error message</p>
                </div>
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-input-group" title="Input Group" origin="carboncn">
              <div className="space-y-carbon-04">
                <InputGroup>
                  <InputAddon position="left">https://</InputAddon>
                  <InputGroupInput placeholder="example.com" />
                </InputGroup>
                <InputGroup>
                  <InputGroupInput placeholder="Search..." />
                  <InputButton><SearchIcon className="h-4 w-4" /></InputButton>
                </InputGroup>
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-search" title="Search" origin="carbon">
              <Search
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue("")}
              />
            </ComponentGroup>

            <ComponentGroup id="comp-number-input" title="Number Input" origin="carbon">
              <NumberInput value={numberValue} onChange={setNumberValue} min={0} max={100} />
            </ComponentGroup>

            <ComponentGroup id="comp-date-picker" title="Date Picker" origin="carbon">
              <DatePicker value={selectedDate} onChange={setSelectedDate} placeholder="Select a date" />
            </ComponentGroup>

            <ComponentGroup id="comp-time-picker" title="Time Picker" origin="carbon">
              <TimePicker value={selectedTime} onChange={setSelectedTime} label="Select time" />
            </ComponentGroup>

            <ComponentGroup id="comp-select" title="Select" origin="shadcn">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </ComponentGroup>

            <ComponentGroup id="comp-multi-select" title="Multi-Select" origin="carbon">
              <MultiSelect
                placeholder="Choose items..."
                options={[
                  { value: "opt1", label: "Option 1" },
                  { value: "opt2", label: "Option 2" },
                  { value: "opt3", label: "Option 3" },
                ]}
                value={multiSelectValue}
                onChange={setMultiSelectValue}
                filterable
              />
            </ComponentGroup>

            <ComponentGroup id="comp-combobox" title="Combobox" origin="shadcn">
              <Combobox
                placeholder="Search frameworks..."
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue" },
                  { value: "angular", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                ]}
                value={comboboxValue}
                onChange={setComboboxValue}
              />
            </ComponentGroup>

            <ComponentGroup id="comp-checkbox" title="Checkbox" origin="shadcn">
              <div className="space-y-carbon-03">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">Accept terms</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" defaultChecked />
                  <Label htmlFor="newsletter" className="text-sm">Subscribe</Label>
                </div>
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-radio" title="Radio Group" origin="shadcn">
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1" className="text-sm">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2" className="text-sm">Option Two</Label>
                </div>
              </RadioGroup>
            </ComponentGroup>

            <ComponentGroup id="comp-switch" title="Switch" origin="shadcn">
              <div className="flex items-center justify-between max-w-xs">
                <Label className="text-sm">Enable notifications</Label>
                <Switch checked={showNotifications} onCheckedChange={setShowNotifications} />
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-slider" title="Slider" origin="shadcn">
              <div className="max-w-xs">
                <div className="flex justify-between mb-carbon-02">
                  <Label className="text-sm">Volume</Label>
                  <span className="text-sm text-muted-foreground">{sliderValue[0]}%</span>
                </div>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-textarea" title="Textarea" origin="carbon">
              <TextArea
                label="Description"
                placeholder="Enter description..."
                helperText="Maximum 500 characters"
                enableCounter
                maxCount={500}
              />
            </ComponentGroup>

            <ComponentGroup id="comp-input-otp" title="Input OTP" origin="shadcn">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </ComponentGroup>
          </div>

          <div className="mt-carbon-07">
            <ComponentGroup id="comp-file-uploader" title="File Uploader" origin="carbon">
              <FileUploader
                accept="image/*,.pdf"
                multiple
                maxSize={5 * 1024 * 1024}
                onUpload={(files) => console.log("Uploading:", files)}
                className="max-w-md"
              />
            </ComponentGroup>
          </div>

          <div className="mt-carbon-07">
            <ComponentGroup id="comp-form-layout" title="Form Layout Pattern" origin="carboncn">
              <Card className="max-w-xl">
                <CardContent className="pt-carbon-05">
                  <FormGroup legendText="User Information">
                    <FormRow>
                      <FormItem>
                        <FormLabel required>First name</FormLabel>
                        <Input placeholder="John" />
                      </FormItem>
                      <FormItem>
                        <FormLabel required>Last name</FormLabel>
                        <Input placeholder="Doe" />
                      </FormItem>
                    </FormRow>
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <Input type="email" placeholder="john.doe@example.com" />
                      <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormItem>
                  </FormGroup>
                </CardContent>
              </Card>
            </ComponentGroup>
          </div>

          <div className="mt-carbon-07">
            <ComponentGroup id="comp-fluid-form" title="Fluid Form" origin="carbon">
              <FluidForm className="max-w-xl">
                <FluidFormGroup>
                  <FluidTextInput label="First name" placeholder="John" />
                  <FluidTextInput label="Last name" placeholder="Doe" />
                </FluidFormGroup>
              </FluidForm>
            </ComponentGroup>
          </div>
        </Section>

        {/* ==================== NAVIGATION ==================== */}
        <Section id="navigation" title="Navigation">
          <ComponentGroup id="comp-breadcrumb" title="Breadcrumb" origin="shadcn">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="javascript:void(0)">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="javascript:void(0)">Components</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Showcase</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ComponentGroup>

          <ComponentGroup id="comp-links" title="Links" origin="carbon">
            <div className="flex flex-wrap gap-carbon-05">
              <Link href="javascript:void(0)">Standard link</Link>
              <Link href="javascript:void(0)" variant="inline">Inline link</Link>
              <Link href="https://carbondesignsystem.com" external>External link</Link>
              <Link href="javascript:void(0)" disabled>Disabled link</Link>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-tabs" title="Tabs" origin="shadcn">
            <Tabs defaultValue="tab1" className="max-w-md">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><p className="p-4">Overview content</p></TabsContent>
              <TabsContent value="tab2"><p className="p-4">Analytics content</p></TabsContent>
              <TabsContent value="tab3"><p className="p-4">Settings content</p></TabsContent>
            </Tabs>
          </ComponentGroup>

          <ComponentGroup title="Contained Tabs" origin="carbon">
            <Tabs defaultValue="tab1" className="max-w-md">
              <TabsList variant="contained">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><p className="p-4 bg-card">Content 1</p></TabsContent>
              <TabsContent value="tab2"><p className="p-4 bg-card">Content 2</p></TabsContent>
              <TabsContent value="tab3"><p className="p-4 bg-card">Content 3</p></TabsContent>
            </Tabs>
          </ComponentGroup>

          <ComponentGroup id="comp-content-switcher" title="Content Switcher" origin="carbon">
            <ContentSwitcher
              options={[
                { value: "first", label: "First" },
                { value: "second", label: "Second" },
                { value: "third", label: "Third" },
              ]}
              value={contentSwitcherValue}
              onChange={setContentSwitcherValue}
            />
          </ComponentGroup>

          <ComponentGroup id="comp-pagination" title="Pagination" origin="shadcn">
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="javascript:void(0)" /></PaginationItem>
                <PaginationItem><PaginationLink href="javascript:void(0)" isActive>1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="javascript:void(0)">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="javascript:void(0)">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="javascript:void(0)" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentGroup>

          <ComponentGroup id="comp-menubar" title="Menubar" origin="shadcn">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
                  <MenubarItem>New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                  <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Cut</MenubarItem>
                  <MenubarItem>Copy</MenubarItem>
                  <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Zoom In</MenubarItem>
                  <MenubarItem>Zoom Out</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Toggle Fullscreen</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </ComponentGroup>

          <ComponentGroup id="comp-navigation-menu" title="Navigation Menu" origin="shadcn">
            <div className="relative z-20 mb-carbon-07">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px]">
                        <NavigationMenuLink href="javascript:void(0)" className="block p-3 hover:bg-accent rounded-sm">
                          <div className="font-medium mb-1">Introduction</div>
                          <p className="text-sm text-muted-foreground">Learn about CarbonCN components.</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink href="javascript:void(0)" className="block p-3 hover:bg-accent rounded-sm">
                          <div className="font-medium mb-1">Installation</div>
                          <p className="text-sm text-muted-foreground">How to install and set up.</p>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px]">
                        <NavigationMenuLink href="javascript:void(0)" className="block p-3 hover:bg-accent rounded-sm">
                          <div className="font-medium mb-1">Button</div>
                          <p className="text-sm text-muted-foreground">Interactive button component.</p>
                        </NavigationMenuLink>
                        <NavigationMenuLink href="javascript:void(0)" className="block p-3 hover:bg-accent rounded-sm">
                          <div className="font-medium mb-1">Dialog</div>
                          <p className="text-sm text-muted-foreground">Modal dialog windows.</p>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-side-nav" title="Side Nav" origin="carbon">
            <div className="border border-border h-72 flex max-w-lg overflow-hidden rounded-sm">
              <div className="w-64 h-full overflow-y-auto bg-carbon-gray-90">
                <SideNav expanded={true} className="!static w-full h-auto">
                  <SideNavItems>
                    <SideNavLink href="javascript:void(0)" isActive icon={<Home className="w-4 h-4" />}>Dashboard</SideNavLink>
                    <SideNavLink href="javascript:void(0)" icon={<BarChart2 className="w-4 h-4" />}>Analytics</SideNavLink>
                    <SideNavMenu title="Reports" icon={<FileText className="w-4 h-4" />}>
                      <SideNavMenuItem href="javascript:void(0)">Daily</SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">Weekly</SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">Monthly</SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavDivider />
                    <SideNavLink href="javascript:void(0)" icon={<Settings className="w-4 h-4" />}>Settings</SideNavLink>
                    <SideNavLink href="javascript:void(0)" icon={<HelpCircle className="w-4 h-4" />}>Help</SideNavLink>
                  </SideNavItems>
                </SideNav>
              </div>
              <div className="flex-1 p-4 bg-muted/30 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Main content area</p>
              </div>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-ui-shell-header" title="UI Shell Header" origin="carbon">
            <div className="border border-border overflow-hidden rounded-sm">
              <header className="relative h-12 bg-carbon-gray-100 text-white flex items-center">
                <HeaderMenuButton onClick={() => {}} />
                <HeaderName href="javascript:void(0)" prefix="">CarbonCN</HeaderName>
                <HeaderNavigation>
                  <HeaderMenuItem><a href="javascript:void(0)">Components</a></HeaderMenuItem>
                  <HeaderMenuItem><a href="javascript:void(0)">Docs</a></HeaderMenuItem>
                  <HeaderMenuItem><a href="javascript:void(0)">GitHub</a></HeaderMenuItem>
                </HeaderNavigation>
                <HeaderGlobalBar>
                  <HeaderGlobalAction aria-label="Search"><SearchIcon className="w-5 h-5" /></HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="Notifications"><Bell className="w-5 h-5" /></HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="User"><Users className="w-5 h-5" /></HeaderGlobalAction>
                </HeaderGlobalBar>
              </header>
            </div>
          </ComponentGroup>
        </Section>

        {/* ==================== DATA DISPLAY ==================== */}
        <Section id="data-display" title="Data Display">
          <ComponentGroup id="comp-table" title="Table" origin="shadcn">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Alice Johnson</TableCell>
                    <TableCell><Tag variant="green" size="sm">Active</Tag></TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Smith</TableCell>
                    <TableCell><Tag variant="gray" size="sm">Inactive</Tag></TableCell>
                    <TableCell>Viewer</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </ComponentGroup>

          <ComponentGroup id="comp-data-table" title="Data Table" origin="carbon">
            <DataTable size="lg">
              <DataTableToolbar title="Users" description="Manage your team">
                <DataTableSearch placeholder="Search users..." />
                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add</Button>
              </DataTableToolbar>
              <DataTableContainer>
                <DataTableContent>
                  <DataTableHeader>
                    <DataTableHeaderRow>
                      <DataTableHeaderCell sortable sorted="asc">Name</DataTableHeaderCell>
                      <DataTableHeaderCell sortable>Email</DataTableHeaderCell>
                      <DataTableHeaderCell>Status</DataTableHeaderCell>
                    </DataTableHeaderRow>
                  </DataTableHeader>
                  <DataTableBody>
                    <DataTableRow>
                      <DataTableCell className="font-medium">Alice</DataTableCell>
                      <DataTableCell>alice@example.com</DataTableCell>
                      <DataTableCell><Tag variant="green" size="sm">Active</Tag></DataTableCell>
                    </DataTableRow>
                    <DataTableRow>
                      <DataTableCell className="font-medium">Bob</DataTableCell>
                      <DataTableCell>bob@example.com</DataTableCell>
                      <DataTableCell><Tag variant="gray" size="sm">Inactive</Tag></DataTableCell>
                    </DataTableRow>
                  </DataTableBody>
                </DataTableContent>
              </DataTableContainer>
              <DataTablePagination
                totalItems={50}
                pageSize={10}
                currentPage={dataTablePage}
                onPageChange={setDataTablePage}
              />
            </DataTable>
          </ComponentGroup>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-carbon-05 mt-carbon-07">
            <ComponentGroup id="comp-card" title="Cards" origin="shadcn">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="body-01">Card content area.</p>
                </CardContent>
                <CardFooter className="gap-carbon-03">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Submit</Button>
                </CardFooter>
              </Card>
            </ComponentGroup>

            <ComponentGroup id="comp-tile" title="Tiles" origin="carbon">
              <div className="space-y-carbon-03">
                <Tile>
                  <p className="text-sm">Read-only Tile</p>
                </Tile>
                <ClickableTile href="javascript:void(0)">
                  <p className="text-sm">Clickable Tile</p>
                </ClickableTile>
                <SelectableTile selected={selectedTile} onChange={() => setSelectedTile(!selectedTile)}>
                  <p className="text-sm">Selectable Tile</p>
                </SelectableTile>
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-avatar" title="Avatar" origin="shadcn">
              <div className="space-y-carbon-04">
                <div className="flex items-end gap-carbon-02">
                  <Avatar size="xs" initials="XS" />
                  <Avatar size="sm" initials="SM" />
                  <Avatar size="md" initials="MD" />
                  <Avatar size="lg" initials="LG" />
                  <Avatar size="xl" initials="XL" />
                </div>
                <div className="flex items-center gap-carbon-02">
                  <AvatarWithStatus src="https://i.pravatar.cc/150?img=1" status="online" />
                  <AvatarWithStatus src="https://i.pravatar.cc/150?img=2" status="away" />
                  <AvatarWithStatus src="https://i.pravatar.cc/150?img=3" status="busy" />
                </div>
                <AvatarGroup max={3}>
                  <Avatar src="https://i.pravatar.cc/150?img=10" />
                  <Avatar src="https://i.pravatar.cc/150?img=11" />
                  <Avatar src="https://i.pravatar.cc/150?img=12" />
                  <Avatar src="https://i.pravatar.cc/150?img=13" />
                  <Avatar src="https://i.pravatar.cc/150?img=14" />
                </AvatarGroup>
              </div>
            </ComponentGroup>
          </div>

          <ComponentGroup id="comp-tag" title="Tags" origin="carbon">
            <div className="flex flex-wrap gap-carbon-03">
              <Tag variant="gray">Gray</Tag>
              <Tag variant="blue">Blue</Tag>
              <Tag variant="green">Green</Tag>
              <Tag variant="red">Red</Tag>
              <Tag variant="purple">Purple</Tag>
              <Tag variant="teal">Teal</Tag>
              <Tag variant="yellow">Yellow</Tag>
              <Tag variant="blue" dismissible onDismiss={() => {}}>Dismissible</Tag>
            </div>
          </ComponentGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-carbon-07 mt-carbon-07">
            <ComponentGroup id="comp-list" title="Lists" origin="carbon">
              <div className="grid grid-cols-2 gap-carbon-05">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Ordered</p>
                  <OrderedList>
                    <ListItem>First item</ListItem>
                    <ListItem>Second item</ListItem>
                    <ListItem>Third item</ListItem>
                  </OrderedList>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Unordered</p>
                  <UnorderedList>
                    <ListItem>First item</ListItem>
                    <ListItem>Second item</ListItem>
                    <ListItem>Third item</ListItem>
                  </UnorderedList>
                </div>
              </div>
            </ComponentGroup>

            <ComponentGroup title="Structured List" origin="carbon">
              <StructuredList>
                <StructuredListHead>
                  <StructuredListRow>
                    <StructuredListCell head>Name</StructuredListCell>
                    <StructuredListCell head>Value</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  <StructuredListRow>
                    <StructuredListCell>Item 1</StructuredListCell>
                    <StructuredListCell>Value 1</StructuredListCell>
                  </StructuredListRow>
                  <StructuredListRow>
                    <StructuredListCell>Item 2</StructuredListCell>
                    <StructuredListCell>Value 2</StructuredListCell>
                  </StructuredListRow>
                </StructuredListBody>
              </StructuredList>
            </ComponentGroup>

            <ComponentGroup id="comp-tree-view" title="Tree View" origin="carbon">
              <div className="border border-border max-w-xs">
                <TreeView data={treeData} selectedId={treeSelectedId} onSelect={setTreeSelectedId} />
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-accordion" title="Accordion" origin="shadcn">
              <Accordion type="single" collapsible className="max-w-md">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Carbon?</AccordionTrigger>
                  <AccordionContent>Carbon is IBM's open source design system.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>Yes, all components follow WCAG 2.1 guidelines.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentGroup>
          </div>

          {/* ============ ENTERPRISE CHARTS SUITE ============ */}
          
          {/* Bar Charts */}
          <ComponentGroup id="comp-bar-chart" title="Bar Charts" origin="carboncn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-carbon-06">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Monthly Revenue</CardTitle>
                  <CardDescription>Grouped bar comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <CarbonBarChart
                    data={[
                      { month: "Jan", revenue: 186, target: 200 },
                      { month: "Feb", revenue: 205, target: 200 },
                      { month: "Mar", revenue: 237, target: 220 },
                      { month: "Apr", revenue: 173, target: 220 },
                      { month: "May", revenue: 209, target: 230 },
                      { month: "Jun", revenue: 264, target: 230 },
                    ]}
                    xKey="month"
                    yKeys={["revenue", "target"]}
                    height={250}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Quarterly Sales</CardTitle>
                  <CardDescription>Stacked bar chart</CardDescription>
                </CardHeader>
                <CardContent>
                  <StackedBarChart
                    data={[
                      { quarter: "Q1", product: 120, services: 80, support: 40 },
                      { quarter: "Q2", product: 150, services: 95, support: 55 },
                      { quarter: "Q3", product: 180, services: 110, support: 60 },
                      { quarter: "Q4", product: 200, services: 130, support: 70 },
                    ]}
                    xKey="quarter"
                    yKeys={["product", "services", "support"]}
                    height={250}
                    colors={[chartColors.blue, chartColors.cyan, chartColors.teal]}
                  />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Team Performance</CardTitle>
                  <CardDescription>Horizontal bar chart</CardDescription>
                </CardHeader>
                <CardContent>
                  <HorizontalBarChart
                    data={[
                      { team: "Engineering", score: 92 },
                      { team: "Design", score: 88 },
                      { team: "Marketing", score: 85 },
                      { team: "Sales", score: 78 },
                      { team: "Support", score: 95 },
                    ]}
                    xKey="team"
                    yKeys={["score"]}
                    height={200}
                    showLegend={false}
                  />
                </CardContent>
              </Card>
            </div>
          </ComponentGroup>

          {/* Line Charts */}
          <ComponentGroup id="comp-line-chart" title="Line Charts" origin="carboncn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-carbon-06">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">User Growth</CardTitle>
                  <CardDescription>Multi-line trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <CarbonLineChart
                    data={[
                      { week: "W1", users: 400, sessions: 240 },
                      { week: "W2", users: 300, sessions: 139 },
                      { week: "W3", users: 520, sessions: 380 },
                      { week: "W4", users: 478, sessions: 390 },
                      { week: "W5", users: 589, sessions: 480 },
                      { week: "W6", users: 639, sessions: 520 },
                    ]}
                    xKey="week"
                    yKeys={["users", "sessions"]}
                    height={250}
                    colors={[chartColors.purple, chartColors.teal]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Build Times</CardTitle>
                  <CardDescription>Step line chart</CardDescription>
                </CardHeader>
                <CardContent>
                  <StepLineChart
                    data={[
                      { version: "v1.0", time: 120 },
                      { version: "v1.1", time: 115 },
                      { version: "v1.2", time: 95 },
                      { version: "v2.0", time: 140 },
                      { version: "v2.1", time: 85 },
                      { version: "v2.2", time: 75 },
                    ]}
                    xKey="version"
                    yKeys={["time"]}
                    height={250}
                    colors={[chartColors.green]}
                    showLegend={false}
                  />
                </CardContent>
              </Card>
            </div>
          </ComponentGroup>

          {/* Area Charts */}
          <ComponentGroup id="comp-area-chart" title="Area Charts" origin="carboncn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-carbon-06">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">System Performance</CardTitle>
                  <CardDescription>CPU and Memory usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <CarbonAreaChart
                    data={[
                      { time: "00:00", cpu: 30, memory: 45 },
                      { time: "04:00", cpu: 25, memory: 42 },
                      { time: "08:00", cpu: 65, memory: 58 },
                      { time: "12:00", cpu: 78, memory: 72 },
                      { time: "16:00", cpu: 82, memory: 75 },
                      { time: "20:00", cpu: 45, memory: 52 },
                    ]}
                    xKey="time"
                    yKeys={["cpu", "memory"]}
                    height={250}
                    colors={[chartColors.blue, chartColors.teal]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Revenue Streams</CardTitle>
                  <CardDescription>Stacked area chart</CardDescription>
                </CardHeader>
                <CardContent>
                  <StackedAreaChart
                    data={[
                      { month: "Jan", subscriptions: 400, oneTime: 240, enterprise: 180 },
                      { month: "Feb", subscriptions: 450, oneTime: 220, enterprise: 200 },
                      { month: "Mar", subscriptions: 520, oneTime: 280, enterprise: 220 },
                      { month: "Apr", subscriptions: 580, oneTime: 260, enterprise: 250 },
                      { month: "May", subscriptions: 620, oneTime: 300, enterprise: 280 },
                      { month: "Jun", subscriptions: 700, oneTime: 320, enterprise: 310 },
                    ]}
                    xKey="month"
                    yKeys={["subscriptions", "oneTime", "enterprise"]}
                    height={250}
                    colors={[chartColors.blue, chartColors.cyan, chartColors.purple]}
                  />
                </CardContent>
              </Card>
            </div>
          </ComponentGroup>

          {/* Pie & Donut Charts */}
          <ComponentGroup id="comp-pie-chart" title="Pie & Donut Charts" origin="carboncn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-carbon-06">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Traffic Sources</CardTitle>
                  <CardDescription>Visitor distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <CarbonPieChart
                    data={[
                      { name: "Direct", value: 400 },
                      { name: "Organic", value: 300 },
                      { name: "Referral", value: 200 },
                      { name: "Social", value: 150 },
                    ]}
                    height={250}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Budget Allocation</CardTitle>
                  <CardDescription>Donut with center value</CardDescription>
                </CardHeader>
                <CardContent>
                  <CarbonDonutChart
                    data={[
                      { name: "Development", value: 45000 },
                      { name: "Marketing", value: 25000 },
                      { name: "Operations", value: 18000 },
                      { name: "Research", value: 12000 },
                    ]}
                    height={250}
                    centerValue="$100K"
                    centerLabel="Total Budget"
                  />
                </CardContent>
              </Card>
            </div>
          </ComponentGroup>

          {/* Gauge Charts */}
          <ComponentGroup id="comp-gauge-chart" title="Gauge Charts" origin="carboncn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-carbon-06">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">CPU Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <PercentageGauge
                    value={72}
                    label="Current Load"
                    height={180}
                    thresholds={[
                      { value: 80, color: chartColors.red },
                      { value: 60, color: chartColors.orange },
                      { value: 0, color: chartColors.green },
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Memory</CardTitle>
                </CardHeader>
                <CardContent>
                  <PercentageGauge
                    value={45}
                    label="Used"
                    height={180}
                    colors={{ value: chartColors.cyan }}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Disk Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <PercentageGauge
                    value={88}
                    label="Capacity"
                    height={180}
                    thresholds={[
                      { value: 90, color: chartColors.red },
                      { value: 70, color: chartColors.orange },
                      { value: 0, color: chartColors.blue },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </ComponentGroup>

          {/* Sparklines */}
          <ComponentGroup id="comp-sparkline" title="Sparklines" origin="carboncn">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-semibold">$48.2K</p>
                    </div>
                    <Sparkline 
                      data={[30, 40, 35, 50, 49, 60, 70, 91, 125]} 
                      showTrend 
                      color={chartColors.green}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="text-sm text-muted-foreground">Users</p>
                      <p className="text-2xl font-semibold">2,847</p>
                    </div>
                    <AreaSparkline 
                      data={[120, 140, 135, 180, 149, 160, 170, 191, 175]} 
                      showTrend 
                      color={chartColors.blue}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="text-sm text-muted-foreground">Orders</p>
                      <p className="text-2xl font-semibold">384</p>
                    </div>
                    <BarSparkline 
                      data={[8, 12, 10, 14, 11, 15, 13, 16, 18]} 
                      showTrend 
                      color={chartColors.purple}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Combo Chart */}
          <ComponentGroup id="comp-combo-chart" title="Combo Charts" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Sales vs Conversion Rate</CardTitle>
                <CardDescription>Bar and line combined</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonComboChart
                  data={[
                    { month: "Jan", sales: 4000, conversion: 2.4 },
                    { month: "Feb", sales: 3000, conversion: 1.98 },
                    { month: "Mar", sales: 5000, conversion: 3.2 },
                    { month: "Apr", sales: 4500, conversion: 2.8 },
                    { month: "May", sales: 6000, conversion: 3.5 },
                    { month: "Jun", sales: 5500, conversion: 3.1 },
                  ]}
                  xKey="month"
                  series={[
                    { key: "sales", type: "bar", color: chartColors.blue },
                    { key: "conversion", type: "line", color: chartColors.orange, yAxisId: "right" },
                  ]}
                  showRightAxis
                  height={300}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Heatmap */}
          <ComponentGroup id="comp-heatmap" title="Heatmap" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Correlation Matrix</CardTitle>
                <CardDescription>Feature correlation analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonHeatmap
                  data={[
                    { x: "A", y: "A", value: 1 },
                    { x: "A", y: "B", value: 0.8 },
                    { x: "A", y: "C", value: 0.3 },
                    { x: "A", y: "D", value: 0.5 },
                    { x: "B", y: "A", value: 0.8 },
                    { x: "B", y: "B", value: 1 },
                    { x: "B", y: "C", value: 0.6 },
                    { x: "B", y: "D", value: 0.4 },
                    { x: "C", y: "A", value: 0.3 },
                    { x: "C", y: "B", value: 0.6 },
                    { x: "C", y: "C", value: 1 },
                    { x: "C", y: "D", value: 0.9 },
                    { x: "D", y: "A", value: 0.5 },
                    { x: "D", y: "B", value: 0.4 },
                    { x: "D", y: "C", value: 0.9 },
                    { x: "D", y: "D", value: 1 },
                  ]}
                  xLabels={["A", "B", "C", "D"]}
                  yLabels={["A", "B", "C", "D"]}
                  showValues
                  cellSize={60}
                  valueFormatter={(v) => v.toFixed(1)}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Treemap */}
          <ComponentGroup id="comp-treemap" title="Treemap" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Disk Usage by Folder</CardTitle>
                <CardDescription>Hierarchical size visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonTreemap
                  data={[
                    { name: "Documents", value: 4500 },
                    { name: "Photos", value: 3200 },
                    { name: "Videos", value: 2800 },
                    { name: "Music", value: 1800 },
                    { name: "Downloads", value: 1500 },
                    { name: "Projects", value: 1200 },
                    { name: "Backups", value: 800 },
                    { name: "Other", value: 400 },
                  ]}
                  height={300}
                  valueFormatter={(v) => `${(v / 1000).toFixed(1)} GB`}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Radar Chart */}
          <ComponentGroup id="comp-radar-chart" title="Radar Charts" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Team Skills Comparison</CardTitle>
                <CardDescription>Multi-dimensional analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonRadarChart
                  data={[
                    { skill: "Frontend", teamA: 85, teamB: 75 },
                    { skill: "Backend", teamA: 90, teamB: 88 },
                    { skill: "DevOps", teamA: 70, teamB: 82 },
                    { skill: "Design", teamA: 80, teamB: 65 },
                    { skill: "Testing", teamA: 75, teamB: 90 },
                    { skill: "Communication", teamA: 88, teamB: 78 },
                  ]}
                  angleKey="skill"
                  dataKeys={["teamA", "teamB"]}
                  height={350}
                  colors={[chartColors.blue, chartColors.purple]}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Funnel Chart */}
          <ComponentGroup id="comp-funnel-chart" title="Funnel Charts" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Sales Pipeline</CardTitle>
                <CardDescription>Conversion funnel analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonFunnelChart
                  data={[
                    { name: "Visitors", value: 5000 },
                    { name: "Leads", value: 2500 },
                    { name: "Qualified", value: 1200 },
                    { name: "Proposals", value: 600 },
                    { name: "Closed", value: 300 },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Scatter Chart */}
          <ComponentGroup id="comp-scatter-chart" title="Scatter Charts" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Price vs Sales Correlation</CardTitle>
                <CardDescription>Data point distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonScatterChart
                  series={[
                    {
                      name: "Product A",
                      data: [
                        { x: 10, y: 100 }, { x: 15, y: 85 }, { x: 20, y: 75 },
                        { x: 25, y: 60 }, { x: 30, y: 50 }, { x: 35, y: 40 },
                      ],
                    },
                    {
                      name: "Product B",
                      data: [
                        { x: 12, y: 120 }, { x: 18, y: 95 }, { x: 22, y: 82 },
                        { x: 28, y: 65 }, { x: 32, y: 55 }, { x: 38, y: 42 },
                      ],
                    },
                  ]}
                  xLabel="Price ($)"
                  yLabel="Units Sold"
                  height={300}
                  colors={[chartColors.blue, chartColors.purple]}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          {/* Waterfall Chart */}
          <ComponentGroup id="comp-waterfall-chart" title="Waterfall Charts" origin="carboncn">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Profit Analysis</CardTitle>
                <CardDescription>Cumulative change breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <CarbonWaterfallChart
                  data={[
                    { name: "Revenue", value: 500000 },
                    { name: "COGS", value: -200000 },
                    { name: "Gross Profit", value: 300000, isTotal: true },
                    { name: "Salaries", value: -100000 },
                    { name: "Marketing", value: -50000 },
                    { name: "R&D", value: -30000 },
                    { name: "Net Profit", value: 120000, isTotal: true },
                  ]}
                  height={350}
                  formatter={(v) => `$${Math.abs(v / 1000)}K`}
                />
              </CardContent>
            </Card>
          </ComponentGroup>

          <ComponentGroup title="Code Snippet" origin="carbon">
            <CodeSnippet
              language="typescript"
              code={`import { Button } from "@/components/ui/button"

function App() {
  return <Button variant="primary">Click me</Button>
}`}
              variant="multi"
              showLineNumbers
            />
          </ComponentGroup>

          <ComponentGroup title="Keyboard Shortcuts" origin="carboncn">
            <div className="flex flex-wrap gap-carbon-04">
              <KeyboardShortcut keys={["⌘", "K"]} />
              <KeyboardShortcut keys={["Ctrl", "Shift", "P"]} />
              <Kbd>Enter</Kbd>
              <Kbd>Esc</Kbd>
            </div>
          </ComponentGroup>

          <ComponentGroup title="Aspect Ratio" origin="shadcn">
            <div className="max-w-xs">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  16:9
                </div>
              </AspectRatio>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-carousel" title="Carousel" origin="shadcn">
            <Carousel className="w-full max-w-sm">
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <CarouselItem key={num}>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{num}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </ComponentGroup>
        </Section>

        {/* ==================== FEEDBACK ==================== */}
        <Section id="feedback" title="Feedback">
          <ComponentGroup title="Alert" origin="shadcn">
            <div className="space-y-carbon-03 max-w-xl">
              <Alert variant="info"><AlertTitle>Info</AlertTitle><AlertDescription>Informational message</AlertDescription></Alert>
              <Alert variant="success"><AlertTitle>Success</AlertTitle><AlertDescription>Operation completed</AlertDescription></Alert>
              <Alert variant="warning"><AlertTitle>Warning</AlertTitle><AlertDescription>Please review</AlertDescription></Alert>
              <Alert variant="error"><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong</AlertDescription></Alert>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-inline-notification" title="Notification" origin="carbon">
            <div className="space-y-carbon-03 max-w-xl">
              <Notification variant="info" title="Information">Informational notification.</Notification>
              <Notification variant="success" title="Success">Your changes have been saved.</Notification>
              <Notification variant="warning" title="Warning">Please review your settings.</Notification>
              <Notification variant="error" title="Error" dismissible onDismiss={() => {}}>An error occurred.</Notification>
            </div>
          </ComponentGroup>

          <ComponentGroup title="Actionable Notification" origin="carbon">
            <ActionableNotification
              kind="info"
              title="Update available"
              subtitle="A new version is ready."
              actionButtonLabel="Update now"
              onActionClick={() => addToast({ title: "Updating...", description: "Please wait" })}
            />
          </ComponentGroup>

          <ComponentGroup id="comp-toast-notification" title="Toast" origin="carboncn">
            <div className="flex flex-wrap gap-carbon-03">
              <Button variant="tertiary" size="sm" onClick={() => addToast({ variant: "info", title: "Info", description: "Info toast" })}>Info</Button>
              <Button variant="tertiary" size="sm" onClick={() => addToast({ variant: "success", title: "Success", description: "Success toast" })}>Success</Button>
              <Button variant="tertiary" size="sm" onClick={() => addToast({ variant: "warning", title: "Warning", description: "Warning toast" })}>Warning</Button>
              <Button variant="tertiary" size="sm" onClick={() => addToast({ variant: "error", title: "Error", description: "Error toast" })}>Error</Button>
            </div>
          </ComponentGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-carbon-07 mt-carbon-07">
            <ComponentGroup id="comp-progress-bar" title="Progress" origin="carbon">
              <div className="space-y-carbon-04 max-w-xs">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Uploading</Label>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <Progress value={100} status="success" />
                <Progress value={75} status="error" />
                <Button variant="tertiary" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                  Increase
                </Button>
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-loading-spinner" title="Spinner" origin="carbon">
              <div className="flex items-center gap-carbon-05">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </ComponentGroup>

            <ComponentGroup title="Loading" origin="carbon">
              <div className="flex items-center gap-carbon-05">
                <Loading size="small" />
                <Loading size="normal" />
                <Loading size="large" />
              </div>
            </ComponentGroup>

            <ComponentGroup title="Inline Loading" origin="carbon">
              <div className="space-y-carbon-03">
                <InlineLoading status="active" description="Loading..." />
                <InlineLoading status="finished" description="Complete" />
                <InlineLoading status="error" description="Failed" />
              </div>
            </ComponentGroup>

            <ComponentGroup id="comp-skeleton" title="Skeleton" origin="shadcn">
              <div className="space-y-carbon-03 max-w-xs">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-3 mt-4">
                  <Skeleton className="h-12 w-12" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
            </ComponentGroup>
          </div>
        </Section>

        {/* ==================== OVERLAY ==================== */}
        <Section id="overlay" title="Overlay">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-carbon-04">
            <ComponentGroup id="comp-dialog" title="Dialog" origin="shadcn">
              <Dialog>
                <DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>Dialog description here.</DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <Label>Name</Label>
                    <Input placeholder="Enter name" className="mt-2" />
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="ghost" className="flex-1 h-16">Cancel</Button>
                    <Button className="flex-1 h-16">Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ComponentGroup>

            <ComponentGroup title="Modal" origin="carbon">
              <Modal open={showModal} onOpenChange={setShowModal}>
                <ModalTrigger asChild><Button variant="secondary">Open Modal</Button></ModalTrigger>
                <ModalContent size="md">
                  <ModalHeader label="Optional label">
                    <ModalTitle>Carbon Modal</ModalTitle>
                    <ModalDescription>Carbon-style modal with proper structure.</ModalDescription>
                  </ModalHeader>
                  <ModalBody>
                    <FormItem>
                      <FormLabel required>Project name</FormLabel>
                      <Input placeholder="Enter project name" />
                    </FormItem>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={() => setShowModal(false)}>Create</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </ComponentGroup>

            <ComponentGroup title="Drawer" origin="shadcn">
              <Drawer>
                <DrawerTrigger asChild><Button variant="tertiary">Open Drawer</Button></DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer Title</DrawerTitle>
                    <DrawerDescription>Drawer content here.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Save</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </ComponentGroup>

            <ComponentGroup title="Tearsheet" origin="carbon">
              <Tearsheet>
                <TearsheetTrigger asChild><Button variant="ghost">Open Tearsheet</Button></TearsheetTrigger>
                <TearsheetContent size="wide">
                  <TearsheetHeader label="Workflow">
                    <TearsheetTitle>Create Resource</TearsheetTitle>
                  </TearsheetHeader>
                  <TearsheetBody>
                    <p>Large workflow panel content goes here.</p>
                  </TearsheetBody>
                  <TearsheetFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button>Create</Button>
                  </TearsheetFooter>
                </TearsheetContent>
              </Tearsheet>
            </ComponentGroup>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-carbon-04 mt-carbon-07">
            <ComponentGroup id="comp-popover" title="Popover" origin="shadcn">
              <Popover>
                <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm">Popover content here.</p>
                </PopoverContent>
              </Popover>
            </ComponentGroup>

            <ComponentGroup id="comp-tooltip" title="Tooltip" origin="shadcn">
              <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
              </Tooltip>
            </ComponentGroup>

            <ComponentGroup title="Toggle Tip" origin="carbon">
              <div className="flex items-center gap-2">
                <span className="text-sm">Info</span>
                <ToggleTip>
                  <ToggleTipTrigger />
                  <ToggleTipContent>Toggle tip with interactive content.</ToggleTipContent>
                </ToggleTip>
              </div>
            </ComponentGroup>

            <ComponentGroup title="Definition Tooltip" origin="carbon">
              <DefinitionTooltip>
                <DefinitionTooltipTrigger>Carbon</DefinitionTooltipTrigger>
                <DefinitionTooltipContent definition="IBM's open source design system." />
              </DefinitionTooltip>
            </ComponentGroup>

            <ComponentGroup id="comp-hover-card" title="Hover Card" origin="shadcn">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@carboncn</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-4">
                    <Avatar initials="CN" />
                    <div>
                      <h4 className="text-sm font-semibold">CarbonCN</h4>
                      <p className="text-sm text-muted-foreground">Design system components</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </ComponentGroup>

            <ComponentGroup id="comp-context-menu" title="Context Menu" origin="shadcn">
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div className="border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                    Right-click here
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Edit</ContextMenuItem>
                  <ContextMenuItem>Duplicate</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Delete</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </ComponentGroup>

            <ComponentGroup id="comp-dropdown-menu" title="Dropdown Menu" origin="shadcn">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Options <ChevronDown className="ml-2 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentGroup>

            <ComponentGroup title="Overflow Menu" origin="carbon">
              <OverflowMenu>
                <OverflowMenuTrigger />
                <OverflowMenuContent>
                  <OverflowMenuItem>Edit</OverflowMenuItem>
                  <OverflowMenuItem>Share</OverflowMenuItem>
                  <OverflowMenuSeparator />
                  <OverflowMenuItem danger>Delete</OverflowMenuItem>
                </OverflowMenuContent>
              </OverflowMenu>
            </ComponentGroup>
          </div>

          <ComponentGroup id="comp-command" title="Command Palette" origin="shadcn">
            <Command className="border max-w-md">
              <CommandInput placeholder="Type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ComponentGroup>
        </Section>

        {/* ==================== LAYOUT ==================== */}
        <Section id="layout" title="Layout">
          <ComponentGroup id="comp-separator" title="Separator" origin="shadcn">
            <div className="space-y-4 max-w-md">
              <p className="text-sm">Content above</p>
              <Separator />
              <p className="text-sm">Content below</p>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-scroll-area" title="Scroll Area" origin="shadcn">
            <ScrollArea className="h-48 w-64 border">
              <div className="p-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="text-sm py-1">Item {i + 1}</p>
                ))}
              </div>
            </ScrollArea>
          </ComponentGroup>

          <ComponentGroup id="comp-resizable" title="Resizable Panels" origin="shadcn">
            <ResizablePanelGroup orientation="horizontal" className="h-48 border max-w-xl">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Panel 1</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Panel 2</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ComponentGroup>

          <ComponentGroup id="comp-layer" title="Layer" origin="carbon">
            <div className="flex gap-4">
              <Layer level={0} className="p-4 border">Level 0</Layer>
              <Layer level={1} className="p-4 border">Level 1</Layer>
              <Layer level={2} className="p-4 border">Level 2</Layer>
              <Layer level={3} className="p-4 border">Level 3</Layer>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-collapsible" title="Collapsible" origin="shadcn">
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="max-w-md">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  Click to expand
                  <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
                <p className="text-sm">Collapsible content that can be shown or hidden.</p>
              </CollapsibleContent>
            </Collapsible>
          </ComponentGroup>
        </Section>

        {/* ==================== TYPOGRAPHY ==================== */}
        <Section id="typography" title="Typography">
          <div className="space-y-carbon-06 max-w-3xl">
            <div>
              <p className="label-01 text-muted-foreground mb-1">heading-06</p>
              <h1>The quick brown fox jumps</h1>
            </div>
            <div>
              <p className="label-01 text-muted-foreground mb-1">heading-05</p>
              <h2>The quick brown fox jumps over</h2>
            </div>
            <div>
              <p className="label-01 text-muted-foreground mb-1">heading-04</p>
              <h3>The quick brown fox jumps over the lazy</h3>
            </div>
            <div>
              <p className="label-01 text-muted-foreground mb-1">heading-03</p>
              <h4>The quick brown fox jumps over the lazy dog</h4>
            </div>
            <div>
              <p className="label-01 text-muted-foreground mb-1">body-02</p>
              <p className="body-02">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
            </div>
            <div>
              <p className="label-01 text-muted-foreground mb-1">body-01</p>
              <p className="body-01">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
            </div>
            <div>
              <p className="label-01 text-muted-foreground mb-1">caption-01</p>
              <p className="caption-01">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </Section>

        {/* ==================== COLORS ==================== */}
        <Section id="colors" title="Colors">
          <ComponentGroup id="comp-gray-scale" title="Gray Scale" origin="carbon">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-1">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
                <div key={shade} className="text-center">
                  <div className={`h-12 w-full bg-carbon-gray-${shade}`} />
                  <p className="caption-01 mt-1">{shade}</p>
                </div>
              ))}
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-alert-colors" title="Status Colors" origin="carbon">
            <div className="flex gap-carbon-05">
              <div className="text-center">
                <div className="h-12 w-24 bg-carbon-green-60" />
                <p className="caption-01 mt-1">Success</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-24 bg-carbon-yellow-30" />
                <p className="caption-01 mt-1">Warning</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-24 bg-carbon-red-60" />
                <p className="caption-01 mt-1">Error</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-24 bg-carbon-blue-60" />
                <p className="caption-01 mt-1">Info</p>
              </div>
            </div>
          </ComponentGroup>

          <ComponentGroup id="comp-theme-colors" title="Accent Colors" origin="carboncn">
            <div className="flex flex-wrap gap-carbon-04">
              <div className="text-center">
                <div className="h-12 w-20 rounded-sm" style={{ backgroundColor: "#0f62fe" }} />
                <p className="caption-01 mt-1">Blue</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-20 rounded-sm" style={{ backgroundColor: "#198038" }} />
                <p className="caption-01 mt-1">Green</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-20 rounded-sm" style={{ backgroundColor: "#ff6b00" }} />
                <p className="caption-01 mt-1">Orange</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-20 rounded-sm" style={{ backgroundColor: "#8a3ffc" }} />
                <p className="caption-01 mt-1">Purple</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-20 rounded-sm" style={{ backgroundColor: "#007d79" }} />
                <p className="caption-01 mt-1">Teal</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-20 rounded-sm bg-primary ring-2 ring-foreground ring-offset-2 ring-offset-background" />
                <p className="caption-01 mt-1 font-medium">Active</p>
              </div>
            </div>
            <p className="helper-text-01 text-muted-foreground mt-carbon-03">
              Use the theme switcher in the header to change the accent color.
            </p>
          </ComponentGroup>
        </Section>
      </main>
    </div>
  )
}
