import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterStoreDeviceDto } from './dto/register-store-device.dto';
import { StoreDeviceDto } from './dto/store-device.dto';
import { UpdateStoreDeviceDto } from './dto/update-store-device.dto';

export function registerStoreDevice(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RegisterStoreDeviceDto }),
    ApiCreatedResponse({ type: StoreDeviceDto })
  );
}

export function findStoreDevices(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreDeviceDto] }));
}

export function findStoreDeviceByDeviceId(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreDeviceDto }));
}

export function updateStoreDevice(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreDeviceDto }), ApiNoContentResponse());
}

export function deleteStoreDevice(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
