import { Card, Badge, cn } from '@repo/ui';
import { Users, DoorOpen, DoorClosed, Star } from 'lucide-react';
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

export function RoomCard({ room, isSelected, isRecommended, onClick, disabled }: Props) {
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
        'relative cursor-pointer p-6 transition-all',
        isDisabled && 'cursor-not-allowed opacity-50',
        isSelected && 'ring-4 ring-primary',
        !isDisabled && !isSelected && 'hover:shadow-lg'
      )}
    >
      {isRecommended && (
        <Badge className="absolute -top-2 left-4 gap-1 bg-primary text-white">
          <Star className="size-3" />
          {t('room.recommended')}
        </Badge>
      )}

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">{t('room.name', { number: room.number })}</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="size-5" />
            <span className="text-lg">
              {t('room.capacity', { min: room.minCapacity, max: room.maxCapacity })}
            </span>
          </div>
          {room.description && <p className="text-sm text-muted-foreground">{room.description}</p>}
        </div>

        <div className="flex flex-col items-end gap-2">
          {isOccupied ? (
            <>
              <DoorClosed className="size-8 text-status-error" />
              <Badge variant="error">{t('room.occupied')}</Badge>
            </>
          ) : (
            <>
              <DoorOpen className="size-8 text-status-complete" />
              <Badge variant="complete">{t('room.available')}</Badge>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
