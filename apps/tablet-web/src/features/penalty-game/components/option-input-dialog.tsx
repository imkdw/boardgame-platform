'use client';

import { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: string;
  optionIndex: number;
  onSave: (value: string) => void;
  labels: {
    title: string;
    placeholder: string;
    save: string;
    cancel: string;
  };
}

export function OptionInputDialog({ open, onOpenChange, initialValue, optionIndex, onSave, labels }: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
    }
  }, [open, initialValue]);

  const handleSave = () => {
    onSave(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {labels.title} {optionIndex + 1}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={labels.placeholder}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
            maxLength={20}
          />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              {labels.cancel}
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              {labels.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
