import { Injectable } from '@nestjs/common';
import { StoreFoodValidator, StoreValidator } from '@repo/server-shared';
import { StoreFoodDto } from '../dto/store-food.dto';
import { toStoreFoodDto } from '../mapper/store-food.mapper';

@Injectable()
export class FindStoreFoodUseCase {
  constructor(
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodValidator: StoreFoodValidator,
  ) {}

  async execute(storeId: string, foodId: string): Promise<StoreFoodDto> {
    await this.storeValidator.checkExist(storeId);
    const storeFood = await this.storeFoodValidator.checkExist(storeId, foodId);
    return toStoreFoodDto(storeFood);
  }
}
