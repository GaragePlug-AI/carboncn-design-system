import { HeroSection } from "@/components/landing/HeroSection"
import { PrinciplesSection } from "@/components/landing/PrinciplesSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { ExploreSection } from "@/components/landing/ExploreSection"
import { DocsSection } from "@/components/landing/DocsSection"
import { FooterSection } from "@/components/landing/FooterSection"

export function LandingPage() {
  return (
    <main>
      <HeroSection />
      <PrinciplesSection />
      <FeaturesSection />
      <DocsSection />
      <ExploreSection />
      <FooterSection />
    </main>
  )
}
