import { Card, Badge, cn } from '@repo/ui';
import { Clock, Star, Infinity } from 'lucide-react';
import type { TimePackage } from '../types/kiosk';
import { getPrice, formatPrice } from '../lib/mock-data';
import { useTranslation } from 'react-i18next';

interface Props {
  pkg: TimePackage;
  isSelected?: boolean;
  onClick?: () => void;
}

export function TimePackageCard({ pkg, isSelected, onClick }: Props) {
  const { t } = useTranslation();
  const price = getPrice(pkg);

  return (
    <Card
      onClick={onClick}
      className={cn(
        'relative cursor-pointer p-6 transition-all',
        isSelected && 'ring-4 ring-primary',
        !isSelected && 'hover:shadow-lg',
        pkg.isRecommended && 'border-primary'
      )}
    >
      {pkg.isRecommended && (
        <Badge className="absolute -top-2 left-4 gap-1 bg-primary text-white">
          <Star className="size-3" />
          {t('time.recommended')}
        </Badge>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {pkg.isUnlimited ? <Infinity className="size-10 text-primary" /> : <Clock className="size-10 text-primary" />}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">{pkg.label}</h3>
            {!pkg.isUnlimited && <span className="text-muted-foreground">{pkg.durationMinutes}분</span>}
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-primary">{formatPrice(price)}</p>
        </div>
      </div>
    </Card>
  );
}
