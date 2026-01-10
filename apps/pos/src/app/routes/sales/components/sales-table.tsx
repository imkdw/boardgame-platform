import { cn } from '@repo/ui';
import type { SalesRecord } from '../types';
import { CATEGORY_LABELS, PAYMENT_METHOD_LABELS } from '../types';

interface Props {
  records: SalesRecord[];
}

export function SalesTable({ records }: Props) {
  const formatTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      time_package: 'bg-purple-100 text-purple-700',
      food: 'bg-orange-100 text-orange-700',
      drink: 'bg-blue-100 text-blue-700',
      snack: 'bg-yellow-100 text-yellow-700',
      etc: 'bg-gray-100 text-gray-700',
    };
    return colors[category] ?? 'bg-gray-100 text-gray-700';
  };

  const getPaymentColor = (method: string) => {
    const colors: Record<string, string> = {
      card: 'bg-blue-50 text-blue-600',
      cash: 'bg-green-50 text-green-600',
      pg: 'bg-indigo-50 text-indigo-600',
    };
    return colors[method] ?? 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b px-5 py-4">
        <h3 className="font-semibold">오늘의 매출 내역</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">총 {records.length}건</p>
      </div>

      <div className="max-h-[400px] overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-muted/50 backdrop-blur">
            <tr className="border-b text-sm">
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">시간</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">주문번호</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">방번호</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">카테고리</th>
              <th className="px-5 py-3 text-left font-medium text-muted-foreground">상품</th>
              <th className="px-5 py-3 text-center font-medium text-muted-foreground">수량</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">단가</th>
              <th className="px-5 py-3 text-right font-medium text-muted-foreground">금액</th>
              <th className="px-5 py-3 text-center font-medium text-muted-foreground">결제</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => (
              <tr
                key={record.id}
                className={cn('border-b transition-colors hover:bg-muted/30', idx % 2 === 0 && 'bg-muted/10')}
              >
                <td className="px-5 py-3 text-sm">{formatTime(record.createdAt)}</td>
                <td className="px-5 py-3 font-mono text-sm">{record.orderNumber}</td>
                <td className="px-5 py-3 text-sm">
                  {record.roomNumber ? `${record.roomNumber}번` : '-'}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      getCategoryColor(record.category)
                    )}
                  >
                    {CATEGORY_LABELS[record.category]}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm">{record.itemName}</td>
                <td className="px-5 py-3 text-center text-sm">{record.quantity}</td>
                <td className="px-5 py-3 text-right text-sm tabular-nums">
                  {formatPrice(record.unitPrice)}원
                </td>
                <td className="px-5 py-3 text-right text-sm font-medium tabular-nums">
                  {formatPrice(record.totalPrice)}원
                </td>
                <td className="px-5 py-3 text-center">
                  <span
                    className={cn(
                      'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                      getPaymentColor(record.paymentMethod)
                    )}
                  >
                    {PAYMENT_METHOD_LABELS[record.paymentMethod]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
