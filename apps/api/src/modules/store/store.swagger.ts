import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreDto } from './dto/create-store.dto';
import { SetTabletAdminPasswordDto } from './dto/set-tablet-admin-password.dto';
import { StoreDto } from './dto/store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import {
  VerifyTabletAdminPasswordDto,
  VerifyTabletAdminPasswordResponseDto,
} from './dto/verify-tablet-admin-password.dto';

export function createStore(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreDto }),
    ApiCreatedResponse({ type: StoreDto })
  );
}

export function findStores(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreDto] }));
}

export function findStoreByIp(summary: string) {
  return applyDecorators(
    ApiOperation({ summary, description: '요청 IP 주소를 기반으로 매장 정보를 조회합니다.' }),
    ApiOkResponse({ type: StoreDto })
  );
}

export function findStore(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreDto }));
}

export function updateStore(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreDto }), ApiNoContentResponse());
}

export function deleteStore(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}

export function setTabletAdminPassword(summary: string) {
  return applyDecorators(
    ApiOperation({ summary, description: '태블릿 관리자 비밀번호를 설정합니다.' }),
    ApiBody({ type: SetTabletAdminPasswordDto }),
    ApiNoContentResponse()
  );
}

export function verifyTabletAdminPassword(summary: string) {
  return applyDecorators(
    ApiOperation({ summary, description: '태블릿 관리자 비밀번호를 검증합니다.' }),
    ApiBody({ type: VerifyTabletAdminPasswordDto }),
    ApiOkResponse({ type: VerifyTabletAdminPasswordResponseDto })
  );
}
