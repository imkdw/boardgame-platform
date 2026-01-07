'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from '@repo/ui';
import { CheckCircle } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  successMessage: string;
}

export function StaffCallDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmText,
  cancelText,
  successMessage,
}: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setIsSuccess(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false}>
        {isSuccess ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-status-complete" />
            <p className="text-lg font-medium text-foreground">{successMessage}</p>
            <Button onClick={handleClose} size="touch" className="mt-6 w-full">
              {cancelText}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="text-base">{message}</DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4 gap-3 sm:gap-3">
              <Button variant="secondary" onClick={handleClose} size="touch" className="flex-1">
                {cancelText}
              </Button>
              <Button onClick={handleConfirm} size="touch" className="flex-1">
                {confirmText}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
