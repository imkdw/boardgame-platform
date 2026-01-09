import type { ReactNode } from 'react';
import { Button } from '@repo/ui';
import { ArrowRight, Mail, MousePointer, Plus, Settings } from 'lucide-react';
import { SectionHeader, VariantLabel } from './shared';

export function ButtonsSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Buttons"
        description="Interactive elements for user actions with multiple variants and sizes."
        icon={<MousePointer className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Variants</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              <div className="flex flex-col items-start gap-3">
                <Button variant="default">Default</Button>
                <VariantLabel label="default" description="Primary actions" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="secondary">Secondary</Button>
                <VariantLabel label="secondary" description="Secondary actions" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="destructive">Destructive</Button>
                <VariantLabel label="destructive" description="Dangerous actions" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="outline">Outline</Button>
                <VariantLabel label="outline" description="Bordered style" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="ghost">Ghost</Button>
                <VariantLabel label="ghost" description="Subtle actions" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="link">Link</Button>
                <VariantLabel label="link" description="Navigation links" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sizes</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              <div className="flex flex-col items-start gap-3">
                <Button size="sm">Small</Button>
                <VariantLabel label="sm" description="h-8" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button size="default">Default</Button>
                <VariantLabel label="default" description="h-9" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button size="lg">Large</Button>
                <VariantLabel label="lg" description="h-10" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button size="touch">Touch</Button>
                <VariantLabel label="touch" description="h-12 (48px)" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button size="touch-lg">Touch LG</Button>
                <VariantLabel label="touch-lg" description="h-14 (56px)" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <VariantLabel label="icon" description="9×9 (36px)" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">With Icons</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button variant="secondary">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">States</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
