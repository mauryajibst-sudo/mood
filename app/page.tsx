'use client'

import { BackgroundAnimation } from '@/components/BackgroundAnimation'
import { HeroSection } from '@/components/HeroSection'
import { DailySmileGenerator } from '@/components/DailySmileGenerator'
import { VirtualHug } from '@/components/VirtualHug'
import { ReasonsWhyAmazing } from '@/components/ReasonsWhyAmazing'
import { AntiOverthinkingCorner } from '@/components/AntiOverthinkingCorner'
import { LoveMeter } from '@/components/LoveMeter'
import { SurpriseButton } from '@/components/SurpriseButton'
import { FinalLetter } from '@/components/FinalLetter'
import { EasterEggs } from '@/components/EasterEggs'

export default function Page() {
  return (
    <main className="relative w-full overflow-hidden">
      <BackgroundAnimation />

      <div id="content" className="relative z-10">
        <HeroSection />
        <DailySmileGenerator />
        <VirtualHug />
        <ReasonsWhyAmazing />
        <AntiOverthinkingCorner />
        <LoveMeter />
        <SurpriseButton />
        <FinalLetter />
      </div>

      <EasterEggs />
    </main>
  )
}
