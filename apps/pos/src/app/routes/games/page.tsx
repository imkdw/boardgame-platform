import { Tabs, TabsList, TabsTrigger } from '@repo/ui';
import { Outlet, useLocation, useNavigate } from 'react-router';

export default function GamesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.includes('/return') ? 'return' : 'rental';

  const handleTabChange = (value: string) => {
    navigate(`/games/${value}`);
  };

  return (
    <div className="flex h-full flex-col p-6">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="mb-4">
        <TabsList className="grid w-64 grid-cols-2">
          <TabsTrigger value="rental">대여</TabsTrigger>
          <TabsTrigger value="return">반납</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
