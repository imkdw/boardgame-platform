import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cn } from '@repo/ui';
import { ToastProvider } from '@/components/shared';
import './globals.css';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Admin - Boardgame Platform',
  description: 'Boardgame Platform Admin Dashboard',
};

export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased')}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
