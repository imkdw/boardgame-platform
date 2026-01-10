import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export const tailwindPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-pretendard)',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
      colors: {
        /* ========================================
           ZDS Primitive Colors (Direct Access)
           ======================================== */
        bgp: {
          primary: {
            10: 'var(--bgp-primary-10)',
            20: 'var(--bgp-primary-20)',
            30: 'var(--bgp-primary-30)',
            40: 'var(--bgp-primary-40)',
            50: 'var(--bgp-primary-50)',
            60: 'var(--bgp-primary-60)',
            70: 'var(--bgp-primary-70)',
            80: 'var(--bgp-primary-80)',
            90: 'var(--bgp-primary-90)',
          },
          accent: {
            10: 'var(--bgp-accent-10)',
            20: 'var(--bgp-accent-20)',
            30: 'var(--bgp-accent-30)',
            40: 'var(--bgp-accent-40)',
            50: 'var(--bgp-accent-50)',
            60: 'var(--bgp-accent-60)',
            70: 'var(--bgp-accent-70)',
            80: 'var(--bgp-accent-80)',
            90: 'var(--bgp-accent-90)',
          },
          gray: {
            0: 'var(--bgp-gray-0)',
            10: 'var(--bgp-gray-10)',
            20: 'var(--bgp-gray-20)',
            30: 'var(--bgp-gray-30)',
            40: 'var(--bgp-gray-40)',
            50: 'var(--bgp-gray-50)',
            60: 'var(--bgp-gray-60)',
            70: 'var(--bgp-gray-70)',
            80: 'var(--bgp-gray-80)',
            90: 'var(--bgp-gray-90)',
            100: 'var(--bgp-gray-100)',
          },
          danger: {
            10: 'var(--bgp-danger-10)',
            20: 'var(--bgp-danger-20)',
            30: 'var(--bgp-danger-30)',
            40: 'var(--bgp-danger-40)',
            50: 'var(--bgp-danger-50)',
            60: 'var(--bgp-danger-60)',
            70: 'var(--bgp-danger-70)',
            80: 'var(--bgp-danger-80)',
            90: 'var(--bgp-danger-90)',
          },
          warning: {
            10: 'var(--bgp-warning-10)',
            20: 'var(--bgp-warning-20)',
            30: 'var(--bgp-warning-30)',
            40: 'var(--bgp-warning-40)',
            50: 'var(--bgp-warning-50)',
            60: 'var(--bgp-warning-60)',
            70: 'var(--bgp-warning-70)',
            80: 'var(--bgp-warning-80)',
            90: 'var(--bgp-warning-90)',
          },
          complete: {
            10: 'var(--bgp-complete-10)',
            20: 'var(--bgp-complete-20)',
            30: 'var(--bgp-complete-30)',
            40: 'var(--bgp-complete-40)',
            50: 'var(--bgp-complete-50)',
            60: 'var(--bgp-complete-60)',
            70: 'var(--bgp-complete-70)',
            80: 'var(--bgp-complete-80)',
            90: 'var(--bgp-complete-90)',
          },
          alpha: {
            black: {
              90: 'var(--bgp-alpha-black-90)',
              80: 'var(--bgp-alpha-black-80)',
              70: 'var(--bgp-alpha-black-70)',
              60: 'var(--bgp-alpha-black-60)',
              50: 'var(--bgp-alpha-black-50)',
              40: 'var(--bgp-alpha-black-40)',
              30: 'var(--bgp-alpha-black-30)',
              20: 'var(--bgp-alpha-black-20)',
              10: 'var(--bgp-alpha-black-10)',
              0: 'var(--bgp-alpha-black-0)',
            },
            white: {
              90: 'var(--bgp-alpha-white-90)',
              80: 'var(--bgp-alpha-white-80)',
              70: 'var(--bgp-alpha-white-70)',
              60: 'var(--bgp-alpha-white-60)',
              50: 'var(--bgp-alpha-white-50)',
              40: 'var(--bgp-alpha-white-40)',
              30: 'var(--bgp-alpha-white-30)',
              20: 'var(--bgp-alpha-white-20)',
              10: 'var(--bgp-alpha-white-10)',
              0: 'var(--bgp-alpha-white-0)',
            },
          },
        },

        /* ========================================
           Semantic Colors (Shadcn/UI Compatible)
           ======================================== */
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          click: 'var(--primary-click)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },

        /* ========================================
           Status Colors
           ======================================== */
        status: {
          progress: 'var(--status-progress)',
          complete: 'var(--status-complete)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
          default: 'var(--status-default)',
          new: 'var(--status-new)',
        },

        /* ========================================
           Text Hierarchy Colors
           ======================================== */
        text: {
          title: 'var(--text-title)',
          body: 'var(--text-body)',
          description: 'var(--text-description)',
          placeholder: 'var(--text-placeholder)',
          disabled: 'var(--text-disabled)',
          information: 'var(--text-information)',
        },

        /* ========================================
           Button State Colors
           ======================================== */
        btn: {
          default: 'var(--btn-default)',
          hover: 'var(--btn-hover)',
          click: 'var(--btn-click)',
          disabled: 'var(--btn-disabled)',
        },
      },

      /* ========================================
         Border Width
         ======================================== */
      borderWidth: {
        regular: 'var(--border-width-regular)',
        medium: 'var(--border-width-medium)',
      },

      /* ========================================
         Border Radius
         ======================================== */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      /* ========================================
         Animations
         ======================================== */
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
