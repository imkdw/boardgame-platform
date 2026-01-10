import { cn } from '@repo/ui';
import { CurrentTime } from './current-time';
import { formatPrice } from '@/lib/format';

interface Props {
  storeName?: string;
  todaySales?: number;
  activeRoomCount?: number;
  totalRoomCount?: number;
  className?: string;
}

export function POSHeader({
  storeName = '보드게임 카페',
  todaySales = 1250000,
  activeRoomCount = 15,
  totalRoomCount = 40,
  className,
}: Props) {
  return (
    <header className={cn('flex items-center justify-between border-b bg-card px-6 py-4', className)}>
      {/* 왼쪽: 로고 + 매장명 */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <span className="text-lg font-bold text-primary-foreground">B</span>
        </div>
        <span className="text-lg font-semibold text-foreground">{storeName}</span>
      </div>

      {/* 오른쪽: 매출 정보 + 현재 시간 */}
      <div className="flex items-center gap-8">
        {/* 오늘의 매출 */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">오늘 매출</p>
            <p className="text-lg font-bold text-primary">{formatPrice(todaySales)}원</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">이용중</p>
            <p className="text-lg font-bold text-foreground">
              <span className="text-primary">{activeRoomCount}</span>
              <span className="text-muted-foreground"> / {totalRoomCount}</span>
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-border" />

        {/* 현재 시간 */}
        <CurrentTime />
      </div>
    </header>
  );
}
