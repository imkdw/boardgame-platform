import { createHashRouter } from 'react-router';
import IdlePage from './routes/idle/page';
import SelectPeoplePage from './routes/select-people/page';
import SelectRoomPage from './routes/select-room/page';
import SelectTimePage from './routes/select-time/page';
import PaymentPage from './routes/payment/page';
import CompletePage from './routes/complete/page';

export const router = createHashRouter([
  {
    path: '/',
    element: <IdlePage />,
  },
  {
    path: '/select-people',
    element: <SelectPeoplePage />,
  },
  {
    path: '/select-room',
    element: <SelectRoomPage />,
  },
  {
    path: '/select-time',
    element: <SelectTimePage />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
  },
  {
    path: '/complete',
    element: <CompletePage />,
  },
]);
