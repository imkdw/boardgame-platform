'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SessionHeader } from './session-header';
import { BottomNavigation } from './bottom-navigation';
import { StaffCallDialog } from '@/components/dialogs';

interface Props {
  children: ReactNode;
}

export function SessionLayout({ children }: Props) {
  const t = useTranslations('TabletHome');
  const [staffCallDialogOpen, setStaffCallDialogOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <SessionHeader onStaffCall={() => setStaffCallDialogOpen(true)} />
      <main className="flex flex-1 flex-col overflow-hidden pb-16">{children}</main>
      <BottomNavigation />
      <StaffCallDialog
        open={staffCallDialogOpen}
        onOpenChange={setStaffCallDialogOpen}
        title={t('dialogs.staffCall.title')}
        message={t('dialogs.staffCall.message')}
        confirmText={t('dialogs.staffCall.confirm')}
        cancelText={t('dialogs.staffCall.cancel')}
        successMessage={t('dialogs.staffCall.success')}
      />
    </div>
  );
}
