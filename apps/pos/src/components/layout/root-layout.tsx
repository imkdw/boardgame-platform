import { cn } from '@repo/ui';
import type { ReactNode } from 'react';
import { BottomNavigation } from './bottom-navigation';

interface Props {
  children: ReactNode;
  className?: string;
}

export function RootLayout({ children, className }: Props) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted">
      <div
        className={cn(
          'relative flex h-full w-full flex-col overflow-hidden bg-background',
          'max-h-[1080px] max-w-[1920px]',
          className
        )}
      >
        <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
        <BottomNavigation />
      </div>
    </div>
  );
}
