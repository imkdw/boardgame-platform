import { createHashRouter } from 'react-router';
import HomePage from './routes/home/page';

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
