'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@repo/ui';
import { Home, BookOpen, Search, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface NavItem {
  key: string;
  href: string;
  icon: typeof Home;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'storeIntro', href: '/', icon: Home },
  { key: 'guide', href: '/', icon: BookOpen },
  { key: 'gameSearch', href: '/games', icon: Search },
  { key: 'myInfo', href: '/', icon: User },
];

export function BottomNavigation() {
  const t = useTranslations('BottomNav');
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (href: string) => {
    const localizedPath = `/${locale}${href === '/' ? '' : href}`;
    if (href === '/') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(localizedPath);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="flex items-stretch">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-3',
                'min-h-[64px] transition-colors',
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
