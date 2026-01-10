import { cn } from '@repo/ui';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, children, className }: Props) {
  return (
    <div className={cn('flex items-center justify-between py-2', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
