import { Card, cn } from '@repo/ui';
import { CreditCard, Banknote, MessageCircle, Wallet, Check } from 'lucide-react';
import type { PaymentMethod } from '../types/kiosk';

interface Props {
  method: PaymentMethod;
  isSelected?: boolean;
  onClick?: () => void;
}

const iconMap = {
  CreditCard,
  Banknote,
  MessageCircle,
  Wallet,
};

export function PaymentMethodCard({ method, isSelected, onClick }: Props) {
  const IconComponent = iconMap[method.icon as keyof typeof iconMap] || CreditCard;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'relative cursor-pointer p-6 transition-all',
        isSelected && 'ring-4 ring-primary bg-primary/5',
        !isSelected && 'hover:shadow-lg'
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn('rounded-xl p-3', isSelected ? 'bg-primary text-white' : 'bg-muted')}>
          <IconComponent className="size-8" />
        </div>
        <span className="text-xl font-semibold">{method.label}</span>
        {isSelected && (
          <div className="ml-auto">
            <Check className="size-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
}
