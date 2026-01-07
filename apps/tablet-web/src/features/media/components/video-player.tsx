'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface Props {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  onReady?: (player: Player) => void;
  className?: string;
}

export function VideoPlayer({ src, poster, autoplay = true, loop = false, onEnded, onReady, className }: Props) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered', 'vjs-fluid');
    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      controls: true,
      autoplay,
      loop,
      preload: 'auto',
      fluid: true,
      responsive: true,
      poster,
      sources: [
        {
          src,
          type: 'video/mp4',
        },
      ],
      controlBar: {
        playToggle: true,
        volumePanel: true,
        currentTimeDisplay: true,
        timeDivider: true,
        durationDisplay: true,
        progressControl: true,
        remainingTimeDisplay: false,
        fullscreenToggle: true,
      },
    });

    playerRef.current = player;

    player.ready(() => {
      onReady?.(player);
    });

    if (onEnded) {
      player.on('ended', onEnded);
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster, autoplay, loop, onEnded, onReady]);

  return (
    <div data-vjs-player className={className}>
      <div ref={videoRef} />
    </div>
  );
}
