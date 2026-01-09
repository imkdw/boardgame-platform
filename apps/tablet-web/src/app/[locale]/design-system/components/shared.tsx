import type { ReactNode } from 'react';

export function SectionHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}): ReactNode {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-muted-foreground">{description}</p>
    </div>
  );
}

export function VariantLabel({
  label,
  description,
  color,
}: {
  label: string;
  description: string;
  color?: string;
}): ReactNode {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {color && <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />}
        <code className="font-mono text-xs text-foreground">{label}</code>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export function ColorSwatch({
  name,
  color,
  hex,
  textDark = false,
}: {
  name: string;
  color: string;
  hex: string;
  textDark?: boolean;
}): ReactNode {
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <div className={`${color} flex h-20 items-end p-3`}>
        <span className={`text-sm font-medium ${textDark ? 'text-foreground' : 'text-white'}`}>{name}</span>
      </div>
      <div className="bg-card p-3">
        <code className="font-mono text-xs text-muted-foreground">{hex}</code>
      </div>
    </div>
  );
}
