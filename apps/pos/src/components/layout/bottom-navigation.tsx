import { cn } from '@repo/ui';
import { NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, ShoppingCart, Gamepad2, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '좌석관리' },
  { to: '/orders', icon: ShoppingCart, label: '주문' },
  { to: '/games', icon: Gamepad2, label: '게임' },
  { to: '/sales', icon: BarChart3, label: '매출' },
];

export function BottomNavigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex h-16 shrink-0 items-center justify-center gap-2 border-t bg-background px-6">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted"
      >
        <LogOut className="size-5" />
        <span className="text-sm font-medium">로그아웃</span>
      </button>

      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 transition-colors',
              isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
            )
          }
        >
          <item.icon className="size-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
