export interface GuideStep {
  id: string;
  icon: 'Search' | 'Package' | 'Clock' | 'Bell' | 'LogOut';
  titleKey: string;
  descriptionKey: string;
}

export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: 'gameSearch',
    icon: 'Search',
    titleKey: 'Guide.steps.gameSearch.title',
    descriptionKey: 'Guide.steps.gameSearch.description',
  },
  {
    id: 'gameRental',
    icon: 'Package',
    titleKey: 'Guide.steps.gameRental.title',
    descriptionKey: 'Guide.steps.gameRental.description',
  },
  {
    id: 'timeExtension',
    icon: 'Clock',
    titleKey: 'Guide.steps.timeExtension.title',
    descriptionKey: 'Guide.steps.timeExtension.description',
  },
  {
    id: 'staffCall',
    icon: 'Bell',
    titleKey: 'Guide.steps.staffCall.title',
    descriptionKey: 'Guide.steps.staffCall.description',
  },
  {
    id: 'exit',
    icon: 'LogOut',
    titleKey: 'Guide.steps.exit.title',
    descriptionKey: 'Guide.steps.exit.description',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'timeExpired',
    questionKey: 'Guide.faq.timeExpired.question',
    answerKey: 'Guide.faq.timeExpired.answer',
  },
  {
    id: 'changeGame',
    questionKey: 'Guide.faq.changeGame.question',
    answerKey: 'Guide.faq.changeGame.answer',
  },
  {
    id: 'payment',
    questionKey: 'Guide.faq.payment.question',
    answerKey: 'Guide.faq.payment.answer',
  },
  {
    id: 'gameRules',
    questionKey: 'Guide.faq.gameRules.question',
    answerKey: 'Guide.faq.gameRules.answer',
  },
];
