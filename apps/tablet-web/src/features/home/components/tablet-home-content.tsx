'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Search, UtensilsCrossed, Dices, Home, Wifi, Bell } from 'lucide-react';
import type { Store } from '@repo/types';

import { WifiInfoDialog, StaffCallDialog } from '@/components/dialogs';
import { MenuCard } from './menu-card';
import { QuickActionCard } from './quick-action-card';

interface Props {
  store: Store;
}

export function TabletHomeContent({ store }: Props) {
  const t = useTranslations('TabletHome');
  const [wifiDialogOpen, setWifiDialogOpen] = useState(false);
  const [staffCallDialogOpen, setStaffCallDialogOpen] = useState(false);

  return (
    <>
      <div className="flex h-full flex-1 gap-6 p-6">
        <section className="flex-1">
          <div className="grid h-full grid-cols-2 gap-4">
            <MenuCard
              title={t('menu.storeIntro.title')}
              subtitle={t('menu.storeIntro.subtitle')}
              icon={<Play className="h-12 w-12" />}
              href="/branch/1/info-video"
              variant="primary"
            />
            <MenuCard
              title={t('menu.gameSearch.title')}
              subtitle={t('menu.gameSearch.subtitle')}
              icon={<Search className="h-12 w-12" />}
              href="/games"
              variant="progress"
            />
            <MenuCard
              title={t('menu.foodMenu.title')}
              subtitle={t('menu.foodMenu.subtitle')}
              icon={<UtensilsCrossed className="h-12 w-12" />}
              href="/food-order"
              variant="complete"
            />
            <MenuCard
              title={t('menu.penaltyGame.title')}
              subtitle={t('menu.penaltyGame.subtitle')}
              icon={<Dices className="h-12 w-12" />}
              href="/penalty-game"
              variant="warning"
            />
          </div>
        </section>

        <aside className="w-80 shrink-0 space-y-4">
          <div className="rounded-xl border border-border bg-primary p-6 text-center text-white">
            <p className="text-sm font-medium opacity-90">{store.name}</p>
            <p className="mt-2 text-3xl font-bold">
              {t('header.tableLabel')}: {t('tableInfo.tableNumber')}
            </p>
          </div>

          <QuickActionCard
            title={t('quickActions.storeGuide.title')}
            subtitle={t('quickActions.storeGuide.subtitle')}
            icon={<Home className="h-6 w-6" />}
          />
          <QuickActionCard
            title={t('quickActions.wifi.title')}
            subtitle={t('quickActions.wifi.subtitle')}
            icon={<Wifi className="h-6 w-6" />}
            onClick={() => setWifiDialogOpen(true)}
          />
          <QuickActionCard
            title={t('quickActions.staffCall.title')}
            subtitle={t('quickActions.staffCall.subtitle')}
            icon={<Bell className="h-6 w-6" />}
            onClick={() => setStaffCallDialogOpen(true)}
          />
        </aside>
      </div>

      <WifiInfoDialog
        open={wifiDialogOpen}
        onOpenChange={setWifiDialogOpen}
        title={t('dialogs.wifi.title')}
        ssidLabel={t('dialogs.wifi.ssidLabel')}
        ssid={store.wifiName}
        passwordLabel={t('dialogs.wifi.passwordLabel')}
        password={store.wifiPassword}
        qrScanHint={t('dialogs.wifi.qrScanHint')}
        closeText={t('dialogs.wifi.close')}
      />
      <StaffCallDialog
        open={staffCallDialogOpen}
        onOpenChange={setStaffCallDialogOpen}
        title={t('dialogs.staffCall.title')}
        message={t('dialogs.staffCall.message')}
        confirmText={t('dialogs.staffCall.confirm')}
        cancelText={t('dialogs.staffCall.cancel')}
        successMessage={t('dialogs.staffCall.success')}
      />
    </>
  );
}
