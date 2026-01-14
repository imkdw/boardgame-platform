# iPad에서 @repo/tablet-app 실행 가이드

## 사전 요구사항

1. **macOS** - Xcode 16 이상 설치
2. **Node.js** - v22 이상 (nvm 사용 권장)
3. **pnpm** - 패키지 매니저
4. **Apple Developer 계정** - 실제 기기 배포를 위해 필요
5. **iPad** - USB 케이블로 Mac에 연결

## 실행 순서

### 1. 연결된 기기 확인

```bash
xcrun xctrace list devices
```

출력 예시:
```
== Devices ==
imkdw의 MacBook Pro (A664C51D-8F01-5F89-903A-CE093585C4FC)
Ipad (2) (18.5) (00008132-0018716E0A39001C)  <- 연결된 iPad
```

### 2. 프로젝트 루트로 이동

```bash
cd /Users/imkdw/boardgame-platform
```

### 3. 의존성 설치 (처음 실행 시)

```bash
pnpm install
```

### 4. iOS 빌드 및 iPad에 설치

프로젝트 루트에서 실행:

```bash
pnpm tablet-app ios --device
```

또는 특정 기기 ID를 지정하여 실행:

```bash
pnpm tablet-app ios --device "00008132-0018716E0A39001C"
```

이 명령어는:
- Native iOS 앱을 빌드 (첫 빌드시 2-5분 소요)
- 자동으로 코드 서명
- iPad에 앱 설치
- Metro Bundler 시작 (`http://localhost:8081`)

### 5. iPad에서 앱 실행

앱 설치 후:
1. iPad에서 "tablet-app" 아이콘을 탭하여 실행
2. iPad와 Mac이 **같은 Wi-Fi 네트워크**에 연결되어 있어야 함
3. 앱이 Metro Bundler에 연결되어 JS 번들을 받아옴

## 개발 중 재시작

앱이 이미 설치된 상태에서 코드 수정 후, 프로젝트 루트에서:

```bash
# Metro bundler만 시작 (앱이 이미 설치된 경우)
pnpm tablet-app start
```

그 후 iPad에서 앱을 다시 실행하면 코드 변경사항이 자동으로 반영됩니다.

## 문제 해결

### iPad에서 "신뢰하지 않는 개발자" 오류

1. iPad **설정** > **일반** > **기기 관리** 또는 **VPN 및 기기 관리**
2. 개발자 앱에서 본인 계정 탭
3. "신뢰" 버튼 탭

### Metro Bundler 연결 실패

1. Mac과 iPad가 같은 Wi-Fi 네트워크에 있는지 확인
2. Mac 방화벽에서 8081 포트 허용
3. Metro bundler가 실행 중인지 확인: `lsof -i :8081`

### 빌드 오류 발생 시

```bash
# 캐시 클리어 후 재빌드
pnpm tablet-app start --clear
pnpm tablet-app ios --device
```

### 코드 서명 오류

Apple Developer 계정이 Xcode에 등록되어 있는지 확인:
```bash
security find-identity -v -p codesigning
```

## 핵심 명령어 요약

| 작업 | 명령어 |
|------|--------|
| 기기 목록 확인 | `xcrun xctrace list devices` |
| iPad에 빌드 & 설치 | `pnpm tablet-app ios --device` |
| Metro 번들러만 시작 | `pnpm tablet-app start` |
| 캐시 클리어 후 시작 | `pnpm tablet-app start --clear` |

## 주의사항

- 현재 빌드는 **개발용**입니다
- 프로덕션 배포를 위해서는 EAS Build와 App Store Connect 설정이 필요합니다
- 개발 머신 IP가 `app/index.tsx`에 하드코딩되어 있어, 네트워크 변경 시 업데이트 필요
