import { Injectable } from '@nestjs/common';
import { StoreRoomValidator, StoreValidator } from '@repo/server-shared';
import { StoreRoomDto } from '../dto/store-room.dto';
import { toStoreRoomDto } from '../mapper/store-room.mapper';

@Injectable()
export class FindStoreRoomUseCase {
  constructor(
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator
  ) {}

  async execute(storeId: string, roomId: string): Promise<StoreRoomDto> {
    await this.storeValidator.checkExist(storeId);
    const room = await this.storeRoomValidator.checkExist(storeId, roomId);

    return toStoreRoomDto(room);
  }
}
