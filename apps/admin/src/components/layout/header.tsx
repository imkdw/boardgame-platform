'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@repo/ui';
import { Bell, LogOut, Search } from 'lucide-react';

export function Header(): ReactNode {
  const router = useRouter();

  const handleLogout = (): void => {
    router.push('/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="검색어를 입력하세요..." className="pl-10" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="size-5" />
        </Button>
      </div>
    </header>
  );
}
