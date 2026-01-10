import localFont from 'next/font/local';

/**
 * Pretendard Variable font configured for Next.js
 *
 * Usage in layout.tsx:
 * ```tsx
 * import { pretendard } from '@repo/fonts/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="ko" className={pretendard.variable}>
 *       <body className={pretendard.className}>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 *
 * Or with Tailwind CSS:
 * ```tsx
 * <html className={pretendard.variable}>
 *   <body className="font-sans">{children}</body>
 * </html>
 * ```
 * Then in tailwind.config.ts:
 * ```ts
 * fontFamily: {
 *   sans: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
 * }
 * ```
 */
export const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
  preload: true,
});

/**
 * Re-export font family utilities
 */
export { FONT_FAMILY_PRETENDARD, fontFamilyPretendard, FONT_CSS_VARIABLE } from '../index';
