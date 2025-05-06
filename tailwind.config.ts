
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          '100': '#D9E9FF',
          '200': '#B6D3FF',
          '300': '#8DBDFF',
          '400': '#64A7FF',
          '500': '#3B91FF',
          '600': '#1175FF',
          '700': '#005CE6',
          '800': '#0047B3',
          '900': '#003380',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          '100': '#FFF9C2',
          '200': '#FFF599',
          '300': '#FFF170',
          '400': '#FFED47',
          '500': '#FFE91E',
          '600': '#F5D800',
          '700': '#C2AC00',
          '800': '#8F8000',
          '900': '#5C5300',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          '100': '#D9FFD9',
          '200': '#B3FFB3',
          '300': '#8DFF8D',
          '400': '#66FF66',
          '500': '#40FF40',
          '600': '#19FF19',
          '700': '#00E600',
          '800': '#00B300',
          '900': '#008000',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        paper: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F0F0F0',
          300: '#E0E0E0',
          400: '#CCCCCC',
        },
        ink: {
          300: '#666666',
          400: '#444444',
          500: '#333333',
          600: '#222222',
          700: '#111111',
        },
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'Comic Sans', 'cursive'],
        'serif': ['Arial', 'Helvetica', 'sans-serif'],
        'sans': {
          DEFAULT: ['Arial', 'Helvetica', 'sans-serif'],
          css: {
            fontWeight: '700',
            fontStyle: 'italic',
          },
        },
        'mono': ['Courier New', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'blink': 'blink 1s linear infinite',
      },
      boxShadow: {
        'retro': '3px 3px 0 rgba(0, 0, 0, 0.2)',
        'retro-lg': '5px 5px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
