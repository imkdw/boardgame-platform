import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { cn } from '@repo/ui';
import { locales, isValidLocale } from '@repo/i18n';
import { pretendard } from '@repo/fonts/next';
import { notFound } from 'next/navigation';
import { ToastProvider } from '@/components/shared';
import { FullscreenToggle } from '@/components/layout/fullscreen-toggle';
import '../globals.css';

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props): Promise<ReactNode> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={pretendard.variable} suppressHydrationWarning>
      <body className={cn(pretendard.className, 'min-h-screen bg-background antialiased')}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <FullscreenToggle />
        <ToastProvider />
      </body>
    </html>
  );
}
