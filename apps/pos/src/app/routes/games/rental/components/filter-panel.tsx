import { Input, Checkbox, Label } from '@repo/ui';
import { Search } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function FilterPanel({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: Props) {
  return (
    <div className="w-48 shrink-0 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="게임 검색"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">카테고리</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategory === category}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <Label htmlFor={`category-${category}`} className="cursor-pointer">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
