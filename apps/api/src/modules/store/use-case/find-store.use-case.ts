import { Injectable } from '@nestjs/common';
import { StoreValidator } from '@repo/server-shared';
import { StoreDto } from '../dto/store.dto';
import { toStoreDto } from '../mapper/store.mapper';

@Injectable()
export class FindStoreUseCase {
  constructor(private readonly storeValidator: StoreValidator) {}

  async execute(storeId: string): Promise<StoreDto> {
    const store = await this.storeValidator.checkExist(storeId);
    return toStoreDto(store);
  }
}
