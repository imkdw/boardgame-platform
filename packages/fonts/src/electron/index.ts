/**
 * Electron font utilities
 *
 * For Electron apps, import the CSS file directly:
 * ```ts
 * import '@repo/fonts/styles/fonts.css';
 * ```
 *
 * This module provides utilities for programmatic font handling if needed.
 */

import { FONT_FAMILY_PRETENDARD, fontFamilyPretendard, FONT_CSS_VARIABLE } from '../index';

/**
 * Get the path to the font file relative to the package
 * Useful for Electron's file protocol or webpack asset handling
 */
export function getFontPath(): string {
  return '../fonts/pretendard/PretendardVariable.woff2';
}

/**
 * Generate @font-face CSS string programmatically
 * Useful when you need to inject fonts dynamically
 */
export function generateFontFaceCSS(fontUrl: string): string {
  return `
@font-face {
  font-family: 'Pretendard Variable';
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: url('${fontUrl}') format('woff2-variations');
}
`.trim();
}

export { FONT_FAMILY_PRETENDARD, fontFamilyPretendard, FONT_CSS_VARIABLE };
