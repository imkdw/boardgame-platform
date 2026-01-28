import { Module } from '@nestjs/common';
import { StoreDeviceController } from './store-device.controller';
import { RegisterStoreDeviceUseCase } from './use-case/register-store-device.use-case';
import { FindStoreDevicesUseCase } from './use-case/find-store-devices.use-case';
import { FindStoreDeviceByDeviceIdUseCase } from './use-case/find-store-device-by-device-id.use-case';
import { UpdateStoreDeviceUseCase } from './use-case/update-store-device.use-case';
import { DeleteStoreDeviceUseCase } from './use-case/delete-store-device.use-case';

@Module({
  controllers: [StoreDeviceController],
  providers: [
    RegisterStoreDeviceUseCase,
    FindStoreDevicesUseCase,
    FindStoreDeviceByDeviceIdUseCase,
    UpdateStoreDeviceUseCase,
    DeleteStoreDeviceUseCase,
  ],
})
export class StoreDeviceModule {}
