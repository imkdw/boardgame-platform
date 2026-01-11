import { plainToInstance } from 'class-transformer';
import { Store } from '@prisma/client';
import { StoreDto } from '../dto/store.dto';

export function toStoreDto(store: Store): StoreDto {
  return plainToInstance(StoreDto, {
    id: store.id,
    name: store.name,
    address: store.address,
    wifiName: store.wifiName,
    wifiPassword: store.wifiPassword,
    contact: store.contact,
    introVideoUrl: store.introVideoUrl,
    ip: store.ip,
    latitude: store.latitude,
    longitude: store.longitude,
  } satisfies StoreDto);
}
