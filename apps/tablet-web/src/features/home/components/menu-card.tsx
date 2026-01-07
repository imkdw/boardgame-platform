import type { ReactNode } from 'react';
import { cn } from '@repo/ui';
import { Link } from '@/i18n/navigation';

type MenuCardVariant = 'primary' | 'progress' | 'complete' | 'warning';

interface Props {
  title: string;
  subtitle: string;
  icon: ReactNode;
  href: string;
  variant: MenuCardVariant;
}

const variantStyles: Record<MenuCardVariant, string> = {
  primary: 'bg-primary',
  progress: 'bg-status-progress',
  complete: 'bg-status-complete',
  warning: 'bg-status-warning',
};

export function MenuCard({ title, subtitle, icon, href, variant }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl p-6 text-white',
        'min-h-[200px]',
        'hover:opacity-90 active:opacity-80',
        variantStyles[variant]
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center">{icon}</div>
      <p className="mb-1 text-sm font-medium opacity-90">{subtitle}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
    </Link>
  );
}
