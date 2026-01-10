import { plainToInstance } from 'class-transformer';
import { StoreRoom } from '@prisma/client';
import { StoreRoomDto } from '../dto/store-room.dto';
import { StoreRoomStatus } from '@repo/consts';

export function toStoreRoomDto(room: StoreRoom): StoreRoomDto {
  return plainToInstance(StoreRoomDto, {
    id: room.id,
    storeId: room.storeId,
    roomNumber: room.roomNumber,
    status: room.status as StoreRoomStatus,
    minCapacity: room.minCapacity,
    maxCapacity: room.maxCapacity,
    description: room.description,
  } satisfies StoreRoomDto);
}
