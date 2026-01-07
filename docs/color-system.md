# 🎨 Boardgame Platform 디자인 시스템 - 컬러 명세서

## 개요
이 문서는 Boardgame Platform 디자인 시스템의 색상 토큰을 정의합니다. AI나 개발자에게 컬러 시스템을 전달할 때 이 명세서를 참조하세요.

> **기술 스택**: Shadcn/ui + Tailwind CSS 기반으로 구현됩니다.

---

## 🔵 기본 색상 (Foundation Colors)

| 토큰명                  | HEX/RGBA                   | 용도                        |
| ----------------------- | -------------------------- | --------------------------- |
| `boardgame-primary`     | `#7c27f2`                  | 브랜드 메인 컬러, 주요 액션 |
| `boardgame-black`       | `#111111`                  | 기본 검정색                 |
| `boardgame-white`       | `#ffffff`                  | 기본 흰색                   |
| `boardgame-white-30`    | `rgba(255, 255, 255, 0.3)` | 30% 투명도 흰색             |
| `boardgame-border`      | `#e5e5e5`                  | 테두리, 구분선              |
| `boardgame-bg-contents` | `#f8fafc`                  | 콘텐츠 배경색               |

---

## 📝 텍스트 색상 (Text Colors)

| 토큰명            | HEX       | 용도               | 명도      |
| ----------------- | --------- | ------------------ | --------- |
| `text-deepblack`  | `#111111` | 제목, 강조 텍스트  | 가장 진함 |
| `text-black`      | `#333333` | 본문 텍스트        | 진함      |
| `text-lightblack` | `#777777` | 보조 텍스트        | 중간      |
| `text-gray`       | `#999999` | 비활성/힌트 텍스트 | 연함      |
| `text-lightgray`  | `#dddddd` | placeholder 등     | 가장 연함 |

---

## 🔘 버튼 색상 (Button Colors)

| 토큰명              | HEX/RGBA                | 상태/용도                       |
| ------------------- | ----------------------- | ------------------------------- |
| `btn-default`       | `#111111`               | 기본 버튼 (= boardgame-black)   |
| `btn-hover`         | `#7c27f2`               | 호버 상태 (= boardgame-primary) |
| `btn-focused`       | `#f2277f`               | 포커스 상태 (핑크)              |
| `btn-base-click`    | `#6123b7`               | 클릭/액티브 상태                |
| `btn-disabled`      | `rgba(17, 17, 17, 0.5)` | 비활성 상태 (50% 투명도)        |
| `btn-gray`          | `#f6f6f6`               | 회색 버튼 배경                  |
| `btn-excel-default` | `#1a6844`               | 엑셀 버튼 기본 (녹색)           |
| `btn-excel-hover`   | `#269260`               | 엑셀 버튼 호버                  |

---

## 🚦 상태 색상 (Status Colors)

| 토큰명            | HEX       | 용도                  |
| ----------------- | --------- | --------------------- |
| `status-progress` | `#0065ff` | 진행중 (파랑)         |
| `status-default`  | `#ebecf0` | 기본/대기 (연한 회색) |
| `status-complete` | `#36b37e` | 완료 (녹색)           |
| `status-warning`  | `#ffab00` | 경고 (노랑)           |
| `status-error`    | `#e22a00` | 에러 (빨강)           |
| `status-new`      | `#6554c0` | 신규 (보라)           |

---

## 🏷️ 라벨 색상 (Label Colors)

| 토큰명          | HEX       | 카테고리                          |
| --------------- | --------- | --------------------------------- |
| `label-food`    | `#4ea600` | 음식 관련                         |
| `label-booking` | `#0067dd` | 예약 관련                         |
| `label-time`    | `#a60000` | 시간 관련                         |
| `label-item`    | `#7c27f2` | 아이템 관련 (= boardgame-primary) |

---

## 🎯 사용 가이드라인

### 색상 계층 구조
1. **Primary Action**: `boardgame-primary` (#7c27f2) - 가장 중요한 액션에만 사용
2. **Default Action**: `boardgame-black` (#111111) - 일반 버튼
3. **Background**: `boardgame-bg-contents` (#f8fafc) + `boardgame-white` (#ffffff)

### 텍스트 사용 원칙
- 제목/헤딩: `text-deepblack`
- 본문: `text-black`
- 부가 설명: `text-lightblack`
- 비활성/힌트: `text-gray` 또는 `text-lightgray`

### 상태 표현 원칙
- 성공/완료: `status-complete` (녹색 계열)
- 경고/주의: `status-warning` (노랑)
- 오류/위험: `status-error` (빨강)
- 진행중: `status-progress` (파랑)
- 신규: `status-new` (보라)

---

## 📋 참조 관계 (Token References)

일부 토큰은 다른 토큰을 참조합니다:
- `btn-default` → `boardgame-black`
- `btn-hover` → `boardgame-primary`
- `label-item` → `boardgame-primary`

---

## 🛠️ Shadcn/ui 테마 매핑

> **구현 시 참고**: Shadcn/ui의 CSS 변수 시스템을 사용하여 아래 색상 토큰을 매핑합니다.

### Shadcn/ui 변수 ↔ 디자인 토큰 매핑

| Shadcn/ui 변수       | 디자인 토큰             | HEX     |
| -------------------- | ----------------------- | ------- |
| `--primary`          | `boardgame-primary`     | #7c27f2 |
| `--background`       | `boardgame-bg-contents` | #f8fafc |
| `--foreground`       | `text-deepblack`        | #111111 |
| `--border`           | `boardgame-border`      | #e5e5e5 |
| `--destructive`      | `status-error`          | #e22a00 |
| `--muted-foreground` | `text-lightblack`       | #777777 |
| `--secondary`        | `btn-gray`              | #f6f6f6 |

### 커스텀 확장 변수 (status 색상)

| 변수명              | 디자인 토큰       | HEX     | 용도                |
| ------------------- | ----------------- | ------- | ------------------- |
| `--status-progress` | `status-progress` | #0065ff | 이용 중 (시간 충분) |
| `--status-complete` | `status-complete` | #36b37e | 완료                |
| `--status-warning`  | `status-warning`  | #ffab00 | 10분 이하 남음      |
| `--status-error`    | `status-error`    | #e22a00 | 시간 초과           |
| `--status-default`  | `status-default`  | #ebecf0 | 빈 테이블           |

### 구현 가이드

1. Shadcn/ui 초기화 시 위 색상 값으로 CSS 변수 설정
2. `status-*` 색상은 Tailwind 커스텀 색상으로 확장
3. 모든 컴포넌트는 CSS 변수 기반으로 테마 적용

---

## 💡 AI 프롬프트용 요약

> **Boardgame Platform 디자인 시스템 컬러**
> - **UI 라이브러리**: Shadcn/ui + Tailwind CSS
> - 브랜드 컬러: 보라색 (#7c27f2)
> - 기본 텍스트: #111111 ~ #dddddd (5단계 명도)
> - 상태색: 파랑(진행), 녹색(완료), 노랑(경고), 빨강(에러), 보라(신규)
> - 배경: 흰색(#ffffff), 연한 회색(#f8fafc)
> - 테두리: #e5e5e5
> - CSS 변수 기반으로 Shadcn/ui 테마와 연동