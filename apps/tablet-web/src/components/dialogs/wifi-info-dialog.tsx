'use client';

import { QRCodeSVG } from 'qrcode.react';
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
  qrScanHint: string;
}

/**
 * @see https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
 */
function generateWifiQrValue(ssid: string, password: string, security: 'WPA' | 'WEP' | 'nopass' = 'WPA'): string {
  const escapeSpecialChars = (str: string): string => {
    return str.replace(/([\\;,:"'])/g, '\\$1');
  };

  const escapedSsid = escapeSpecialChars(ssid);
  const escapedPassword = escapeSpecialChars(password);

  return `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};;`;
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
  qrScanHint,
}: Props) {
  const wifiQrValue = generateWifiQrValue(ssid, password);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl bg-white p-4">
              <QRCodeSVG value={wifiQrValue} size={180} level="M" />
            </div>
            <p className="text-center text-sm text-muted-foreground">{qrScanHint}</p>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-1 text-sm text-muted-foreground">{ssidLabel}</p>
              <p className="text-lg font-semibold text-foreground">{ssid}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-1 text-sm text-muted-foreground">{passwordLabel}</p>
              <p className="font-mono text-lg font-semibold text-foreground">{password}</p>
            </div>
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
