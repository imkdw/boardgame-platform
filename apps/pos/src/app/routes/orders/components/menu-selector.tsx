import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui';
import { mockMenuCategories, mockMenuItems } from '@/lib/mock-data';
import { MenuCard } from './menu-card';
import type { MenuItem } from '@/types/pos';
import { SectionHeader } from '@/components/shared/section-header';

interface Props {
  onAddItem: (item: MenuItem) => void;
}

export function MenuSelector({ onAddItem }: Props) {
  const [activeCategory, setActiveCategory] = useState(mockMenuCategories[0]?.id ?? '');

  return (
    <div className="space-y-4">
      <SectionHeader title="메뉴 선택" />

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          {mockMenuCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {mockMenuCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-4 gap-4">
              {mockMenuItems
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <MenuCard key={item.id} item={item} onAdd={() => onAddItem(item)} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
