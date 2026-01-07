'use client';

import type { ReactNode } from 'react';
import {
  HeroSection,
  ButtonsSection,
  InputSection,
  DialogSection,
  TabsSection,
  BadgesSection,
  CardsSection,
  ColorPaletteSection,
} from './components';

export default function DesignSystemPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <div className="mx-auto max-w-6xl space-y-24 px-6 py-16">
        <ButtonsSection />
        <InputSection />
        <DialogSection />
        <TabsSection />
        <BadgesSection />
        <CardsSection />
        <ColorPaletteSection />
      </div>

      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-muted-foreground">Built with shadcn/ui • Radix UI • Tailwind CSS • CVA</p>
        </div>
      </footer>
    </main>
  );
}
