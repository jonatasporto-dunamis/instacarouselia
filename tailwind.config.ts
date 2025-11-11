import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },

      /**
       * Paleta base via CSS variables (shadcn)
       * Mantemos para compatibilidade com componentes existentes.
       */
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        /**
         * -------- Dunamis Grow — Paleta de Marca --------
         * Use as classes:
         *  - text-brand-primary / bg-brand-primary
         *  - text-brand-dark / bg-brand-dark
         *  - text-brand-light / bg-brand-light
         *  - text-brand-accent / bg-brand-accent (tom complementar)
         */
        brand: {
          primary: '#2AD66F',  // Verde Dunamis Grow
          dark: '#222222',     // Preto/profundo
          light: '#E8FFF2',    // Fundo claro suave para seções
          accent: '#16A34A',   // Verde mais escuro (hover/ênfases)
          on: {
            primary: '#0C2E1D', // Texto sobre o verde
            dark: '#FFFFFF',    // Texto sobre o dark
          },
        },
      },

      /**
       * Bordas e animações existentes
       */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      /**
       * Utilitários extras para a marca
       */
      backgroundImage: {
        // Gradiente de destaque para títulos/CTAs (ex: className="bg-dg-gradient bg-clip-text text-transparent")
        'dg-gradient': 'linear-gradient(90deg, #2AD66F 0%, #66E6A0 50%, #2AD66F 100%)',
      },
      boxShadow: {
        'brand-soft': '0 8px 30px rgba(42, 214, 111, 0.18)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
