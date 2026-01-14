'use client';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui';
import { PartyPopper } from 'lucide-react';
import type { RouletteOption } from '../types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: RouletteOption | null;
  labels: {
    title: string;
    playAgain: string;
    close: string;
  };
  onPlayAgain: () => void;
}

export function ResultDialog({ open, onOpenChange, result, labels, onPlayAgain }: Props) {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <PartyPopper className="h-6 w-6 text-yellow-500" />
            {labels.title}
            <PartyPopper className="h-6 w-6 text-yellow-500" />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div
            className="mx-auto flex h-32 w-32 items-center justify-center rounded-full text-white shadow-lg"
            style={{ backgroundColor: result.color }}
          >
            <span className="text-center text-xl font-bold">{result.label}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              {labels.close}
            </Button>
            <Button className="flex-1" onClick={onPlayAgain}>
              {labels.playAgain}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
