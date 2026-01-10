# POS 앱 UI 구현 계획

## 개요
POS.md 기획서에 따라 보드게임 카페 POS 시스템 UI를 구현합니다.

**화면 크기**: 1920x1080 (가로)
**언어**: 한국어만 지원
**UI 라이브러리**: @repo/ui (Shadcn/ui 기반, 30개 컴포넌트)

---

## 1. 라우트 구조

```
/                 → 대시보드 (기본)
/orders           → 주문 관리
/games            → 게임 관리
  /games/rental   → 게임 대여 탭
  /games/return   → 게임 반납 탭
```

---

## 2. 폴더 구조

```
apps/pos/src/
├── app/
│   ├── router.tsx              # 라우터 설정 (수정)
│   └── routes/
│       ├── dashboard/
│       │   ├── page.tsx
│       │   └── components/
│       │       ├── room-card.tsx           # 컴팩트 룸 카드
│       │       ├── room-detail-panel.tsx   # 룸 클릭 시 상세 패널
│       │       └── room-filter.tsx         # 필터 버튼 그룹
│       ├── orders/
│       │   ├── page.tsx
│       │   └── components/
│       │       ├── order-notification-banner.tsx
│       │       ├── room-selector.tsx
│       │       ├── room-select-card.tsx
│       │       ├── menu-selector.tsx
│       │       ├── menu-card.tsx
│       │       ├── order-cart.tsx
│       │       └── cart-item.tsx
│       └── games/
│           ├── page.tsx
│           ├── rental/
│           │   ├── page.tsx
│           │   └── components/
│           │       ├── filter-panel.tsx
│           │       └── game-table.tsx
│           └── return/
│               ├── page.tsx
│               └── components/
│                   └── return-table.tsx
├── components/
│   ├── pos-layout.tsx          # (수정)
│   ├── layout/
│   │   ├── root-layout.tsx     # 신규
│   │   ├── top-navigation.tsx  # 신규
│   │   └── nav-item.tsx        # 신규
│   └── shared/
│       ├── page-header.tsx     # 신규
│       ├── section-header.tsx  # 신규
│       └── current-time.tsx    # 신규
├── hooks/
│   ├── use-pos-session.tsx     # 전역 상태 컨텍스트
│   ├── use-rooms.tsx
│   ├── use-cart.tsx
│   ├── use-orders.tsx
│   ├── use-game-rentals.tsx
│   └── use-real-time.tsx
├── lib/
│   ├── mock-data.ts            # 개발용 목 데이터
│   └── format.ts               # 시간/금액 포맷팅
└── types/
    └── pos.ts                  # 타입 정의 (확장)
```

---

## 3. 구현 단계

### Phase 1: 기반 구조 (파일 14개)

1. **타입 정의 확장** - `types/pos.ts`
   - ActiveRoom, CartItem, SalesSummary, RoomStatus 추가

2. **레이아웃 컴포넌트**
   - `components/layout/root-layout.tsx` - 전체 페이지 래퍼
   - `components/layout/top-navigation.tsx` - 상단 네비게이션
   - `components/layout/nav-item.tsx` - 네비게이션 링크
   - `components/pos-layout.tsx` 수정 (기존 POSLayout.tsx → pos-layout.tsx 리네임)

3. **공통 컴포넌트**
   - `components/shared/page-header.tsx`
   - `components/shared/section-header.tsx`
   - `components/shared/current-time.tsx`

4. **라우터 업데이트** - `app/router.tsx`
   - Nested routes 구조로 변경

5. **상태 관리**
   - `hooks/use-pos-session.tsx` - Context Provider
   - `lib/mock-data.ts` - 목 데이터

6. **유틸리티**
   - `lib/format.ts` - 시간/금액 포맷팅

### Phase 2: 대시보드 화면 (파일 6개)

7. **대시보드 페이지** (30~40개 룸 대응 컴팩트 그리드)
   - `routes/dashboard/page.tsx` - 8x5 그리드 레이아웃
   - `routes/dashboard/components/room-card.tsx` - 컴팩트 룸 카드 (번호, 색상, 경과시간)
   - `routes/dashboard/components/room-detail-panel.tsx` - 클릭 시 상세 패널 (Sheet 또는 Dialog)
   - `routes/dashboard/components/room-filter.tsx` - 필터 버튼 그룹 (전체/사용중/비어있음/만료임박)

8. **관련 훅**
   - `hooks/use-rooms.tsx` - 전체 룸 상태 관리 + 필터링
   - `hooks/use-real-time.tsx` - 실시간 시간 업데이트 (1초 간격)

### Phase 3: 주문 화면 (파일 9개)

9. **주문 페이지**
   - `routes/orders/page.tsx`
   - `routes/orders/components/order-notification-banner.tsx`
   - `routes/orders/components/room-selector.tsx`
   - `routes/orders/components/room-select-card.tsx`
   - `routes/orders/components/menu-selector.tsx`
   - `routes/orders/components/menu-card.tsx`
   - `routes/orders/components/order-cart.tsx`
   - `routes/orders/components/cart-item.tsx`

10. **관련 훅**
    - `hooks/use-cart.tsx`
    - `hooks/use-orders.tsx`

### Phase 4: 게임 관리 화면 (파일 6개)

11. **게임 페이지 셸**
    - `routes/games/page.tsx` - Tabs 네비게이션

12. **대여 탭**
    - `routes/games/rental/page.tsx`
    - `routes/games/rental/components/filter-panel.tsx`
    - `routes/games/rental/components/game-table.tsx`

13. **반납 탭**
    - `routes/games/return/page.tsx`
    - `routes/games/return/components/return-table.tsx`

14. **관련 훅**
    - `hooks/use-game-rentals.tsx`

---

## 4. 주요 화면 레이아웃

### 4.1 대시보드 (좌석 관리 집중 - 30~40개 룸 대응)

**설계 원칙**:
- POS 모니터가 작고 룸이 30~40개로 많음
- 한 화면에 모든 룸을 보여주되, 핵심 정보만 압축 표시
- "주의가 필요한 룸"을 쉽게 식별할 수 있도록 시각적 강조

**UX 전략**:
1. **컴팩트 그리드** - 8x5 또는 10x4 그리드로 40개 룸 한 화면에 표시
2. **색상 기반 상태 표시** - 텍스트보다 색상으로 빠른 인지
3. **주의 필요 룸 강조** - 시간 만료 임박 룸은 깜빡임 또는 강한 경고색
4. **호버/클릭으로 상세정보** - 기본은 최소 정보, 상호작용 시 상세 표시

```
┌─────────────────────────────────────────────────────────────┐
│ [대시보드]  [주문]  [게임관리]                    14:30:25 │
├─────────────────────────────────────────────────────────────┤
│  필터: [전체] [사용중 15] [비어있음 20] [만료임박 3]        │
├─────────────────────────────────────────────────────────────┤
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ │101 │ │102 │ │103 │ │104 │ │105 │ │106 │ │107 │ │108 │   │
│ │🟢  │ │🟢  │ │⚫  │ │🟡  │ │🟢  │ │⚫  │ │⚫  │ │🔴  │   │
│ │1:30│ │0:45│ │    │ │예약│ │2:00│ │    │ │    │ │⚠️  │   │
│ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘   │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ │109 │ │110 │ │111 │ │112 │ │113 │ │114 │ │115 │ │116 │   │
│ │⚫  │ │🟢  │ │🟢  │ │⚫  │ │⚫  │ │🟢  │ │⚫  │ │⚫  │   │
│ │    │ │1:15│ │0:30│ │    │ │    │ │1:45│ │    │ │    │   │
│ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘   │
│  ...                                                        │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ │133 │ │134 │ │135 │ │136 │ │137 │ │138 │ │139 │ │140 │   │
│ │⚫  │ │⚫  │ │🟢  │ │⚫  │ │⚫  │ │⚫  │ │🟢  │ │⚫  │   │
│ │    │ │    │ │0:50│ │    │ │    │ │    │ │1:20│ │    │   │
│ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘   │
└─────────────────────────────────────────────────────────────┘

룸 클릭 시 상세 패널:
┌─────────────────────────────────┐
│ 108호 상세                    X │
├─────────────────────────────────┤
│ 상태: 사용중 (만료 임박!)       │
│ 입실: 12:30                     │
│ 경과: 2:00:25                   │
│ 남은 시간: 00:29:35 ⚠️          │
│ ─────────────────────────────── │
│ 대여 게임:                      │
│  - 스플렌더                     │
│  - 다빈치코드                   │
│ ─────────────────────────────── │
│ [주문하기] [게임대여] [시간연장]│
└─────────────────────────────────┘
```

**색상 코드**:
| 색상   | 의미                          | 표시              |
| ------ | ----------------------------- | ----------------- |
| 🟢 초록 | 사용중 (정상)                 | 경과시간 표시     |
| 🔴 빨강 | 사용중 (만료 임박, 30분 이하) | 경과시간 + 깜빡임 |
| ⚫ 회색 | 비어있음                      | -                 |
| 🟡 노랑 | 예약됨                        | 예약시간 표시     |
| 🔵 파랑 | 정비중                        | -                 |

**컴팩트 룸 카드 정보** (기본 표시):
- 룸 번호 (크게)
- 상태 색상 원
- 경과 시간 또는 예약 시간 (한 줄)

**상세 패널 정보** (클릭 시):
- 룸 번호, 상태
- 입실/예약 시간
- 경과 시간, 남은 시간
- 대여중인 게임 목록
- 빠른 액션 버튼 (주문, 게임대여, 시간연장)

**필터 기능**:
- 전체 / 사용중 / 비어있음 / 만료임박
- 각 필터에 개수 표시

### 4.2 주문 화면

```
┌─────────────────────────────────────────────────────────────┐
│ [대시보드]  [주문]  [게임관리]                    14:30:25 │
├─────────────────────────────────────────────────────────────┤
│ 🔔 새 주문 도착! 101호 - 아메리카노 x2 (PG 결제 완료)     │
├───────────┬─────────────────────────────┬───────────────────┤
│ 룸 선택   │ 메뉴 선택                   │ 주문 내역         │
│           │                             │                   │
│ ┌───────┐ │ [음료] [간식] [기타]        │ 아메리카노  x2   │
│ │ 101호 │ │                             │     ₩9,000       │
│ │ (2)   │ │ ┌─────┐ ┌─────┐ ┌─────┐    │ 카페라떼    x1   │
│ └───────┘ │ │아메리│ │카페라│ │녹차라│    │     ₩5,000       │
│ ┌───────┐ │ │카노  │ │떼    │ │떼    │    │                   │
│ │ 102호 │ │ │4,500 │ │5,000 │ │5,500 │    │ ─────────────────│
│ └───────┘ │ └─────┘ └─────┘ └─────┘    │ 총액: ₩14,000    │
│ ┌───────┐ │                             │                   │
│ │ 103호 │ │ ┌─────┐ ┌─────┐ ┌─────┐    │ [현금결제]        │
│ └───────┘ │ │에이드│ │주스  │ │콜라  │    │ [카드결제]        │
│           │ └─────┘ └─────┘ └─────┘    │                   │
└───────────┴─────────────────────────────┴───────────────────┘
```

### 4.3 게임 관리 - 대여

```
┌─────────────────────────────────────────────────────────────┐
│ [대시보드]  [주문]  [게임관리]                    14:30:25 │
├─────────────────────────────────────────────────────────────┤
│                    [대여]  [반납]                           │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌─────────────────────────────────────────┤
│ │ 🔍 게임 검색  │ │ 게임명        인원  시간  난이도  상태 │
│ │ [          ]  │ │ ─────────────────────────────────────── │
│ │               │ │ 스플렌더     2-4명  30분  ⭐⭐   [대여] │
│ │ 카테고리      │ │ 카탄        3-4명  90분  ⭐⭐⭐  대여중 │
│ │ ☑ 전체       │ │ 뱅!         4-7명  40분  ⭐⭐   [대여] │
│ │ ☐ 전략       │ │ 다빈치코드  2-4명  20분  ⭐     [대여] │
│ │ ☐ 파티       │ │ 루미큐브    2-4명  45분  ⭐     수리중 │
│ │ ☐ 추리       │ │                                        │
│ │ ☐ 협력       │ │                                        │
│ └───────────────┘ └─────────────────────────────────────────┘
```

---

## 5. 주요 타입 정의

```typescript
// types/pos.ts에 추가

export interface ActiveRoom {
  id: string;
  roomNumber: number;
  checkInTime: Date;
  endTime: Date | null;
  rentedGames: RentedGame[];
  pendingOrderCount: number;
}

export interface RentedGame {
  id: string;
  gameId: string;
  gameName: string;
  rentedAt: Date;
}

export interface CartItem {
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface SalesSummary {
  timePackageSales: number;
  menuSales: number;
  totalSales: number;
}

export type RoomStatus = 'IN_USE' | 'AVAILABLE' | 'RESERVED' | 'MAINTENANCE';
export type GameStatus = 'AVAILABLE' | 'RENTED' | 'REPAIR';
```

---

## 6. 사용할 UI 컴포넌트

| 영역        | 컴포넌트                                 |
| ----------- | ---------------------------------------- |
| 네비게이션  | Button (ghost), NavLink                  |
| 룸 카드     | Card, Badge                              |
| 메뉴 탭     | Tabs, TabsList, TabsTrigger, TabsContent |
| 메뉴 카드   | Card, Button (icon)                      |
| 장바구니    | Table, Button                            |
| 게임 테이블 | Table, Badge, Button                     |
| 검색        | Input                                    |
| 필터        | Checkbox, Label                          |
| 확인창      | Dialog                                   |
| 알림        | Alert                                    |
| 로딩        | Skeleton                                 |

---

## 7. 검증 방법

1. **개발 서버 실행**
   ```bash
   pnpm dev:pos
   ```

2. **네비게이션 테스트**
   - 대시보드 → 주문 → 게임관리 이동 확인
   - 게임관리 내 대여/반납 탭 전환 확인

3. **기능 테스트**
   - 룸 카드에 실시간 경과시간 표시 확인
   - 메뉴 선택 → 장바구니 추가 확인
   - 게임 검색/필터 동작 확인

4. **레이아웃 테스트**
   - 1920x1080 크기에서 레이아웃 확인
   - 스크롤 영역 동작 확인

---

## 8. 수정할 기존 파일

| 파일                       | 수정 내용                                            |
| -------------------------- | ---------------------------------------------------- |
| `app/router.tsx`           | Nested routes 구조로 변경                            |
| `components/POSLayout.tsx` | pos-layout.tsx로 리네임 + flex-col 레이아웃으로 변경 |
| `types/pos.ts`             | 새 타입 추가                                         |
| `app/routes/home/page.tsx` | 삭제 (dashboard로 대체)                              |

## 9. 파일 명명 규칙

**kebab-case 사용**: 모든 컴포넌트와 훅 파일은 kebab-case 사용
- 컴포넌트: `room-card.tsx`, `top-navigation.tsx`
- 훅: `use-rooms.tsx`, `use-cart.tsx`
- 유틸리티: `mock-data.ts`, `format.ts`

예외:
- `page.tsx` - 라우트 페이지 파일 (Next.js 컨벤션과 유사)
