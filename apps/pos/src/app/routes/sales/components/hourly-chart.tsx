import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { HourlySales } from '../types';

interface Props {
  data: HourlySales[];
}

const formatValue = (value: number) => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}만`;
  }
  return `${(value / 1000).toFixed(0)}천`;
};

export function HourlyChart({ data }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold">시간대별 매출</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">오늘 시간대별 매출 현황</p>

      <div className="mt-4 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickFormatter={formatValue}
              tickLine={false}
              axisLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value) => [`${new Intl.NumberFormat('ko-KR').format(value as number)}원`, '매출']}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(262, 83%, 58%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
