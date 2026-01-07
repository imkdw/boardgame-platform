'use client';

import type { ReactNode } from 'react';
import { SessionLayout } from '@/components/layout';
import { MOCK_SESSION } from '@/lib/mock-session';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return MOCK_SESSION.isActive ? <SessionLayout>{children}</SessionLayout> : <>{children}</>;
}
