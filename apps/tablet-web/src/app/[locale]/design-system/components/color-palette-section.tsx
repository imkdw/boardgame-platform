import type { ReactNode } from 'react';
import { Palette } from 'lucide-react';
import { SectionHeader, ColorSwatch } from './shared';

export function ColorPaletteSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Color Palette"
        description="The foundational colors powering our design system."
        icon={<Palette className="h-5 w-5" />}
      />

      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ColorSwatch name="Primary" color="bg-primary" hex="#7c27f2" />
          <ColorSwatch name="Secondary" color="bg-secondary" hex="#f6f6f6" textDark />
          <ColorSwatch name="Destructive" color="bg-destructive" hex="#e22a00" />
          <ColorSwatch name="Muted" color="bg-muted" hex="#f1f5f9" textDark />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <ColorSwatch name="Progress" color="bg-status-progress" hex="#0065ff" />
          <ColorSwatch name="Complete" color="bg-status-complete" hex="#36b37e" />
          <ColorSwatch name="Warning" color="bg-status-warning" hex="#ffab00" />
          <ColorSwatch name="Error" color="bg-status-error" hex="#e22a00" />
          <ColorSwatch name="New" color="bg-status-new" hex="#6554c0" />
        </div>
      </div>
    </section>
  );
}
