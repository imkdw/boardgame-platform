'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, ScrollArea } from '@repo/ui';
import {
  Building2,
  ChevronDown,
  Gamepad2,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    title: '매장 관리',
    href: '/stores',
    icon: <Building2 className="size-5" />,
  },
  {
    title: '게임 관리',
    href: '/dashboard/games',
    icon: <Gamepad2 className="size-5" />,
  },
  {
    title: '상품 관리',
    href: '/dashboard/products',
    icon: <Package className="size-5" />,
  },
  {
    title: '주문 관리',
    href: '/dashboard/orders',
    icon: <ShoppingCart className="size-5" />,
  },
  {
    title: '회원 관리',
    href: '/dashboard/users',
    icon: <Users className="size-5" />,
  },
  {
    title: '설정',
    href: '/dashboard/settings',
    icon: <Settings className="size-5" />,
  },
];

interface Props {
  className?: string;
}

export function Sidebar({ className }: Props): ReactNode {
  const pathname = usePathname();

  return (
    <aside
      className={cn('flex h-screen w-64 flex-col border-r bg-card', className)}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <Gamepad2 className="size-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">BGP Admin</span>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {item.children && (
                    <ChevronDown className="ml-auto size-4" />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            관
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">관리자</p>
            <p className="truncate text-xs text-muted-foreground">admin@bgp.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
