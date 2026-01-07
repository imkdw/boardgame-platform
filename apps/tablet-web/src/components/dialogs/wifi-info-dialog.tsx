'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@repo/ui';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  ssidLabel: string;
  ssid: string;
  passwordLabel: string;
  password: string;
  closeText: string;
}

export function WifiInfoDialog({
  open,
  onOpenChange,
  title,
  ssidLabel,
  ssid,
  passwordLabel,
  password,
  closeText,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-1 text-sm text-muted-foreground">{ssidLabel}</p>
            <p className="text-lg font-semibold text-foreground">{ssid}</p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-1 text-sm text-muted-foreground">{passwordLabel}</p>
            <p className="font-mono text-lg font-semibold text-foreground">{password}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} size="touch" className="w-full">
            {closeText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
