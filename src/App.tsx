import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { ThemeProvider } from "@/context/ThemeContext"
import { LandingPage } from "@/pages/LandingPage"
import { ShowcasePage } from "@/components/showcase/ShowcasePage"
import { ExportPage } from "@/pages/ExportPage"
import { Header } from "@/components/landing/Header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Force scroll restoration to manual to prevent browser from jumping
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Small delay to let the page render before scrolling
    const timer = setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0 });
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider defaultTheme="light" storageKey="carboncn-design-system-theme">
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
          <Toaster>
            <div className="min-h-screen flex flex-col">
              <Routes>
                <Route path="/" element={<><Header /><LandingPage /></>} />
                <Route path="/components" element={<><Header /><ShowcasePage /></>} />
                <Route path="/export" element={<ExportPage />} />
              </Routes>
            </div>
          </Toaster>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
