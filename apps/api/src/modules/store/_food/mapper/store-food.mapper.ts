import { plainToInstance } from 'class-transformer';
import { StoreFood } from '@prisma/client';
import { StoreFoodDto } from '../dto/store-food.dto';

export function toStoreFoodDto(storeFood: StoreFood): StoreFoodDto {
  return plainToInstance(StoreFoodDto, {
    id: storeFood.id,
    storeId: storeFood.storeId,
    name: storeFood.name,
    description: storeFood.description,
    price: storeFood.price,
    isPopular: storeFood.isPopular,
    isNew: storeFood.isNew,
    imageUrl: storeFood.imageUrl,
  } satisfies StoreFoodDto);
}
