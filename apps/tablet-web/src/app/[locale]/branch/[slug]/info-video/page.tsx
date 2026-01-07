'use client';

import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Home } from 'lucide-react';
import { cn } from '@repo/ui';

import { VideoPlayer } from '@/components/tablet/video-player';
import { useRouter } from '@/i18n/navigation';

export default function InfoVideoPage(): ReactNode {
  const t = useTranslations('InfoVideo');
  const router = useRouter();

  const handleVideoEnded = useCallback(() => router.push('/'), [router]);
  const handleBackClick = useCallback(() => router.push('/'), [router]);

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header
        className={cn(
          'absolute left-0 right-0 top-0 z-10',
          'flex items-center justify-between px-6 py-4',
          'bg-gradient-to-b from-black/80 to-transparent'
        )}
      >
        <button
          onClick={handleBackClick}
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-2',
            'bg-white/10 text-white backdrop-blur-sm',
            'transition-colors hover:bg-white/20'
          )}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">{t('back')}</span>
        </button>

        <div className="flex items-center gap-2 text-white">
          <Home className="h-5 w-5 opacity-70" />
          <span className="text-lg font-semibold">{t('title')}</span>
        </div>

        <div className="w-24" />
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <VideoPlayer
            src="/videos/movie.mp4"
            autoplay={true}
            loop={false}
            onEnded={handleVideoEnded}
            className="overflow-hidden rounded-2xl shadow-2xl"
          />
        </div>
      </main>

      <footer
        className={cn(
          'absolute bottom-0 left-0 right-0',
          'flex items-center justify-center px-6 py-4',
          'bg-gradient-to-t from-black/80 to-transparent'
        )}
      >
        <p className="text-sm text-white/60">{t('autoReturnMessage')}</p>
      </footer>
    </div>
  );
}
