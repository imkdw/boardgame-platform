import type { ReactNode } from 'react';

import { getStoreById } from '@/lib';

import { InfoVideoContent } from './info-video-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InfoVideoPage({ params }: Props): Promise<ReactNode> {
  const { slug } = await params;
  const store = await getStoreById(slug);

  return <InfoVideoContent introVideoUrl={store.introVideoUrl} />;
}
