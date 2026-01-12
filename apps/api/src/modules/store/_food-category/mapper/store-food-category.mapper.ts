import { plainToInstance } from 'class-transformer';
import { StoreFoodCategory } from '@prisma/client';
import { StoreFoodCategoryDto } from '../dto/store-food-category.dto';
import { StoreFoodCategoryItemDto } from '../dto/store-food-category-item.dto';
import { CategoryItemWithFood } from '../types/store-food-category.types';
import { toStoreFoodDto } from '../../_food/mapper/store-food.mapper';

export function toStoreFoodCategoryDto(category: StoreFoodCategory, foodCount = 0): StoreFoodCategoryDto {
  return plainToInstance(StoreFoodCategoryDto, {
    id: category.id,
    storeId: category.storeId,
    name: category.name,
    foodCount,
  } satisfies StoreFoodCategoryDto);
}

export function toStoreFoodCategoryItemDto(item: CategoryItemWithFood): StoreFoodCategoryItemDto {
  return plainToInstance(StoreFoodCategoryItemDto, {
    ...toStoreFoodDto(item.food),
    order: item.order,
  } satisfies StoreFoodCategoryItemDto);
}
