# Board Game Cafe POS - API Feature Specification

## Overview

| #   | Domain                             | Priority     | Real-time Needed |
| --- | ---------------------------------- | ------------ | ---------------- |
| 1   | Store Management                   | Medium       | No               |
| 2   | Pricing Management                 | High         | No               |
| 3   | Table/Room Management              | High         | Yes              |
| 4   | **Session Management**             | **Critical** | **Yes**          |
| 5   | Payment Management                 | High         | Yes              |
| 6   | Game Catalog Management            | High         | No               |
| 7   | Game Inventory & Availability      | High         | Yes              |
| 8   | Game Search & Discovery            | High         | Partial          |
| 9   | **Staff Call / Notification**      | **Critical** | **Yes**          |
| 10  | Statistics & Analytics             | Medium       | Partial          |
| 11  | **Real-time Sync (WebSocket/SSE)** | **Critical** | **Yes**          |

---

## 1. Store Management

**Purpose**: 매장 기본 정보 관리

### Required Features

- 매장 프로필 조회/수정 (이름, 주소, 전화, 소개글)
- 영업시간 관리 (요일별)
- 휴무일 관리 (정기/임시)
- 미디어 관리 (로고, 이미지, 소개영상 URL)
- WiFi 정보 저장/조회

### Data Flow

- **Input**: 매장명, 주소, 소개글(ko/en/ja), 영업시간, 휴무일, 미디어 파일
- **Output**: 매장 프로필, 현재 영업 상태(영업중/마감)

### Special Considerations

- i18n: 소개글 다국어 지원 (ko, en, ja)
- 영업시간으로 평일/주말 자동 판별

---

## 2. Pricing Management

**Purpose**: 시간제 요금 체계 관리

### Required Features

- 기본 요금 설정 (평일/주말)
- 시간 패키지 관리 (1시간, 2시간, 3시간, 무제한)
- 연장 요금 설정 (30분, 1시간, 무제한 전환)
- 요금 계산 (날짜+패키지 -> 최종 금액)

### Data Flow

- **Input**: 평일/주말 요금표, 연장 요금, 적용 날짜
- **Output**: 현재 적용 요금표, 패키지별 계산 금액

### Special Considerations

- 평일/주말/공휴일 자동 판별
- 향후 요금 변경 예약 기능 고려

---

## 3. Table/Room Management

**Purpose**: 테이블(방) 구성 관리

### Required Features

- 테이블 CRUD (번호, 이름, 권장인원, 메모)
- 테이블 활성화/비활성화
- 테이블 가용성 조회 (인원수 기준 필터)
- 테이블 추천 (인원수 -> 최적 테이블 정렬)

### Data Flow

- **Input**: 테이블 번호, 최소/최대 인원, 메모
- **Output**: 전체 테이블 목록, 인원별 추천 테이블, 현재 점유 상태

### Real-time

- 테이블 상태 변경 시 WebSocket 브로드캐스트

---

## 4. Session Management (Core)

**Purpose**: 입실~퇴실 전체 세션 생명주기 관리

### Required Features

- **세션 생성 (입실)**: 테이블+인원+시간패키지 -> 세션 시작
- **세션 조회**: ID별, 테이블별, 활성 세션 목록
- **타이머 관리**: 경과시간, 남은시간, 종료시각
- **시간 연장**: 기존 세션에 시간 추가 + 결제
- **세션 종료 (퇴실)**: 세션 마감, 테이블 가용화
- **조기 퇴실**: 시간 남기고 나가는 경우
- **세션 이력**: 테이블별 과거 세션 조회

### Data Flow

**입실 Input:**

- 테이블 ID, 인원수, 시간 패키지, 결제수단, 결제금액

**연장 Input:**

- 세션 ID, 연장 옵션, 결제수단, 결제금액

**Output:**

- 세션 ID, 시작시각, 종료시각, 남은초, 총결제액, 상태

### Real-time (Critical)

- 타이머 동기화 (클라이언트 매초 카운트, 서버 30초마다 동기화)
- 세션 상태 변경 POS 브로드캐스트
- 시간 경고 알림 (10분 전, 만료)

### Session Status

```
active -> warning (10분 이하) -> expired (0분) -> ended
```

### Special Considerations

- **선결제 시스템**: 퇴실 시 추가결제 없음
- **잔여시간 비환불/비이월**
- **서버 시간 기준** (클라이언트 시간 불신)
- 타임존 처리 (매장 타임존 기준)

---

## 5. Payment Management (MVP: 시뮬레이션)

**Purpose**: 결제 기록 관리 (MVP는 실결제 없이 시뮬레이션)

### Required Features

- 결제 기록 생성 (수단, 금액, 시각)
- 결제 유형: 입장결제 / 연장결제
- 결제 수단: 카드, 현금, 카카오페이, 네이버페이
- 세션별 결제 내역 조회
- 일일 결제 요약 (수단별 합계)

### Data Flow

- **Input**: 세션 ID, 결제유형, 결제수단, 금액
- **Output**: 결제 확인, 세션별 결제내역, 일일 요약

### Real-time

- 결제 완료 시 POS 알림

### Special Considerations

- MVP: 모든 결제 자동 성공 처리
- 향후 PG 연동 구조 고려

---

## 6. Game Catalog Management

**Purpose**: 보유 게임 정보 관리

### Required Features

- 게임 CRUD (이름, 이미지, 인원, 시간, 난이도, 장르, 설명)
- 게임 규칙 설명 저장
- **엑셀 일괄 업로드** (초기 등록용)
- 장르/카테고리 관리
- 매장 추천 게임 지정
- 다국어 지원 (게임명, 설명: ko/en/ja)

### Data Flow

- **Input**: 게임명(다국어), 이미지, 인원(min-max), 플레이시간, 난이도, 장르[], 설명(다국어), 추천여부
- **Output**: 게임 카탈로그, 상세정보, 장르 목록

### Special Considerations

- 이미지 저장/최적화
- 검색 인덱싱 (한글/영문)

---

## 7. Game Inventory & Availability

**Purpose**: 실물 게임 재고 및 대여 현황 관리

### Required Features

- 재고 관리: 게임별 보유수량, 가용수량
- 가용성 조회: 실시간 대여 가능 여부
- 대여 추적: 어느 테이블이 어떤 게임 사용 중
- 상태 관리: 정상/파손/분실
- 재고 실사: 물리적 재고 카운트 업데이트

### Data Flow

- **Input**: 게임 ID, 총수량, 상태 변경, 대여/반납 이벤트
- **Output**: 게임별 가용수량, 대여상태, 테이블별 사용게임

### Real-time

- 대여/반납 시 가용성 업데이트

---

## 8. Game Search & Discovery

**Purpose**: 고객용 게임 검색/필터링

### Required Features

- **텍스트 검색**: 게임명 검색 + 자동완성
- **인원수 필터**: N명이 할 수 있는 게임
- **난이도 필터**: 쉬움/보통/어려움
- **장르 필터**: 전략, 파티, 추리, 협동 등
- **플레이시간 필터**: 30분 이하/30-60분/60분 이상
- **가용성 필터**: 대여 가능한 게임만
- **추천 필터**: 매장 추천 게임만
- **정렬**: 이름순, 난이도순, 인기순, 추천순
- **페이지네이션**

### Data Flow

- **Input**: 검색어, 필터(인원,난이도,장르[],시간,가용,추천), 정렬, 페이지, locale
- **Output**: 페이지네이션된 게임 목록, 총 개수, 적용 필터

### Special Considerations

- 한글/영문 Full-text search
- 복합 필터 성능 최적화
- 인기 쿼리 캐싱

---

## 9. Staff Call / Notification System

**Purpose**: 고객->직원 호출 및 시스템 알림

### Required Features

- **직원 호출 요청**: 고객이 직원 호출
- **호출 유형**: 일반문의, 게임요청, 게임설명요청
- **컨텍스트 포함**: 게임 ID, 추가 메시지
- **호출 대기열**: POS에서 대기 중인 호출 목록
- **호출 처리**: 직원이 처리 완료 표시
- **시간 알림**: 시스템 생성 경고 (10분, 만료)

### Data Flow

- **Input**: 테이블/세션 ID, 호출유형, 컨텍스트(게임ID, 메시지)
- **Output**: 호출 ID, 대기열 목록, 세션별 호출 이력

### Real-time (Critical)

- 새 호출 즉시 POS 알림
- 시간 경고 POS 알림
- 호출 상태 업데이트

### Priority Order

```
직원호출 > 시간만료 > 시간경고(10분)
```

---

## 10. Statistics & Analytics

**Purpose**: 매출/운영 통계

### Required Features

- **일일 매출 요약**: 총매출, 거래건수, 객단가
- **결제수단별 분석**: 수단별 매출 비율
- **시간대별 분석**: 시간대별 매출, 피크타임
- **기간 비교**: 전주/전월/전년 대비
- **테이블 지표**: 회전율, 평균 이용시간
- **게임 인기도**: 대여순위, 장르별 선호도
- **미사용 게임**: 대여 없는 게임 목록
- **엑셀 내보내기**

### Data Flow

- **Input**: 기간(from/to), 분석단위(시간/일/주/월), 지표 유형
- **Output**: 집계 통계, 차트용 시계열 데이터, 전기간 대비

### Real-time

- 오늘 누적 매출 실시간 표시

---

## 11. Real-time Sync (WebSocket/SSE)

**Purpose**: 전 프론트엔드 실시간 동기화

### Event Types

```typescript
// Table Events
'table.statusChanged': { tableId, status, sessionId? }

// Session Events
'session.created': { sessionId, tableId, endTime }
'session.extended': { sessionId, newEndTime }
'session.ended': { sessionId, tableId }
'session.warning': { sessionId, tableId, remainingMinutes }
'session.expired': { sessionId, tableId }

// Call Events
'call.created': { callId, tableId, type, gameId? }
'call.resolved': { callId }

// Game Events
'game.availabilityChanged': { gameId, available }
```

### Subscription Model

| Client | Subscribes To              |
| ------ | -------------------------- |
| Kiosk  | Table availability         |
| Tablet | Own table's session events |
| POS    | All events                 |

---

## Cross-Frontend Integration Matrix

| Event         | Kiosk     | Tablet      | POS             |
| ------------- | --------- | ----------- | --------------- |
| 테이블 가용화 | 목록 갱신 | -           | 그리드 갱신     |
| 테이블 점유   | 목록 갱신 | -           | 그리드 갱신     |
| 10분 경고     | -         | 모달 표시   | 노랑 하이라이트 |
| 시간 만료     | -         | 모달 표시   | 빨강 하이라이트 |
| 시간 연장     | -         | 타이머 갱신 | 그리드 갱신     |
| 퇴실          | 목록 갱신 | 초기화면    | 그리드 갱신     |
| 직원 호출     | -         | -           | 알림 표시       |

---

## Clarification Questions

구현 전 확인이 필요한 사항:

1. **10분 경고 임계값** - 10분 고정 vs 설정 가능?
2. **무제한 패키지** - 영업종료시 자동퇴실?
3. **POS 인증** - MVP에서 로그인 필요? 아니면 신뢰된 접근?
4. **게임 대여 추적** - 개별 복사본(시리얼) vs 단순 수량 카운트?
