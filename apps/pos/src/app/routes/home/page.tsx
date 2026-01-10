import { Button } from '@repo/ui';
import { Monitor } from 'lucide-react';
import { POSLayout } from '@/components/POSLayout';

export default function HomePage() {
  return (
    <POSLayout>
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary">
            <Monitor className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold">BoardGame POS</h1>
        </div>

        <p className="text-xl text-muted-foreground">보드게임 카페 POS 시스템</p>

        <div className="grid grid-cols-3 gap-4">
          <Button size="touch-lg" variant="default" className="h-24 w-48 text-lg">
            새 주문
          </Button>
          <Button size="touch-lg" variant="outline" className="h-24 w-48 text-lg">
            주문 목록
          </Button>
          <Button size="touch-lg" variant="outline" className="h-24 w-48 text-lg">
            설정
          </Button>
        </div>
      </div>
    </POSLayout>
  );
}
