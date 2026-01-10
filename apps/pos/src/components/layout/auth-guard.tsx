import { Navigate } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AuthGuard({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
