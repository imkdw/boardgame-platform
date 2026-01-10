import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import { ArrowDownRight, ArrowUpRight, Building2, Gamepad2, ShoppingCart, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps): ReactNode {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`mt-1 flex items-center text-xs ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
        >
          {changeType === 'increase' ? (
            <ArrowUpRight className="mr-1 size-3" />
          ) : (
            <ArrowDownRight className="mr-1 size-3" />
          )}
          {change} 지난 달 대비
        </p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage(): ReactNode {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Boardgame Platform 관리자 대시보드</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="총 매장 수"
          value="24"
          change="+12%"
          changeType="increase"
          icon={<Building2 className="size-5 text-primary" />}
        />
        <StatCard
          title="총 게임 수"
          value="1,248"
          change="+8%"
          changeType="increase"
          icon={<Gamepad2 className="size-5 text-primary" />}
        />
        <StatCard
          title="이번 달 주문"
          value="3,456"
          change="+23%"
          changeType="increase"
          icon={<ShoppingCart className="size-5 text-primary" />}
        />
        <StatCard
          title="활성 회원"
          value="12,345"
          change="-2%"
          changeType="decrease"
          icon={<Users className="size-5 text-primary" />}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>최근 주문</CardTitle>
            <CardDescription>최근 5개 주문 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">주문 #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">강남점 · 테이블 {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{(15000 * i).toLocaleString()}원</p>
                    <p className="text-xs text-muted-foreground">{i}분 전</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>매장별 현황</CardTitle>
            <CardDescription>실시간 매장 운영 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['강남점', '홍대점', '신촌점', '건대점', '잠실점'].map((store, i) => (
                <div key={store} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                      <Building2 className="size-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{store}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{10 - i}명 이용중</span>
                    <span
                      className={`size-2 rounded-full ${i < 2 ? 'bg-green-500' : i < 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
