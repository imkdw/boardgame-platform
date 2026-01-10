import { cn } from '@repo/ui';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function POSLayout({ children, className }: Props) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <div
        className={cn(
          'relative flex h-full w-full flex-col overflow-hidden bg-background',
          'max-h-[1080px] max-w-[1920px]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
