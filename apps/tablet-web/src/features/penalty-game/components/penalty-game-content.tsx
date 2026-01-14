'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@repo/ui';
import { RotateCcw, Play } from 'lucide-react';

import { RouletteWheel } from './roulette-wheel';
import { OptionCounter } from './option-counter';
import { OptionInputDialog } from './option-input-dialog';
import { ResultDialog } from './result-dialog';
import { ROULETTE_COLORS, DEFAULT_OPTIONS } from '../data/default-colors';
import type { RouletteOption } from '../types';

export function PenaltyGameContent() {
  const t = useTranslations('PenaltyGame');

  const [optionCount, setOptionCount] = useState(DEFAULT_OPTIONS);
  const [optionLabels, setOptionLabels] = useState<string[]>(() => Array(DEFAULT_OPTIONS).fill(''));
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RouletteOption | null>(null);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<number | null>(null);

  const options: RouletteOption[] = useMemo(
    () =>
      Array.from({ length: optionCount }, (_, i) => ({
        id: `option-${i}`,
        label: optionLabels[i] ?? '',
        color: ROULETTE_COLORS[i % ROULETTE_COLORS.length] ?? ROULETTE_COLORS[0],
      })),
    [optionCount, optionLabels]
  );

  const filledOptionsCount = useMemo(() => optionLabels.slice(0, optionCount).filter((label) => label.trim()).length, [optionLabels, optionCount]);

  const getDefaultLabel = useCallback((index: number) => t('defaultOption', { number: index + 1 }), [t]);

  const handleOptionCountChange = useCallback((newCount: number) => {
    setOptionCount(newCount);
    setOptionLabels((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length).fill('')];
      }
      return prev;
    });
  }, []);

  const handleSliceClick = useCallback((index: number) => {
    setEditingOption(index);
  }, []);

  const handleSaveOption = useCallback((value: string) => {
    if (editingOption === null) return;
    setOptionLabels((prev) => {
      const newLabels = [...prev];
      newLabels[editingOption] = value;
      return newLabels;
    });
  }, [editingOption]);

  const handleSpin = useCallback(() => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const finalAngle = totalRotation % 360;
      const sliceAngle = 360 / optionCount;
      const pointerAngle = (360 - finalAngle + 90) % 360;
      const selectedIndex = Math.floor(pointerAngle / sliceAngle) % optionCount;

      const selectedOption = options[selectedIndex];
      if (selectedOption) {
        setResult(selectedOption);
      }
      setSpinning(false);
      setResultDialogOpen(true);
    }, 4000);
  }, [spinning, rotation, optionCount, options]);

  const handleReset = useCallback(() => {
    setOptionLabels(Array(optionCount).fill(''));
    setRotation(0);
    setResult(null);
  }, [optionCount]);

  const handlePlayAgain = useCallback(() => {
    setResultDialogOpen(false);
    setTimeout(() => {
      handleSpin();
    }, 300);
  }, [handleSpin]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center gap-6 overflow-auto p-6">
        {/* Option Counter */}
        <OptionCounter
          count={optionCount}
          onCountChange={handleOptionCountChange}
          labels={{
            optionCount: t('optionCount'),
            countUnit: t('countUnit'),
            countRange: t('countRange'),
          }}
        />

        {/* Roulette Area */}
        <div className="flex flex-col items-center">
          <p className="mb-4 text-center text-sm text-muted-foreground">{t('clickToEdit')}</p>
          <RouletteWheel options={options} rotation={rotation} spinning={spinning} onSliceClick={handleSliceClick} getDefaultLabel={getDefaultLabel} />
          <p className="mt-4 text-center text-sm font-medium">
            <span className="text-primary">{filledOptionsCount}</span>
            {t('filledCount')} / {t('total')} {optionCount}
            {t('countUnit')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={handleReset} disabled={spinning}>
            <RotateCcw className="mr-2 h-5 w-5" />
            {t('reset')}
          </Button>
          <Button size="lg" onClick={handleSpin} disabled={spinning || filledOptionsCount < 2}>
            <Play className="mr-2 h-5 w-5" />
            {spinning ? t('spinning') : t('spin')}
          </Button>
        </div>
      </div>

      {/* Option Input Dialog */}
      <OptionInputDialog
        open={editingOption !== null}
        onOpenChange={(open) => !open && setEditingOption(null)}
        initialValue={editingOption !== null ? (optionLabels[editingOption] ?? '') : ''}
        optionIndex={editingOption ?? 0}
        onSave={handleSaveOption}
        labels={{
          title: t('dialog.title'),
          placeholder: t('dialog.placeholder'),
          save: t('dialog.save'),
          cancel: t('dialog.cancel'),
        }}
      />

      {/* Result Dialog */}
      <ResultDialog
        open={resultDialogOpen}
        onOpenChange={setResultDialogOpen}
        result={result}
        labels={{
          title: t('result.title'),
          playAgain: t('result.playAgain'),
          close: t('result.close'),
        }}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}
