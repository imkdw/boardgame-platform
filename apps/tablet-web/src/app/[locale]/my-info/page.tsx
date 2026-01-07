import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { isValidLocale } from '@repo/i18n';
import { notFound } from 'next/navigation';
import { User } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function MyInfoPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <MyInfoContent />;
}

function MyInfoContent() {
  const t = useTranslations('MyInfo');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <User className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
      <p className="text-muted-foreground">{t('comingSoon')}</p>
    </div>
  );
}
