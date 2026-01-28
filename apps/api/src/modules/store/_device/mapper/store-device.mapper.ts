import { plainToInstance } from 'class-transformer';
import { StoreDevice } from '@prisma/client';
import { StoreDeviceDto } from '../dto/store-device.dto';

export function toStoreDeviceDto(device: StoreDevice): StoreDeviceDto {
  return plainToInstance(StoreDeviceDto, {
    id: device.id,
    storeId: device.storeId,
    roomId: device.roomId,
    deviceId: device.deviceId,
    name: device.name,
  } satisfies StoreDeviceDto);
}
