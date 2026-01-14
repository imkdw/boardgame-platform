'use client';

import { Button } from '@repo/ui';
import { Minus, Plus } from 'lucide-react';
import { MIN_OPTIONS, MAX_OPTIONS } from '../data/default-colors';

interface Props {
  count: number;
  onCountChange: (count: number) => void;
  labels: {
    optionCount: string;
    countUnit: string;
    countRange: string;
  };
}

export function OptionCounter({ count, onCountChange, labels }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">{labels.optionCount}</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onCountChange(Math.max(MIN_OPTIONS, count - 1))}
            disabled={count <= MIN_OPTIONS}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-lg font-bold">
            {count}
            {labels.countUnit}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onCountChange(Math.min(MAX_OPTIONS, count + 1))}
            disabled={count >= MAX_OPTIONS}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{labels.countRange}</span>
    </div>
  );
}
