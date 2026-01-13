import { plainToInstance } from 'class-transformer';
import { StoreTimePlan } from '@prisma/client';
import { StoreTimePlanDto } from '../dto/store-time-plan.dto';

export function toStoreTimePlanDto(timePlan: StoreTimePlan): StoreTimePlanDto {
  return plainToInstance(StoreTimePlanDto, {
    id: timePlan.id,
    storeId: timePlan.storeId,
    name: timePlan.name,
    durationMinutes: timePlan.durationMinutes,
    price: timePlan.price,
    isRecommended: timePlan.isRecommended,
    sort: timePlan.sort,
    createdAt: timePlan.createdAt,
  } satisfies StoreTimePlanDto);
}
