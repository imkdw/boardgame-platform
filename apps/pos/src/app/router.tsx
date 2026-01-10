import { createHashRouter, Navigate } from 'react-router';
import { RootLayout } from '@/components/layout/root-layout';
import { AuthGuard } from '@/components/layout/auth-guard';
import LoginPage from './routes/login/page';
import DashboardPage from './routes/dashboard/page';
import OrdersPage from './routes/orders/page';
import GamesPage from './routes/games/page';
import RentalPage from './routes/games/rental/page';
import ReturnPage from './routes/games/return/page';
import SalesPage from './routes/sales/page';

export const router = createHashRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <RootLayout>
          <DashboardPage />
        </RootLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/orders',
    element: (
      <AuthGuard>
        <RootLayout>
          <OrdersPage />
        </RootLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/games',
    element: (
      <AuthGuard>
        <RootLayout>
          <GamesPage />
        </RootLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <RentalPage />,
      },
      {
        path: 'rental',
        element: <RentalPage />,
      },
      {
        path: 'return',
        element: <ReturnPage />,
      },
    ],
  },
  {
    path: '/sales',
    element: (
      <AuthGuard>
        <RootLayout>
          <SalesPage />
        </RootLayout>
      </AuthGuard>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
