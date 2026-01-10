// 시간/금액 포맷팅 유틸리티

/**
 * 금액을 원화 형식으로 포맷팅
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

/**
 * 금액을 원화 형식으로 포맷팅 (기호 없이)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount);
}

/**
 * 시간을 HH:MM:SS 형식으로 포맷팅
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/**
 * 시간을 HH:MM 형식으로 포맷팅
 */
export function formatTimeShort(date: Date): string {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * 경과 시간을 H:MM 형식으로 포맷팅
 */
export function formatElapsedTime(startTime: Date, currentTime: Date = new Date()): string {
  const diffMs = currentTime.getTime() - startTime.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }
  return `0:${minutes.toString().padStart(2, '0')}`;
}

/**
 * 경과 시간을 H:MM:SS 형식으로 포맷팅
 */
export function formatElapsedTimeFull(startTime: Date, currentTime: Date = new Date()): string {
  const diffMs = currentTime.getTime() - startTime.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 남은 시간을 MM:SS 형식으로 포맷팅
 */
export function formatRemainingTime(endTime: Date, currentTime: Date = new Date()): string {
  const diffMs = endTime.getTime() - currentTime.getTime();
  if (diffMs <= 0) {
    return '00:00';
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 남은 시간(분)을 계산
 */
export function getRemainingMinutes(endTime: Date, currentTime: Date = new Date()): number {
  const diffMs = endTime.getTime() - currentTime.getTime();
  return Math.max(0, Math.floor(diffMs / 60000));
}

/**
 * 만료 임박 여부 확인 (30분 이하)
 */
export function isExpiringSoon(endTime: Date | null, thresholdMinutes = 30): boolean {
  if (!endTime) return false;
  return getRemainingMinutes(endTime) <= thresholdMinutes;
}
