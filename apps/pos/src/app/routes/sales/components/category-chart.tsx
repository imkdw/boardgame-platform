import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategorySales } from '../types';

interface Props {
  data: CategorySales[];
}

const COLORS = [
  'hsl(262, 83%, 58%)', // 시간권 - 보라
  'hsl(24, 95%, 53%)',  // 음식 - 주황
  'hsl(200, 95%, 45%)', // 음료 - 파랑
  'hsl(45, 93%, 47%)',  // 스낵 - 노랑
  'hsl(215, 14%, 45%)', // 기타 - 회색
];

export function CategoryChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.sales, 0);

  // Recharts 호환 데이터로 변환
  const chartData = data.map((d) => ({
    categoryName: d.categoryName,
    sales: d.sales,
    percentage: d.percentage,
  }));

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold">카테고리별 매출</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">오늘 카테고리별 매출 비중</p>

      <div className="mt-4 flex items-center gap-8">
        <div className="h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="sales"
                nameKey="categoryName"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [`${new Intl.NumberFormat('ko-KR').format(value as number)}원`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm">{item.categoryName}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium tabular-nums">
                  {new Intl.NumberFormat('ko-KR').format(item.sales)}원
                </span>
                <span className="w-12 text-right text-sm text-muted-foreground tabular-nums">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">총 매출</span>
              <span className="text-sm font-bold tabular-nums">
                {new Intl.NumberFormat('ko-KR').format(total)}원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
