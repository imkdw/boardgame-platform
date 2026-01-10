import { FoodCard, type FoodCardItem } from '@repo/ui';
import type { MenuItem } from '@/types/pos';

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

export function MenuCard({ item, onAdd }: Props) {
  // MenuItem을 FoodCardItem으로 변환
  const foodCardItem: FoodCardItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    thumbnail: item.thumbnail ? `./images/${item.thumbnail}` : undefined,
    isAvailable: item.isAvailable,
    isPopular: item.isPopular,
    isNew: item.isNew,
  };

  return (
    <FoodCard
      food={foodCardItem}
      locale="ko"
      onAddToCart={onAdd}
      showImage={true}
    />
  );
}
