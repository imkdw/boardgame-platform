import { Card } from '@repo/ui';
import { Users, DoorOpen, Clock } from 'lucide-react';
import type { Room, TimePackage } from '../types/kiosk';
import { getPrice, formatPrice } from '../lib/mock-data';
import { useTranslation } from 'react-i18next';

interface Props {
  peopleCount: number;
  room: Room | null;
  timePackage: TimePackage | null;
}

export function SummaryCard({ peopleCount, room, timePackage }: Props) {
  const { t } = useTranslation();
  const price = timePackage ? getPrice(timePackage) : 0;

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-xl font-bold">{t('payment.summary')}</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <DoorOpen className="size-5" />
            <span>{t('payment.room')}</span>
          </div>
          <span className="text-lg font-semibold">{room ? `${room.number}번 방` : '-'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Users className="size-5" />
            <span>{t('payment.people')}</span>
          </div>
          <span className="text-lg font-semibold">{peopleCount}명</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="size-5" />
            <span>{t('payment.time')}</span>
          </div>
          <span className="text-lg font-semibold">{timePackage ? timePackage.label : '-'}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{t('payment.total')}</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(price)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
