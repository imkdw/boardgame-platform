# 방 예약 기능 기획서

> **작성일**: 2026-01-13
> **버전**: 1.0
> **상태**: Draft

---

## 1. 개요

### 1.1 목적
보드게임 카페 Kiosk에서 고객이 직접 방을 예약할 수 있는 기능을 구현합니다. 결제 기능 없이 순수하게 방 예약/세션 관리만 다룹니다.

### 1.2 핵심 개념

| 개념                           | 설명                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| **시간 플랜 (TimePlan)**       | 매장별로 설정 가능한 이용 시간/가격 옵션 (예: 1시간/4,000원) |
| **방 예약 세션 (RoomSession)** | 실제 방 사용 이력. 시작/종료 시간, 인원, 선택한 플랜 등 기록 |
| **SSE 이벤트**                 | 방 상태 변경 시 실시간 알림 (예약됨/비워짐)                  |

### 1.3 범위

**포함:**
- 시간 플랜 CRUD (Admin)
- 방 예약 생성 (Kiosk)
- 방 예약 세션 관리 (시작/종료/조회)
- SSE를 통한 방 상태 실시간 전파

**제외:**
- 결제 처리
- 사용자 인증/로그인
- 예약 취소/환불

---

## 2. 데이터베이스 설계

### 2.1 신규 테이블

#### 2.1.1 StoreTimePlan (시간 플랜)

```prisma
model StoreTimePlan {
  id              String    @id
  storeId         String    @map("store_id")
  name            String                          // "1시간", "2시간" 등
  durationMinutes Int       @map("duration_minutes")
  price           Int                             // 가격 (원)
  isRecommended   Boolean   @map("is_recommended")
  sort            Int                             // 정렬 순서
  createdAt       DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt       DateTime  @updatedAt @map("updated_at") @db.Timestamptz
  deletedAt       DateTime? @map("deleted_at") @db.Timestamptz

  store    Store         @relation(fields: [storeId], references: [id])
  sessions RoomSession[]

  @@map("store_time_plan")
}
```

**필드 설명:**
- `durationMinutes`: 이용 시간(분). 최소 1분 이상 (무제한 없음)
- `price`: 가격 (원) - 평일/주말 동일
- `isRecommended`: Kiosk에서 추천 표시 여부 (default 없음)
- `sort`: 정렬 순서 (낮을수록 먼저 표시, default 없음)

#### 2.1.2 RoomSession (방 예약 세션)

```prisma
model RoomSession {
  id             String    @id
  storeId        String    @map("store_id")
  roomId         String    @map("room_id")
  timePlanId     String    @map("time_plan_id")
  peopleCount    Int       @map("people_count")
  status         String                           // ACTIVE, COMPLETED, CANCELLED (TS에서 관리)
  startedAt      DateTime  @map("started_at") @db.Timestamptz
  endedAt        DateTime? @map("ended_at") @db.Timestamptz
  scheduledEndAt DateTime  @map("scheduled_end_at") @db.Timestamptz
  totalPrice     Int       @map("total_price")
  createdAt      DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt      DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  store    Store         @relation(fields: [storeId], references: [id])
  room     StoreRoom     @relation(fields: [roomId], references: [id])
  timePlan StoreTimePlan @relation(fields: [timePlanId], references: [id])

  @@map("room_session")
}
```

**필드 설명:**
- `status`: 세션 상태 (TypeScript 상수로 관리, DB default 없음)
  - `ACTIVE`: 진행 중
  - `COMPLETED`: 정상 종료
  - `CANCELLED`: 취소됨
- `startedAt`: 세션 시작 시간
- `scheduledEndAt`: 예정 종료 시간
- `endedAt`: 실제 종료 시간 (종료 전에는 null)
- `totalPrice`: 결제 예정 금액

### 2.2 기존 테이블 수정

#### StoreRoom 관계 추가

```prisma
model StoreRoom {
  // ... 기존 필드 유지

  sessions RoomSession[]  // 추가
}
```

#### Store 관계 추가

```prisma
model Store {
  // ... 기존 필드 유지

  timePlans StoreTimePlan[]  // 추가
  sessions  RoomSession[]    // 추가
}
```

### 2.3 상수 정의

```typescript
// packages/shared/consts/src/room-session.const.ts

export const ROOM_SESSION_STATUS = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type RoomSessionStatus = (typeof ROOM_SESSION_STATUS)[keyof typeof ROOM_SESSION_STATUS];

export const ROOM_SESSION_PEOPLE_COUNT_MIN = 1;
export const ROOM_SESSION_PEOPLE_COUNT_MAX = 20;
```

```typescript
// packages/shared/consts/src/store-time-plan.const.ts

export const STORE_TIME_PLAN_NAME_MAX_LENGTH = 50;
export const STORE_TIME_PLAN_DURATION_MIN = 0;  // 0 = 무제한
export const STORE_TIME_PLAN_DURATION_MAX = 1440; // 24시간
export const STORE_TIME_PLAN_PRICE_MIN = 0;
export const STORE_TIME_PLAN_PRICE_MAX = 1000000;
```

---

## 3. API 설계

### 3.1 시간 플랜 API (Admin용)

#### 3.1.1 플랜 생성

```
POST /v1/stores/:storeId/time-plans
```

**Request Body:**
```json
{
  "name": "1시간",
  "durationMinutes": 60,
  "priceWeekday": 4000,
  "priceWeekend": 5000,
  "isRecommended": false,
  "sortOrder": 1
}
```

**Response:** `201 Created`
```json
{
  "id": "plan-uuid",
  "storeId": "store-uuid",
  "name": "1시간",
  "durationMinutes": 60,
  "priceWeekday": 4000,
  "priceWeekend": 5000,
  "isRecommended": false,
  "sortOrder": 1
}
```

#### 3.1.2 플랜 목록 조회

```
GET /v1/stores/:storeId/time-plans
```

**Response:** `200 OK`
```json
[
  {
    "id": "plan-uuid-1",
    "name": "1시간",
    "durationMinutes": 60,
    "priceWeekday": 4000,
    "priceWeekend": 5000,
    "isRecommended": true,
    "sortOrder": 1
  },
  {
    "id": "plan-uuid-2",
    "name": "무제한",
    "durationMinutes": 0,
    "priceWeekday": 15000,
    "priceWeekend": 18000,
    "isRecommended": false,
    "sortOrder": 4
  }
]
```

#### 3.1.3 플랜 수정

```
PUT /v1/stores/:storeId/time-plans/:planId
```

**Response:** `204 No Content`

#### 3.1.4 플랜 삭제

```
DELETE /v1/stores/:storeId/time-plans/:planId
```

**Response:** `204 No Content`

---

### 3.2 방 예약 세션 API

#### 3.2.1 세션 생성 (예약 시작)

```
POST /v1/stores/:storeId/rooms/:roomId/sessions
```

**Request Body:**
```json
{
  "timePlanId": "plan-uuid",
  "peopleCount": 4
}
```

**Response:** `201 Created`
```json
{
  "id": "session-uuid",
  "storeId": "store-uuid",
  "roomId": "room-uuid",
  "timePlanId": "plan-uuid",
  "peopleCount": 4,
  "status": "ACTIVE",
  "startedAt": "2026-01-13T14:00:00.000Z",
  "scheduledEndAt": "2026-01-13T15:00:00.000Z",
  "totalPrice": 4000
}
```

**비즈니스 로직:**
1. 방 상태 확인 (AVAILABLE인지)
2. 시간 플랜 존재 여부 확인
3. 평일/주말에 따른 가격 계산
4. 세션 생성 + 방 상태를 IN_USE로 변경 (트랜잭션)
5. SSE 이벤트 발행

#### 3.2.2 세션 종료

```
POST /v1/stores/:storeId/rooms/:roomId/sessions/:sessionId/end
```

**Response:** `200 OK`
```json
{
  "id": "session-uuid",
  "status": "COMPLETED",
  "endedAt": "2026-01-13T15:30:00.000Z"
}
```

**비즈니스 로직:**
1. 세션 상태가 ACTIVE인지 확인
2. 세션 종료 처리 (status=COMPLETED, endedAt 설정)
3. 방 상태를 AVAILABLE로 변경 (트랜잭션)
4. SSE 이벤트 발행

#### 3.2.3 현재 활성 세션 조회

```
GET /v1/stores/:storeId/rooms/:roomId/sessions/active
```

**Response:** `200 OK`
```json
{
  "id": "session-uuid",
  "roomId": "room-uuid",
  "timePlanId": "plan-uuid",
  "peopleCount": 4,
  "status": "ACTIVE",
  "startedAt": "2026-01-13T14:00:00.000Z",
  "scheduledEndAt": "2026-01-13T15:00:00.000Z",
  "totalPrice": 4000,
  "timePlan": {
    "id": "plan-uuid",
    "name": "1시간",
    "durationMinutes": 60
  }
}
```

**방에 활성 세션이 없는 경우:** `404 Not Found`

#### 3.2.4 매장 전체 활성 세션 목록

```
GET /v1/stores/:storeId/sessions?status=ACTIVE
```

**Response:** `200 OK`
```json
[
  {
    "id": "session-uuid-1",
    "roomId": "room-uuid-1",
    "roomNumber": 1,
    "peopleCount": 4,
    "status": "ACTIVE",
    "startedAt": "2026-01-13T14:00:00.000Z",
    "scheduledEndAt": "2026-01-13T15:00:00.000Z",
    "remainingMinutes": 35
  }
]
```

#### 3.2.5 세션 이력 조회

```
GET /v1/stores/:storeId/sessions?startDate=2026-01-01&endDate=2026-01-31
```

**Query Parameters:**
- `status`: ACTIVE | COMPLETED | CANCELLED (선택)
- `startDate`: 조회 시작일 (선택)
- `endDate`: 조회 종료일 (선택)
- `roomId`: 특정 방 필터링 (선택)

---

### 3.3 SSE API

#### 3.3.1 방 상태 변경 이벤트 구독

```
GET /v1/stores/:storeId/events/room-status
```

**Headers:**
```
Accept: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

**Event Format:**
```
event: room-status-changed
data: {"roomId":"room-uuid","status":"IN_USE","sessionId":"session-uuid"}

event: room-status-changed
data: {"roomId":"room-uuid","status":"AVAILABLE","sessionId":null}
```

**Event Types:**
| Event Name            | 발생 시점       | Data                      |
| --------------------- | --------------- | ------------------------- |
| `room-status-changed` | 방 상태 변경 시 | roomId, status, sessionId |

---

## 4. Kiosk 앱 변경사항

### 4.1 API 연동

현재 Mock 데이터를 사용 중인 부분을 실제 API로 교체:

| 현재 (Mock)          | 변경 후 (API)                                  |
| -------------------- | ---------------------------------------------- |
| `MOCK_ROOMS`         | `GET /stores/ip` → rooms 조회                  |
| `MOCK_TIME_PACKAGES` | `GET /stores/:storeId/time-plans`              |
| 예약 완료 (가짜)     | `POST /stores/:storeId/rooms/:roomId/sessions` |

### 4.2 타입 정의 수정

```typescript
// apps/kiosk/src/types/kiosk.ts

// 기존 Room 타입 유지 (API 응답과 매핑)
interface Room {
  id: string;
  number: number;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE';
  description?: string;
}

// TimePackage → TimePlan으로 변경
interface TimePlan {
  id: string;
  name: string;
  durationMinutes: number;  // 0 = 무제한
  priceWeekday: number;
  priceWeekend: number;
  isRecommended: boolean;
  sortOrder: number;
}

// KioskSession 수정
interface KioskSession {
  peopleCount: number;
  selectedRoom: Room | null;
  selectedTimePlan: TimePlan | null;  // TimePackage → TimePlan
  selectedPaymentMethod: PaymentMethodType | null;
  totalPrice: number;
  startTime: Date | null;
  endTime: Date | null;
}
```

### 4.3 새로운 Hook 추가

```typescript
// apps/kiosk/src/hooks/useTimePlans.ts

export function useTimePlans(storeId: string | undefined) {
  const [timePlans, setTimePlans] = useState<TimePlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!storeId) return;

    fetchApi<ApiResponse<TimePlan[]>>(`/stores/${storeId}/time-plans`)
      .then(res => setTimePlans(res.data))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [storeId]);

  return { timePlans, isLoading, error };
}
```

```typescript
// apps/kiosk/src/hooks/useCreateSession.ts

export function useCreateSession() {
  const [isLoading, setIsLoading] = useState(false);

  const createSession = async (
    storeId: string,
    roomId: string,
    data: { timePlanId: string; peopleCount: number }
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchApi<ApiResponse<RoomSessionDto>>(
        `/stores/${storeId}/rooms/${roomId}/sessions`,
        { method: 'POST', body: JSON.stringify(data) }
      );
      return response.data;
    } finally {
      setIsLoading(false);
    }
  };

  return { createSession, isLoading };
}
```

### 4.4 SSE 연동 (선택적)

```typescript
// apps/kiosk/src/hooks/useRoomStatusEvents.ts

export function useRoomStatusEvents(storeId: string | undefined) {
  const [events, setEvents] = useState<RoomStatusEvent[]>([]);

  useEffect(() => {
    if (!storeId) return;

    const eventSource = new EventSource(
      `${API_BASE_URL}/stores/${storeId}/events/room-status`
    );

    eventSource.addEventListener('room-status-changed', (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [...prev, data]);
    });

    return () => eventSource.close();
  }, [storeId]);

  return events;
}
```

---

## 5. 모듈 구조 설계

### 5.1 API 모듈 구조

```
apps/api/src/modules/store/
├── _time-plan/                    # 신규 모듈
│   ├── store-time-plan.module.ts
│   ├── store-time-plan.controller.ts
│   ├── store-time-plan.swagger.ts
│   ├── dto/
│   │   ├── create-store-time-plan.dto.ts
│   │   ├── update-store-time-plan.dto.ts
│   │   └── store-time-plan.dto.ts
│   ├── mapper/
│   │   └── store-time-plan.mapper.ts
│   └── use-case/
│       ├── create-store-time-plan.use-case.ts
│       ├── find-store-time-plans.use-case.ts
│       ├── update-store-time-plan.use-case.ts
│       └── delete-store-time-plan.use-case.ts
│
├── _room/
│   ├── _session/                  # 신규 서브모듈
│   │   ├── room-session.module.ts
│   │   ├── room-session.controller.ts
│   │   ├── room-session.swagger.ts
│   │   ├── dto/
│   │   │   ├── create-room-session.dto.ts
│   │   │   ├── room-session.dto.ts
│   │   │   └── find-room-sessions-query.dto.ts
│   │   ├── mapper/
│   │   │   └── room-session.mapper.ts
│   │   └── use-case/
│   │       ├── create-room-session.use-case.ts
│   │       ├── end-room-session.use-case.ts
│   │       ├── find-active-room-session.use-case.ts
│   │       └── find-room-sessions.use-case.ts
│   └── ... (기존 파일들)
│
└── _events/                       # SSE 모듈 (신규)
    ├── store-events.module.ts
    ├── store-events.controller.ts
    └── room-status-event.service.ts
```

### 5.2 예외 클래스

```
packages/server-shared/src/exception/
├── room-session/
│   ├── room-session-not-found.exception.ts
│   ├── room-already-in-use.exception.ts
│   ├── room-session-already-ended.exception.ts
│   └── invalid-room-session-status.exception.ts
│
└── store-time-plan/
    ├── store-time-plan-not-found.exception.ts
    └── exist-store-time-plan-name.exception.ts
```

### 5.3 예외 코드

```typescript
// packages/shared/exception/src/room-session-exception-codes.ts

export const ROOM_SESSION_EXCEPTION_CODES = {
  ROOM_SESSION_NOT_FOUND: 'ROOM_SESSION-0001',
  ROOM_ALREADY_IN_USE: 'ROOM_SESSION-0002',
  ROOM_SESSION_ALREADY_ENDED: 'ROOM_SESSION-0003',
  INVALID_ROOM_SESSION_STATUS: 'ROOM_SESSION-0004',
} as const;

export const ROOM_SESSION_EXCEPTION_MESSAGES = {
  [ROOM_SESSION_EXCEPTION_CODES.ROOM_SESSION_NOT_FOUND]: '세션을 찾을 수 없습니다',
  [ROOM_SESSION_EXCEPTION_CODES.ROOM_ALREADY_IN_USE]: '이미 사용 중인 방입니다',
  [ROOM_SESSION_EXCEPTION_CODES.ROOM_SESSION_ALREADY_ENDED]: '이미 종료된 세션입니다',
  [ROOM_SESSION_EXCEPTION_CODES.INVALID_ROOM_SESSION_STATUS]: '유효하지 않은 세션 상태입니다',
};
```

```typescript
// packages/shared/exception/src/store-time-plan-exception-codes.ts

export const STORE_TIME_PLAN_EXCEPTION_CODES = {
  STORE_TIME_PLAN_NOT_FOUND: 'STORE_TIME_PLAN-0001',
  STORE_TIME_PLAN_NAME_DUPLICATED: 'STORE_TIME_PLAN-0002',
} as const;

export const STORE_TIME_PLAN_EXCEPTION_MESSAGES = {
  [STORE_TIME_PLAN_EXCEPTION_CODES.STORE_TIME_PLAN_NOT_FOUND]: '시간 플랜을 찾을 수 없습니다',
  [STORE_TIME_PLAN_EXCEPTION_CODES.STORE_TIME_PLAN_NAME_DUPLICATED]: '이미 존재하는 플랜 이름입니다',
};
```

---

## 6. SSE 구현 상세

### 6.1 EventEmitter 기반 구현

```typescript
// apps/api/src/modules/store/_events/room-status-event.service.ts

@Injectable()
export class RoomStatusEventService {
  private emitters = new Map<string, Subject<RoomStatusEvent>>();

  getEmitter(storeId: string): Observable<RoomStatusEvent> {
    if (!this.emitters.has(storeId)) {
      this.emitters.set(storeId, new Subject<RoomStatusEvent>());
    }
    return this.emitters.get(storeId)!.asObservable();
  }

  emit(storeId: string, event: RoomStatusEvent): void {
    const emitter = this.emitters.get(storeId);
    if (emitter) {
      emitter.next(event);
    }
  }
}
```

### 6.2 Controller 구현

```typescript
// apps/api/src/modules/store/_events/store-events.controller.ts

@Controller('stores/:storeId/events')
export class StoreEventsController {
  constructor(private readonly roomStatusEventService: RoomStatusEventService) {}

  @Get('room-status')
  @Sse()
  roomStatus(@Param('storeId') storeId: string): Observable<MessageEvent> {
    return this.roomStatusEventService.getEmitter(storeId).pipe(
      map(event => ({
        type: 'room-status-changed',
        data: JSON.stringify(event),
      }))
    );
  }
}
```

### 6.3 이벤트 발행 위치

세션 Use-Case에서 이벤트 발행:

```typescript
// CreateRoomSessionUseCase
async execute(...) {
  // ... 세션 생성 로직

  // SSE 이벤트 발행
  this.roomStatusEventService.emit(storeId, {
    roomId,
    status: STORE_ROOM_STATUS.IN_USE,
    sessionId: session.id,
  });

  return session;
}

// EndRoomSessionUseCase
async execute(...) {
  // ... 세션 종료 로직

  // SSE 이벤트 발행
  this.roomStatusEventService.emit(storeId, {
    roomId,
    status: STORE_ROOM_STATUS.AVAILABLE,
    sessionId: null,
  });

  return session;
}
```

---

## 7. 시퀀스 다이어그램

### 7.1 예약 생성 플로우

```
Customer         Kiosk App           API               Database
   │                 │                │                    │
   │  터치하여 시작   │                │                    │
   │────────────────>│                │                    │
   │                 │                │                    │
   │  인원 수 선택    │                │                    │
   │────────────────>│                │                    │
   │                 │                │                    │
   │  방 선택        │ GET /rooms     │                    │
   │────────────────>│───────────────>│ SELECT rooms      │
   │                 │<───────────────│<───────────────────│
   │  <방 목록 표시>  │                │                    │
   │                 │                │                    │
   │  시간 플랜 선택  │ GET /time-plans│                    │
   │────────────────>│───────────────>│ SELECT time_plans │
   │                 │<───────────────│<───────────────────│
   │  <플랜 목록 표시>│                │                    │
   │                 │                │                    │
   │  결제수단 선택   │                │                    │
   │────────────────>│                │                    │
   │                 │                │                    │
   │  예약 확정      │ POST /sessions │                    │
   │────────────────>│───────────────>│ BEGIN TRANSACTION │
   │                 │                │ INSERT session    │
   │                 │                │ UPDATE room status│
   │                 │                │ COMMIT            │
   │                 │                │<───────────────────│
   │                 │                │                    │
   │                 │                │ SSE Event         │
   │                 │                │═══════════════════>│ (broadcast)
   │                 │<───────────────│                    │
   │  <완료 화면>    │                │                    │
   │<────────────────│                │                    │
```

### 7.2 세션 종료 플로우 (POS/Admin)

```
Staff            POS/Admin           API               Database
   │                 │                │                    │
   │  세션 종료 클릭  │                │                    │
   │────────────────>│                │                    │
   │                 │ POST /end      │                    │
   │                 │───────────────>│ BEGIN TRANSACTION │
   │                 │                │ UPDATE session    │
   │                 │                │ UPDATE room status│
   │                 │                │ COMMIT            │
   │                 │                │<───────────────────│
   │                 │                │                    │
   │                 │                │ SSE Event         │
   │                 │                │═══════════════════>│ (broadcast)
   │                 │<───────────────│                    │
   │  <업데이트됨>   │                │                    │
   │<────────────────│                │                    │
```

---

## 8. 구현 순서

### Phase 1: 백엔드 기반 작업
1. Prisma 스키마 추가 (StoreTimePlan, RoomSession)
2. 상수 및 예외 코드 정의
3. Validator 클래스 추가

### Phase 2: 시간 플랜 API
4. StoreTimePlan 모듈 구현 (CRUD)
5. Admin에서 플랜 관리 UI (선택적)

### Phase 3: 방 예약 세션 API
6. RoomSession 모듈 구현
7. CreateRoomSession Use-Case
8. EndRoomSession Use-Case
9. FindRoomSessions Use-Case

### Phase 4: SSE 구현
10. RoomStatusEventService 구현
11. StoreEventsController 구현
12. Use-Case에 이벤트 발행 연동

### Phase 5: Kiosk 연동
13. API 클라이언트 수정 (Mock → 실제 API)
14. useTimePlans Hook 추가
15. useCreateSession Hook 추가
16. 예약 플로우 테스트

### Phase 6: 더미 데이터 & 테스트
17. Seed 스크립트에 TimePlan 데이터 추가
18. 통합 테스트 작성

---

## 9. 고려사항

### 9.1 동시성 처리
- 같은 방에 동시 예약 요청 시 Race Condition 방지
- 해결: 트랜잭션 + 방 상태 체크 로직

### 9.2 무제한 플랜 처리
- `durationMinutes = 0`인 경우 `scheduledEndAt`을 먼 미래(+24h)로 설정
- 종료는 수동으로만 가능

### 9.3 SSE 연결 관리
- 클라이언트 연결 해제 시 자동 정리
- Heartbeat 메시지로 연결 유지 (선택적)

### 9.4 시간대 처리
- 모든 시간은 UTC로 저장
- 클라이언트에서 로컬 시간대로 변환하여 표시

---

## 10. 변경 이력

| 버전 | 날짜       | 변경 내용 |
| ---- | ---------- | --------- |
| 1.0  | 2026-01-13 | 초안 작성 |
