import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { changeLanguage, getCurrentLanguage, kioskLocales, type KioskLocale } from '../i18n';

const localeFlags: Record<KioskLocale, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
};

const localeNames: Record<KioskLocale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
};

export function LocaleSwitcher(): ReactNode {
  const { t } = useTranslation();
  const currentLocale = getCurrentLanguage();

  const handleChange = (newLocale: string) => {
    changeLanguage(newLocale as KioskLocale);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Globe className="size-5 text-muted-foreground" />
      <select
        className="rounded-xl border border-border bg-background px-4 py-2 text-lg text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        value={currentLocale}
        onChange={e => handleChange(e.target.value)}
        aria-label={t('localeSwitcher.label')}
      >
        {kioskLocales.map(locale => (
          <option key={locale} value={locale}>
            {localeFlags[locale]} {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
