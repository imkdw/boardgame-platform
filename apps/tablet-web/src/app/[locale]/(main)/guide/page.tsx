import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { isValidLocale } from '@repo/i18n';
import { notFound } from 'next/navigation';
import { GuideCarousel, GuideFAQ, GUIDE_STEPS, FAQ_ITEMS } from '@/features/guide';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function GuidePage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <GuideContent />;
}

function GuideContent() {
  const t = useTranslations('Guide');

  return (
    <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
      </div>

      <div className="flex justify-center">
        <GuideCarousel steps={GUIDE_STEPS} />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <GuideFAQ items={FAQ_ITEMS} />
      </div>
    </div>
  );
}
