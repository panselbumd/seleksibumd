/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* BUMD — Biru Korporat */
        bumd: {
          50:  '#EBF2FA',
          100: '#C8DDEF',
          200: '#A3C8E5',
          300: '#7DB3DA',
          400: '#4E8EC7',
          500: '#1E6AB5',
          600: '#185FA5',
          700: '#1E3A5F',
          800: '#162E4E',
          900: '#0D1F38',
          silver: '#B8C5D0',
          light:  '#E8F1F9',
        },
        /* BLUD — Hijau Kesehatan */
        blud: {
          50:  '#EDFAF4',
          100: '#D0F2E1',
          200: '#A6E3C6',
          300: '#71CEAA',
          400: '#3EBB8F',
          500: '#1EA870',
          600: '#178C5C',
          700: '#0E6B44',
          800: '#095330',
          900: '#053B22',
          mint:  '#D0F2E1',
          light: '#EDFAF4',
        },
        /* Neutral */
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        /* Status */
        status: {
          draft:     '#94A3B8',
          menunggu:  '#F59E0B',
          lulus:     '#10B981',
          tidaklulus:'#EF4444',
          ukk:       '#3B82F6',
          wawancara: '#8B5CF6',
          penetapan: '#F97316',
          selesai:   '#059669',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'xs':  ['0.75rem', { lineHeight: '1rem' }],
        'sm':  ['0.8125rem', { lineHeight: '1.25rem' }],
        'base':['0.9375rem', { lineHeight: '1.5rem' }],
      },
      borderRadius: {
        'xl2': '1rem',
        'xl3': '1.25rem',
        'xl4': '1.5rem',
      },
      boxShadow: {
        'card':  '0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,.08), 0 16px 32px rgba(0,0,0,.06)',
        'glow-bumd': '0 0 24px rgba(30,106,181,.25)',
        'glow-blud': '0 0 24px rgba(14,107,68,.25)',
        'modal': '0 24px 48px rgba(0,0,0,.18)',
      },
      animation: {
        'fade-in':      'fadeIn .4s ease',
        'slide-up':     'slideUp .5s cubic-bezier(.22,1,.36,1)',
        'slide-in-left':'slideInLeft .4s cubic-bezier(.22,1,.36,1)',
        'pulse-slow':   'pulse 3s cubic-bezier(.4,0,.6,1) infinite',
        'wave':         'wave 6s ease-in-out infinite',
        'counter':      'counter .8s ease-out',
        'shimmer':      'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:      { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%':      { transform: 'translateX(-25%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-bumd':  'linear-gradient(135deg, #1E3A5F 0%, #1E6AB5 60%, #4E8EC7 100%)',
        'gradient-blud':  'linear-gradient(135deg, #0E6B44 0%, #1EA870 60%, #3EBB8F 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,.15) 0%, rgba(255,255,255,.05) 100%)',
        'shimmer-line':   'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      },
    },
  },
  plugins: [],
}
