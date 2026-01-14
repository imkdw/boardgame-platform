'use client';

import { useCallback, useMemo } from 'react';
import { cn } from '@repo/ui';
import type { RouletteOption } from '../types';

interface Props {
  options: RouletteOption[];
  rotation: number;
  spinning: boolean;
  onSliceClick: (index: number) => void;
  getDefaultLabel: (index: number) => string;
}

export function RouletteWheel({ options, rotation, spinning, onSliceClick, getDefaultLabel }: Props) {
  const sliceAngle = 360 / options.length;

  const getSlicePath = useCallback(
    (index: number) => {
      const startAngle = index * sliceAngle - 90;
      const endAngle = startAngle + sliceAngle;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const radius = 180;
      const centerX = 200;
      const centerY = 200;

      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      const largeArcFlag = sliceAngle > 180 ? 1 : 0;

      return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    },
    [sliceAngle]
  );

  const getLabelPosition = useCallback(
    (index: number) => {
      const angle = index * sliceAngle + sliceAngle / 2 - 90;
      const rad = (angle * Math.PI) / 180;
      const radius = 115;
      const centerX = 200;
      const centerY = 200;

      // Calculate rotation so text is always readable (not upside down)
      // Normalize angle to 0-360 range
      const normalizedAngle = ((angle % 360) + 360) % 360;
      // Flip text 180 degrees when it would appear upside down (right side of wheel)
      const shouldFlip = normalizedAngle >= 0 && normalizedAngle < 180;
      const textRotation = shouldFlip ? angle + 90 + 180 : angle + 90;

      return {
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad),
        rotation: textRotation,
      };
    },
    [sliceAngle]
  );

  const slices = useMemo(
    () =>
      options.map((option, index) => ({
        path: getSlicePath(index),
        labelPos: getLabelPosition(index),
        option,
        index,
      })),
    [options, getSlicePath, getLabelPosition]
  );

  return (
    <div className="relative">
      {/* Pointer at top */}
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-3">
        <div className="h-0 w-0 border-x-[16px] border-t-[28px] border-x-transparent border-t-gray-800" />
      </div>

      {/* Wheel - responsive sizing based on viewport */}
      <svg
        viewBox="0 0 400 400"
        className={cn('h-[min(70vw,500px)] w-[min(70vw,500px)]', spinning && 'pointer-events-none')}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
        }}
      >
        {/* Slices */}
        {slices.map(({ path, labelPos, option, index }) => (
          <g key={option.id}>
            <path
              d={path}
              fill={option.color}
              stroke="#374151"
              strokeWidth="2"
              className={cn('cursor-pointer transition-opacity hover:opacity-80', spinning && 'cursor-not-allowed')}
              onClick={() => !spinning && onSliceClick(index)}
            />
            <foreignObject
              x={labelPos.x - 50}
              y={labelPos.y - 16}
              width="100"
              height="32"
              style={{ transform: `rotate(${labelPos.rotation}deg)`, transformOrigin: `${labelPos.x}px ${labelPos.y}px` }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="max-w-[95px] truncate rounded bg-white/95 px-2 py-1 text-sm font-semibold text-gray-800 shadow-sm"
                  title={option.label}
                >
                  {option.label || getDefaultLabel(index)}
                </span>
              </div>
            </foreignObject>
          </g>
        ))}

        {/* Center circle */}
        <circle cx="200" cy="200" r="16" fill="#374151" />
      </svg>
    </div>
  );
}
