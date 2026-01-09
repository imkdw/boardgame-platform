import { Button, cn } from '@repo/ui';
import { Users } from 'lucide-react';

interface Props {
  count: number | string;
  isSelected?: boolean;
  onClick: () => void;
}

export function PeopleCountButton({ count, isSelected, onClick }: Props) {
  const displayText = typeof count === 'number' ? `${count}명` : count;

  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      onClick={onClick}
      className={cn(
        'flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-2xl text-xl font-semibold transition-all',
        isSelected && 'ring-4 ring-primary/30'
      )}
    >
      <Users className="size-8" />
      <span>{displayText}</span>
    </Button>
  );
}
