import { cn } from '@repo/ui';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function KioskLayout({ children, className }: Props) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <div
        className={cn(
          'relative flex h-full w-full flex-col overflow-hidden bg-background',
          'max-h-[1920px] max-w-[1080px]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
