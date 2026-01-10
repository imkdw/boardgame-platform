import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DailySales } from '../types';

interface Props {
  data: DailySales[];
}

const formatValue = (value: number) => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}만`;
  }
  return `${(value / 1000).toFixed(0)}천`;
};

export function WeeklyChart({ data }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold">주간 매출 추이</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">최근 7일간 카테고리별 매출</p>

      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={formatValue}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value) => [`${new Intl.NumberFormat('ko-KR').format(value as number)}원`]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 16 }}
            />
            <Bar
              dataKey="timePackage"
              name="시간권"
              stackId="a"
              fill="hsl(262, 83%, 58%)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="food"
              name="음식"
              stackId="a"
              fill="hsl(24, 95%, 53%)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="drink"
              name="음료"
              stackId="a"
              fill="hsl(200, 95%, 45%)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="snack"
              name="스낵"
              stackId="a"
              fill="hsl(45, 93%, 47%)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="etc"
              name="기타"
              stackId="a"
              fill="hsl(215, 14%, 45%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
