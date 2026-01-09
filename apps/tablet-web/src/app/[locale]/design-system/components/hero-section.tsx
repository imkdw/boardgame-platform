import type { ReactNode } from 'react';
import { Badge } from '@repo/ui';
import { Sparkles } from 'lucide-react';

export function HeroSection(): ReactNode {
  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium uppercase tracking-wide text-primary">@repo/ui</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">Design System</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          A comprehensive collection of components built with shadcn/ui, Radix UI, and Tailwind CSS.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="default">shadcn/ui</Badge>
          <Badge variant="secondary">Radix UI</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">CVA</Badge>
        </div>
      </div>
    </div>
  );
}
