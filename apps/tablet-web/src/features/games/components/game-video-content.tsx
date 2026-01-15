'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Button, cn } from '@repo/ui';
import type Player from 'video.js/dist/types/player';

import { VideoPlayer } from '@/features/media';
import { Link } from '@/i18n/navigation';

interface Chapter {
  time: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface Props {
  gameId: string;
  gameName: string;
  videoSrc: string;
}

const chapters: Chapter[] = [
  {
    time: 0,
    title: '인트로',
    description: '게임의 세계관과 테마를 소개합니다',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 12,
    title: '게임 소개',
    description: '이 게임의 목표와 특징을 알아봅니다',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 24,
    title: '구성품 확인',
    description: '박스에 포함된 모든 구성품을 확인해보세요',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 36,
    title: '게임 준비',
    description: '게임을 시작하기 전 필요한 세팅 방법입니다',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 48,
    title: '기본 규칙',
    description: '게임의 핵심 규칙을 설명합니다',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 60,
    title: '턴 진행 방식',
    description: '각 플레이어의 턴에서 할 수 있는 행동들',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 72,
    title: '카드 사용법',
    description: '다양한 카드의 효과와 사용 타이밍',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 84,
    title: '점수 계산',
    description: '게임 종료 시 점수를 계산하는 방법',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 96,
    title: '특수 규칙',
    description: '예외 상황과 특별한 규칙들을 알아봅니다',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 108,
    title: '전략 팁 1',
    description: '초보자를 위한 기본 전략 가이드',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 120,
    title: '전략 팁 2',
    description: '승률을 높이는 고급 전략 소개',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 132,
    title: '자주 하는 실수',
    description: '많이 틀리는 규칙과 주의사항',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 144,
    title: '고급 전략',
    description: '숙련자를 위한 심화 전략 분석',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 156,
    title: '변형 규칙',
    description: '다양한 방식으로 즐기는 변형 규칙',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
  {
    time: 168,
    title: '마무리',
    description: '영상을 마무리하며 핵심 정리',
    thumbnail: 'https://static.imkdw.dev/maratang.webp',
  },
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function findCurrentChapterIndex(currentTime: number): number {
  for (let i = chapters.length - 1; i >= 0; i--) {
    const chapter = chapters[i];
    if (chapter && currentTime >= chapter.time) {
      return i;
    }
  }
  return 0;
}

export function GameVideoContent({ gameId, gameName, videoSrc }: Props) {
  const playerRef = useRef<Player | null>(null);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const activeChapterRef = useRef<number>(0);

  const handlePlayerReady = useCallback((player: Player) => {
    playerRef.current = player;

    player.on('timeupdate', () => {
      const currentTime = player.currentTime() ?? 0;
      const currentChapterIndex = findCurrentChapterIndex(currentTime);
      if (currentChapterIndex !== activeChapterRef.current) {
        activeChapterRef.current = currentChapterIndex;
        setActiveChapter(currentChapterIndex);
      }
    });
  }, []);

  const handleChapterClick = useCallback((time: number, index: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime(time);
      playerRef.current.play();
      activeChapterRef.current = index;
      setActiveChapter(index);
    }
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-4 border-b border-border p-4">
        <Link href={`/games/${gameId}`}>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">게임 설명 영상</h1>
          <p className="text-sm text-muted-foreground">{gameName}</p>
        </div>
      </div>

      {/* Main content - Video + Chapters */}
      <div className="flex min-h-0 flex-1 gap-4 p-4">
        {/* Video Player */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-black">
          <VideoPlayer
            src={videoSrc}
            autoplay={false}
            loop={false}
            fill
            onReady={handlePlayerReady}
            className="absolute inset-0"
          />
        </div>

        {/* Chapter List */}
        <div className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex-shrink-0 border-b border-border p-4">
            <h2 className="text-lg font-bold text-foreground">챕터</h2>
            <p className="text-sm text-muted-foreground">클릭하여 해당 구간으로 이동</p>
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3 scrollbar-hide">
            {chapters.map((chapter, index) => (
              <button
                type="button"
                key={chapter.time}
                onClick={() => handleChapterClick(chapter.time, index)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors outline-none focus:outline-none focus-visible:outline-none',
                  'hover:bg-primary/5 active:bg-primary/15',
                  activeChapter === index && 'bg-primary/10 ring-2 ring-primary'
                )}
              >
                {/* Thumbnail */}
                <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image src={chapter.thumbnail} alt={chapter.title} fill className="object-cover" sizes="96px" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                </div>
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        'truncate font-medium',
                        activeChapter === index ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {chapter.title}
                    </p>
                    <span
                      className={cn(
                        'flex-shrink-0 rounded-md px-2 py-1 text-xs font-medium',
                        activeChapter === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {formatTime(chapter.time)}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{chapter.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
