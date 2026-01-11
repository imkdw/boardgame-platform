import { Injectable } from '@nestjs/common';
import { StoreValidator } from '@repo/server-shared';
import { StoreDto } from '../dto/store.dto';
import { toStoreDto } from '../mapper/store.mapper';

@Injectable()
export class FindStoreByIpUseCase {
  constructor(private readonly storeValidator: StoreValidator) {}

  async execute(ip: string): Promise<StoreDto> {
    const store = await this.storeValidator.checkExistByIp(ip);

    return toStoreDto(store);
  }
}
