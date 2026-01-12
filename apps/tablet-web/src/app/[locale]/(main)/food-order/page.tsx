import type { ReactNode } from 'react';
import { FoodOrderContent } from '@/features/food-order';
import { getStoreByIp, getStoreFoodData, MOCK_SESSION } from '@/lib';

export default async function FoodOrderPage(): Promise<ReactNode> {
  // TODO: 임시 아이피 제거
  const store = await getStoreByIp('1.1.1.1');
  const { categories, foodsByCategory } = await getStoreFoodData(store.id);
  const isSessionActive = MOCK_SESSION.isActive;

  return (
    <FoodOrderContent categories={categories} foodsByCategory={foodsByCategory} isSessionActive={isSessionActive} />
  );
}
