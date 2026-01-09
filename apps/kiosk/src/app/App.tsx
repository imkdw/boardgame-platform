import { RouterProvider } from 'react-router';
import { router } from './router';
import { KioskSessionProvider } from '../hooks/useKioskSession';

export default function App() {
  return (
    <KioskSessionProvider>
      <RouterProvider router={router} />
    </KioskSessionProvider>
  );
}
