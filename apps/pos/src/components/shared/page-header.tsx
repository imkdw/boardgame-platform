import { cn } from '@repo/ui';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, children, className }: Props) {
  return (
    <div className={cn('flex items-center justify-between border-b bg-background px-6 py-3', className)}>
      <h1 className="text-xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
