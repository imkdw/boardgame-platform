import type { ReactNode } from 'react';
import { Badge } from '@repo/ui';
import { Star } from 'lucide-react';
import { SectionHeader, VariantLabel } from './shared';

export function BadgesSection(): ReactNode {
  return (
    <section>
      <SectionHeader
        title="Badges"
        description="Small status indicators for labeling and categorization."
        icon={<Star className="h-5 w-5" />}
      />

      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Base Variants</h3>
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Status Variants</h3>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex flex-col items-start gap-3">
                <Badge variant="progress">In Progress</Badge>
                <VariantLabel label="progress" description="Active/ongoing" color="#0065ff" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Badge variant="complete">Complete</Badge>
                <VariantLabel label="complete" description="Success state" color="#36b37e" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Badge variant="warning">Warning</Badge>
                <VariantLabel label="warning" description="Needs attention" color="#ffab00" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Badge variant="error">Error</Badge>
                <VariantLabel label="error" description="Critical issue" color="#e22a00" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Badge variant="new">New</Badge>
                <VariantLabel label="new" description="Fresh content" color="#6554c0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
