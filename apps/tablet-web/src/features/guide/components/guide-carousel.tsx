'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Package, Clock, Bell, LogOut } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@repo/ui';
import type { GuideStep } from '../data/guide-steps';
import { GuideStepCard } from './guide-step-card';
import { StepIndicator } from './step-indicator';

interface Props {
  steps: GuideStep[];
}

const ICON_MAP = {
  Search,
  Package,
  Clock,
  Bell,
  LogOut,
} as const;

export function GuideCarousel({ steps }: Props) {
  const t = useTranslations();
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  const handleStepClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="w-full space-y-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: false,
        }}
        className="mx-auto w-full max-w-2xl"
      >
        <CarouselContent>
          {steps.map((step, index) => {
            const IconComponent = ICON_MAP[step.icon];
            return (
              <CarouselItem key={step.id}>
                <GuideStepCard
                  stepNumber={index + 1}
                  icon={<IconComponent className="h-10 w-10" />}
                  title={t(step.titleKey)}
                  description={t(step.descriptionKey)}
                  isActive={index === currentIndex}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <StepIndicator totalSteps={steps.length} currentStep={currentIndex} onStepClick={handleStepClick} />
    </div>
  );
}
