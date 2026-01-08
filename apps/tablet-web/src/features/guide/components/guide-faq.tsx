'use client';

import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui';
import type { FAQItem } from '../data/guide-steps';

interface Props {
  items: FAQItem[];
}

export function GuideFAQ({ items }: Props) {
  const t = useTranslations();

  return (
    <div className="w-full space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
        <HelpCircle className="h-6 w-6" />
        {t('Guide.faq.title')}
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {items.map(item => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-base font-medium">{t(item.questionKey)}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{t(item.answerKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
