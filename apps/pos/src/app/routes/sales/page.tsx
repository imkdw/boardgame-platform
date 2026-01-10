import { POSHeader } from '@/components/shared/pos-header';
import { StatsCard } from './components/stats-card';
import { SalesTable } from './components/sales-table';
import { WeeklyChart } from './components/weekly-chart';
import { HourlyChart } from './components/hourly-chart';
import { CategoryChart } from './components/category-chart';
import {
  mockSalesRecords,
  mockWeeklySales,
  mockHourlySales,
  mockCategorySales,
  mockSalesStats,
} from './mock-data';

export default function SalesPage() {
  const stats = mockSalesStats;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}천만원`;
    }
    if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}만원`;
    }
    return `${new Intl.NumberFormat('ko-KR').format(value)}원`;
  };

  return (
    <div className="flex h-full flex-col">
      <POSHeader activeRoomCount={12} totalRoomCount={24} />

      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">매출 관리</h1>
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
            일간
          </button>
          <button className="rounded-lg border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
            주간
          </button>
          <button className="rounded-lg border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
            월간
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-auto bg-muted/30 p-6">
        <div className="mx-auto max-w-[1600px] space-y-6">
          {/* 통계 카드 */}
          <div className="grid grid-cols-4 gap-4">
            <StatsCard
              title="오늘 매출"
              value={formatCurrency(stats.todayTotal)}
              diff={stats.todayDiff}
              diffLabel="전일 대비"
            />
            <StatsCard
              title="이번 주 매출"
              value={formatCurrency(stats.weekTotal)}
              diff={stats.weekDiff}
              diffLabel="전주 대비"
            />
            <StatsCard
              title="이번 달 매출"
              value={formatCurrency(stats.monthTotal)}
              diff={stats.monthDiff}
              diffLabel="전월 대비"
            />
            <StatsCard
              title="평균 주문 금액"
              value={formatCurrency(stats.avgOrderPrice)}
              diff={stats.avgOrderDiff}
              diffLabel="전일 대비"
            />
          </div>

          {/* 차트 영역 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <WeeklyChart data={mockWeeklySales} />
            </div>
            <CategoryChart data={mockCategorySales} />
          </div>

          {/* 시간대별 차트 + 테이블 */}
          <div className="grid grid-cols-3 gap-4">
            <HourlyChart data={mockHourlySales} />
            <div className="col-span-2">
              <SalesTable records={mockSalesRecords} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
