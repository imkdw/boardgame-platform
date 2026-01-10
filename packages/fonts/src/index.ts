/**
 * @repo/fonts - Shared font package for boardgame-platform
 *
 * Provides Pretendard Variable font for use across Next.js and Electron apps.
 *
 * Usage:
 * - Next.js: import { pretendard } from '@repo/fonts/next'
 * - Electron: import '@repo/fonts/styles/fonts.css'
 */

/**
 * Font family string for direct CSS usage
 */
export const FONT_FAMILY_PRETENDARD =
  "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif";

/**
 * Font family array for Tailwind CSS configuration
 */
export const fontFamilyPretendard = [
  'Pretendard Variable',
  '-apple-system',
  'BlinkMacSystemFont',
  'system-ui',
  'Roboto',
  'Helvetica Neue',
  'Segoe UI',
  'Apple SD Gothic Neo',
  'Noto Sans KR',
  'Malgun Gothic',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'sans-serif',
];

/**
 * CSS variable name for font family
 */
export const FONT_CSS_VARIABLE = '--font-pretendard';
