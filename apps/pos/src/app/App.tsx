import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from '@/hooks/use-auth';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
