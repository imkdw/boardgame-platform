'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, ScrollArea } from '@repo/ui';
import { Building2, ChevronDown, Gamepad2, LayoutDashboard, UtensilsCrossed } from 'lucide-react';

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
    children: [
      { title: '매장', href: '/stores' },
      { title: '방', href: '/store-rooms' },
    ],
  },
  {
    title: '음식 관리',
    href: '/food',
    icon: <UtensilsCrossed className="size-5" />,
    children: [
      { title: '음식 카테고리', href: '/food-categories' },
      { title: '음식', href: '/foods' },
    ],
  },
  {
    title: '게임 관리',
    href: '/games',
    icon: <Gamepad2 className="size-5" />,
  },
];

interface Props {
  className?: string;
}

export function Sidebar({ className }: Props): ReactNode {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const expanded = new Set<string>();
    navItems.forEach(item => {
      if (item.children && pathname.startsWith(item.href)) {
        expanded.add(item.href);
      }
    });
    return expanded;
  });

  function toggleExpanded(href: string) {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(href)) {
        next.delete(href);
      } else {
        next.add(href);
      }
      return next;
    });
  }

  return (
    <aside className={cn('flex h-screen w-64 flex-col border-r bg-card', className)}>
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
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isExpanded = expandedItems.has(item.href);
            const hasChildren = !!item.children;

            if (hasChildren) {
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronDown className={cn('ml-auto size-4 transition-transform', isExpanded && 'rotate-180')} />
                  </button>
                  {isExpanded && item.children && (
                    <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                      {item.children.map(child => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block rounded-lg px-3 py-2 text-sm transition-colors',
                              isChildActive
                                ? 'bg-primary/10 font-medium text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

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
