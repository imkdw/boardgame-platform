# 방 예약 기능 구현 TODO

> **생성일**: 2026-01-13
> **스펙 문서**: [room-reservation-spec.md](./room-reservation-spec.md)
> **상태**: 🚧 진행 중

---

## 📌 진행 상황 요약

| Phase | 설명 | 진행률 |
|-------|------|--------|
| Phase 1 | 백엔드 기반 작업 | ⬜ 0/4 |
| Phase 2 | 시간 플랜 API | ⬜ 0/9 |
| Phase 3 | 방 예약 세션 API | ⬜ 0/9 |
| Phase 4 | SSE 구현 | ⬜ 0/4 |
| Phase 5 | Kiosk 연동 | ⬜ 0/5 |
| Phase 6 | 더미 데이터 & 마무리 | ⬜ 0/4 |

---

## Phase 1: 백엔드 기반 작업

### 1.1 Prisma 스키마 추가

- [ ] `StoreTimePlan` 모델 추가
  - 위치: `apps/api/prisma/schema/store-time-plan.prisma`
  - 필드: id, storeId, name, durationMinutes, price, isRecommended, sort, timestamps, deletedAt
  - 관계: Store (N:1), RoomSession (1:N)

- [ ] `RoomSession` 모델 추가
  - 위치: `apps/api/prisma/schema/room-session.prisma`
  - 필드: id, storeId, roomId, timePlanId, peopleCount, status, startedAt, endedAt, scheduledEndAt, totalPrice, timestamps
  - 관계: Store (N:1), StoreRoom (N:1), StoreTimePlan (N:1)

- [ ] `Store` 모델에 관계 추가
  - `timePlans StoreTimePlan[]`
  - `sessions RoomSession[]`

- [ ] `StoreRoom` 모델에 관계 추가
  - `sessions RoomSession[]`

- [ ] `pnpm api prisma db push` 실행하여 스키마 적용

**📝 메모:**
```
-
```

---

### 1.2 상수 정의

- [ ] `packages/shared/consts/src/room-session.const.ts` 생성
  ```typescript
  export const ROOM_SESSION_STATUS = {
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
  } as const;

  export type RoomSessionStatus = (typeof ROOM_SESSION_STATUS)[keyof typeof ROOM_SESSION_STATUS];

  export const ROOM_SESSION_PEOPLE_COUNT_MIN = 1;
  export const ROOM_SESSION_PEOPLE_COUNT_MAX = 20;
  ```

- [ ] `packages/shared/consts/src/store-time-plan.const.ts` 생성
  ```typescript
  export const STORE_TIME_PLAN_NAME_MAX_LENGTH = 50;
  export const STORE_TIME_PLAN_DURATION_MIN = 0;  // 0 = 무제한
  export const STORE_TIME_PLAN_DURATION_MAX = 1440; // 24시간
  export const STORE_TIME_PLAN_PRICE_MIN = 0;
  export const STORE_TIME_PLAN_PRICE_MAX = 1000000;
  ```

- [ ] `packages/shared/consts/src/index.ts`에 export 추가

**📝 메모:**
```
-
```

---

### 1.3 예외 코드 정의

- [ ] `packages/shared/exception/src/room-session-exception-codes.ts` 생성
  ```typescript
  export const ROOM_SESSION_EXCEPTION_CODES = {
    ROOM_SESSION_NOT_FOUND: 'ROOM_SESSION-0001',
    ROOM_ALREADY_IN_USE: 'ROOM_SESSION-0002',
    ROOM_SESSION_ALREADY_ENDED: 'ROOM_SESSION-0003',
    INVALID_ROOM_SESSION_STATUS: 'ROOM_SESSION-0004',
  } as const;
  ```

- [ ] `packages/shared/exception/src/store-time-plan-exception-codes.ts` 생성
  ```typescript
  export const STORE_TIME_PLAN_EXCEPTION_CODES = {
    STORE_TIME_PLAN_NOT_FOUND: 'STORE_TIME_PLAN-0001',
    STORE_TIME_PLAN_NAME_DUPLICATED: 'STORE_TIME_PLAN-0002',
  } as const;
  ```

- [ ] `packages/shared/exception/src/index.ts`에 export 추가

**📝 메모:**
```
-
```

---

### 1.4 예외 클래스 생성 (server-shared)

- [ ] `packages/server-shared/src/exception/room-session/` 디렉토리 생성

- [ ] `room-session-not-found.exception.ts` 생성
- [ ] `room-already-in-use.exception.ts` 생성
- [ ] `room-session-already-ended.exception.ts` 생성
- [ ] `invalid-room-session-status.exception.ts` 생성

- [ ] `packages/server-shared/src/exception/store-time-plan/` 디렉토리 생성

- [ ] `store-time-plan-not-found.exception.ts` 생성
- [ ] `store-time-plan-name-duplicated.exception.ts` 생성

- [ ] `packages/server-shared/src/exception/index.ts`에 export 추가
- [ ] `packages/server-shared/src/index.ts`에 export 추가

**📝 메모:**
```
- CLAUDE.md 규칙: CustomException 직접 사용 금지, 반드시 예외 클래스 정의 필요
```

---

## Phase 2: 시간 플랜 API (Admin용)

### 2.1 모듈 구조 생성

- [ ] `apps/api/src/modules/store/_time-plan/` 디렉토리 구조 생성
  ```
  _time-plan/
  ├── store-time-plan.module.ts
  ├── store-time-plan.controller.ts
  ├── store-time-plan.swagger.ts
  ├── dto/
  ├── mapper/
  └── use-case/
  ```

**📝 메모:**
```
-
```

---

### 2.2 DTOs 작성

- [ ] `dto/create-store-time-plan.dto.ts`
  - name: string (필수, max 50자)
  - durationMinutes: number (필수, 0~1440)
  - price: number (필수, 0~1000000)
  - isRecommended: boolean (선택, default false)
  - sort: number (선택)

- [ ] `dto/update-store-time-plan.dto.ts`
  - CreateDto의 Partial 또는 별도 정의

- [ ] `dto/store-time-plan.dto.ts` (Response DTO)
  - id, storeId, name, durationMinutes, price, isRecommended, sort, createdAt

**📝 메모:**
```
- 스펙에 priceWeekday/priceWeekend 있으나, DB 스키마는 단일 price 필드
- 확인 필요: 평일/주말 가격 분리할 것인지?
```

---

### 2.3 Mapper 작성

- [ ] `mapper/store-time-plan.mapper.ts`
  - `toDto(entity: StoreTimePlan): StoreTimePlanDto`
  - `toDtoList(entities: StoreTimePlan[]): StoreTimePlanDto[]`

**📝 메모:**
```
-
```

---

### 2.4 Use-Cases 구현

- [ ] `use-case/create-store-time-plan.use-case.ts`
  - Store 존재 확인
  - 같은 매장 내 중복 이름 체크
  - 생성 후 DTO 반환

- [ ] `use-case/find-store-time-plans.use-case.ts`
  - storeId로 조회
  - deletedAt IS NULL 필터
  - sort 순으로 정렬

- [ ] `use-case/update-store-time-plan.use-case.ts`
  - 존재 확인
  - 이름 변경 시 중복 체크
  - 업데이트 실행

- [ ] `use-case/delete-store-time-plan.use-case.ts`
  - 존재 확인
  - Soft delete (deletedAt 설정)
  - 연결된 활성 세션 있는지 확인? (정책 결정 필요)

**📝 메모:**
```
- 삭제 시 연결된 RoomSession 처리 정책 확인 필요
```

---

### 2.5 Controller & Swagger

- [ ] `store-time-plan.controller.ts`
  - `POST /v1/stores/:storeId/time-plans` - 생성
  - `GET /v1/stores/:storeId/time-plans` - 목록 조회
  - `PUT /v1/stores/:storeId/time-plans/:planId` - 수정
  - `DELETE /v1/stores/:storeId/time-plans/:planId` - 삭제

- [ ] `store-time-plan.swagger.ts`
  - ApiTags, ApiOperation, ApiResponse 데코레이터 정의

**📝 메모:**
```
-
```

---

### 2.6 모듈 등록

- [ ] `store-time-plan.module.ts` 작성
  - Controller, Use-Cases 등록
  - DatabaseModule import

- [ ] `store.module.ts`에 StoreTimePlanModule import 추가

**📝 메모:**
```
-
```

---

## Phase 3: 방 예약 세션 API

### 3.1 모듈 구조 생성

- [ ] `apps/api/src/modules/store/_room/_session/` 디렉토리 구조 생성
  ```
  _session/
  ├── room-session.module.ts
  ├── room-session.controller.ts
  ├── room-session.swagger.ts
  ├── dto/
  ├── mapper/
  └── use-case/
  ```

**📝 메모:**
```
- _room 하위에 _session 서브모듈로 구성
```

---

### 3.2 DTOs 작성

- [ ] `dto/create-room-session.dto.ts`
  - timePlanId: string (필수)
  - peopleCount: number (필수, 1~20)

- [ ] `dto/room-session.dto.ts` (Response DTO)
  - id, storeId, roomId, timePlanId, peopleCount, status
  - startedAt, endedAt, scheduledEndAt, totalPrice
  - timePlan?: { id, name, durationMinutes } (선택적 포함)

- [ ] `dto/find-room-sessions-query.dto.ts`
  - status?: RoomSessionStatus
  - startDate?: string (ISO date)
  - endDate?: string (ISO date)
  - roomId?: string

- [ ] `dto/end-room-session.dto.ts` (Response)
  - id, status, endedAt

**📝 메모:**
```
-
```

---

### 3.3 Mapper 작성

- [ ] `mapper/room-session.mapper.ts`
  - `toDto(entity: RoomSession): RoomSessionDto`
  - `toDtoWithTimePlan(entity: RoomSession & { timePlan: StoreTimePlan }): RoomSessionDto`
  - `toDtoList(...): RoomSessionDto[]`

**📝 메모:**
```
-
```

---

### 3.4 Use-Cases 구현

- [ ] `use-case/create-room-session.use-case.ts`
  - **트랜잭션 필수**
  - 1. 방 상태 확인 (AVAILABLE인지)
  - 2. 시간 플랜 존재 여부 확인
  - 3. 가격 계산 (peopleCount * price 또는 플랜 가격 그대로)
  - 4. scheduledEndAt 계산 (durationMinutes=0이면 +24h)
  - 5. 세션 생성 (status=ACTIVE)
  - 6. 방 상태를 IN_USE로 변경
  - 7. SSE 이벤트 발행 (Phase 4에서 연동)

- [ ] `use-case/end-room-session.use-case.ts`
  - **트랜잭션 필수**
  - 1. 세션 존재 및 상태 확인 (ACTIVE인지)
  - 2. 세션 종료 (status=COMPLETED, endedAt=now)
  - 3. 방 상태를 AVAILABLE로 변경
  - 4. SSE 이벤트 발행

- [ ] `use-case/find-active-room-session.use-case.ts`
  - roomId로 ACTIVE 상태인 세션 조회
  - timePlan 정보 포함 (join)
  - 없으면 404 반환

- [ ] `use-case/find-room-sessions.use-case.ts`
  - storeId 필수
  - 필터: status, startDate~endDate, roomId
  - remainingMinutes 계산 포함 (활성 세션)
  - room 정보 포함 (roomNumber)

**📝 메모:**
```
- Race Condition 방지: SELECT FOR UPDATE 또는 트랜잭션 격리 레벨 설정 고려
- 무제한 플랜: scheduledEndAt = startedAt + 24h
```

---

### 3.5 Controller & Swagger

- [ ] `room-session.controller.ts`
  - `POST /v1/stores/:storeId/rooms/:roomId/sessions` - 세션 생성
  - `POST /v1/stores/:storeId/rooms/:roomId/sessions/:sessionId/end` - 세션 종료
  - `GET /v1/stores/:storeId/rooms/:roomId/sessions/active` - 활성 세션 조회
  - `GET /v1/stores/:storeId/sessions` - 매장 전체 세션 목록 (쿼리 필터링)

- [ ] `room-session.swagger.ts`
  - ApiTags, ApiOperation, ApiResponse, ApiQuery 데코레이터

**📝 메모:**
```
- /sessions 엔드포인트는 store 레벨 (room 하위 아님)
```

---

### 3.6 모듈 등록

- [ ] `room-session.module.ts` 작성
- [ ] `store-room.module.ts`에 RoomSessionModule import 추가

**📝 메모:**
```
-
```

---

## Phase 4: SSE 구현

### 4.1 RoomStatusEventService 구현

- [ ] `apps/api/src/modules/store/_events/` 디렉토리 생성

- [ ] `room-status-event.service.ts` 생성
  ```typescript
  @Injectable()
  export class RoomStatusEventService {
    private emitters = new Map<string, Subject<RoomStatusEvent>>();

    getEmitter(storeId: string): Observable<RoomStatusEvent>
    emit(storeId: string, event: RoomStatusEvent): void
  }
  ```

- [ ] `RoomStatusEvent` 타입 정의
  ```typescript
  interface RoomStatusEvent {
    roomId: string;
    status: StoreRoomStatus;
    sessionId: string | null;
  }
  ```

**📝 메모:**
```
- RxJS Subject 사용
- 매장별로 분리된 이벤트 스트림
```

---

### 4.2 StoreEventsController 구현

- [ ] `store-events.controller.ts` 생성
  - `GET /v1/stores/:storeId/events/room-status`
  - `@Sse()` 데코레이터 사용
  - Observable<MessageEvent> 반환

**📝 메모:**
```
- NestJS @Sse() 데코레이터 사용법 확인
- Headers: Accept: text/event-stream
```

---

### 4.3 StoreEvents 모듈 등록

- [ ] `store-events.module.ts` 작성
- [ ] `store.module.ts`에 StoreEventsModule import
- [ ] RoomStatusEventService를 다른 모듈에서 사용 가능하도록 exports

**📝 메모:**
```
- RoomStatusEventService는 RoomSession 모듈에서도 주입받아야 함
```

---

### 4.4 Use-Case에 SSE 이벤트 발행 연동

- [ ] `CreateRoomSessionUseCase`에 RoomStatusEventService 주입
  - 세션 생성 성공 후 emit 호출
  - `{ roomId, status: 'IN_USE', sessionId }`

- [ ] `EndRoomSessionUseCase`에 RoomStatusEventService 주입
  - 세션 종료 성공 후 emit 호출
  - `{ roomId, status: 'AVAILABLE', sessionId: null }`

**📝 메모:**
```
- 이벤트 발행은 트랜잭션 커밋 이후에 수행
```

---

## Phase 5: Kiosk 연동

### 5.1 타입 정의 수정

- [ ] `apps/kiosk/src/types/kiosk.ts` 수정
  - `TimePackage` → `TimePlan` 이름 변경
  - 필드 매핑: durationMinutes, price (단일), isRecommended, sort

- [ ] `KioskSession` 인터페이스 수정
  - `selectedTimePackage` → `selectedTimePlan`

**📝 메모:**
```
- 기존 TimePackage 사용처 모두 변경 필요
```

---

### 5.2 useTimePlans Hook 추가

- [ ] `apps/kiosk/src/hooks/useTimePlans.ts` 생성
  ```typescript
  export function useTimePlans(storeId: string | undefined) {
    // GET /stores/:storeId/time-plans
    // 반환: { timePlans, isLoading, error }
  }
  ```

**📝 메모:**
```
-
```

---

### 5.3 useCreateSession Hook 추가

- [ ] `apps/kiosk/src/hooks/useCreateSession.ts` 생성
  ```typescript
  export function useCreateSession() {
    // POST /stores/:storeId/rooms/:roomId/sessions
    // body: { timePlanId, peopleCount }
    // 반환: { createSession, isLoading }
  }
  ```

**📝 메모:**
```
-
```

---

### 5.4 useRoomStatusEvents Hook 추가 (SSE)

- [ ] `apps/kiosk/src/hooks/useRoomStatusEvents.ts` 생성
  ```typescript
  export function useRoomStatusEvents(storeId: string | undefined) {
    // EventSource 연결
    // 'room-status-changed' 이벤트 리스닝
    // cleanup: eventSource.close()
  }
  ```

**📝 메모:**
```
- 선택적 구현 (실시간 업데이트 필요 시)
```

---

### 5.5 Mock → API 연동

- [ ] `MOCK_TIME_PACKAGES` 제거 및 API 호출로 대체
- [ ] 예약 완료 로직을 실제 API 호출로 변경
- [ ] 에러 핸들링 추가

**📝 메모:**
```
- MOCK_ROOMS는 이미 API 연동되어 있는지 확인 필요
```

---

## Phase 6: 더미 데이터 & 마무리

### 6.1 Seed - StoreTimePlan

- [ ] `apps/api/prisma/seed.ts`에 StoreTimePlan 시드 추가
  ```typescript
  const timePlans = [
    { name: '1시간', durationMinutes: 60, price: 4000, isRecommended: false, sort: 1 },
    { name: '2시간', durationMinutes: 120, price: 7000, isRecommended: true, sort: 2 },
    { name: '3시간', durationMinutes: 180, price: 10000, isRecommended: false, sort: 3 },
    { name: '무제한', durationMinutes: 0, price: 15000, isRecommended: false, sort: 4 },
  ];
  ```

**📝 메모:**
```
-
```

---

### 6.2 Seed - RoomSession

- [ ] RoomSession 시드 데이터 추가 (선택적)
  - 테스트용 활성 세션 1~2개
  - 완료된 세션 히스토리 몇 개

**📝 메모:**
```
- 시드 실행 시 방 상태도 함께 업데이트해야 함
```

---

### 6.3 공유 타입 정의

- [ ] `packages/shared/types/src/store-time-plan.type.ts` 생성 (필요시)
- [ ] `packages/shared/types/src/room-session.type.ts` 생성 (필요시)
- [ ] index.ts export 추가

**📝 메모:**
```
- CLAUDE.md 규칙: 여러 앱에서 공유하는 엔티티 타입만 shared에 배치
```

---

### 6.4 최종 검증

- [ ] `pnpm lint` 실행 - 에러 없음 확인
- [ ] `pnpm build` 실행 - 빌드 성공 확인
- [ ] Swagger UI에서 API 테스트
- [ ] Kiosk에서 예약 플로우 E2E 테스트

**📝 메모:**
```
-
```

---

## 🚨 주의사항 & 결정 필요 사항

### 결정 필요
1. **평일/주말 가격 분리**: 스펙에는 priceWeekday/priceWeekend 있으나 DB 스키마는 단일 price
   - [ ] 단일 가격 유지
   - [ ] 평일/주말 분리

2. **시간 플랜 삭제 시 정책**: 연결된 활성 세션이 있을 때
   - [ ] 삭제 불가 (예외 발생)
   - [ ] Soft delete만 (세션은 유지)

3. **SSE Heartbeat**: 연결 유지를 위한 주기적 ping
   - [ ] 구현함
   - [ ] 구현 안함 (기본 동작에 의존)

### 주의사항
- 모든 시간은 UTC로 저장
- 트랜잭션 사용 시 Race Condition 방지
- CustomException 직접 사용 금지 (예외 클래스 필수)

---

## 📅 작업 로그

| 날짜 | 작업 내용 | 담당 |
|------|----------|------|
| 2026-01-13 | TODO 문서 초안 작성 | Claude |
| | | |

---

## 🔗 관련 파일

- 스펙 문서: `docs/specs/room-reservation-spec.md`
- Prisma 스키마: `apps/api/prisma/schema/`
- 상수: `packages/shared/consts/src/`
- 예외: `packages/shared/exception/src/`, `packages/server-shared/src/exception/`
