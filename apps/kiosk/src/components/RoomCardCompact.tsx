import { Card, Badge, cn } from '@repo/ui';
import { Users, Star } from 'lucide-react';
import type { Room } from '../types/kiosk';
import { useTranslation } from 'react-i18next';
import type { KeyboardEvent } from 'react';

interface Props {
  room: Room;
  isSelected?: boolean;
  isRecommended?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function RoomCardCompact({ room, isSelected, isRecommended, onClick, disabled }: Props) {
  const { t } = useTranslation();
  const isOccupied = room.status === 'occupied';
  const isDisabled = disabled || isOccupied;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      aria-label={t('room.name', { number: room.number })}
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center p-4 transition-all min-h-[120px] !border-[3px]',
        isDisabled && 'cursor-not-allowed opacity-50',
        isSelected && 'border-primary bg-primary/10 shadow-md',
        !isSelected && 'border-transparent',
        !isDisabled && !isSelected && 'hover:shadow-lg hover:bg-muted/50'
      )}
    >
      {isRecommended && (
        <div className="absolute top-2 right-2">
          <Star className="size-5 fill-primary text-primary" />
        </div>
      )}

      <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-muted text-3xl font-bold">
        {room.number}
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Users className="size-4" />
          <span>{t('room.capacity', { min: room.minCapacity, max: room.maxCapacity })}</span>
        </div>
      </div>

      {isOccupied && (
        <Badge variant="error" className="mt-2 text-xs">
          {t('room.occupied')}
        </Badge>
      )}
    </Card>
  );
}
