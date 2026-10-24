/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F4ECE1',
          300: '#EBDDCB',
          400: '#DECAB1',
        },
        gold: {
          50: '#FDFBF2',
          100: '#FAF5DC',
          200: '#F3E5AB',
          300: '#E6CF7A',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A98338',
          700: '#846227',
          800: '#64481F',
          900: '#463116',
        },
        burgundy: {
          50: '#FDF2F4',
          100: '#F8DCE2',
          200: '#F0B8C4',
          300: '#DC8296',
          400: '#BA4661',
          500: '#8F2038',
          600: '#75172C',
          700: '#5E1924',
          800: '#480E1A',
          900: '#340811',
          950: '#20040A',
        },
        rose: {
          50: '#FAF5F3',
          100: '#F3E7E3',
          200: '#E8D2CB',
          300: '#D8B5AA',
          400: '#C49486',
          500: '#AF7565',
        },
        midnight: {
          800: '#0E1E38',
          900: '#0A1526',
          950: '#050B14',
        },
        emerald: {
          700: '#116347',
          800: '#0C4B35',
          900: '#073626',
          950: '#042218',
        },
        vermilion: {
          500: '#E04836',
          600: '#C53726',
          700: '#A62A1B',
          800: '#861F13',
        },
        saffron: {
          400: '#F39C12',
          500: '#E67E22',
          600: '#D35400',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E5EDE8',
          200: '#CCDCD2',
          600: '#5A7D6E',
          800: '#365346',
          900: '#233930',
        },
        terracotta: {
          500: '#C86D51',
          600: '#B0583D',
          700: '#94442C',
          800: '#733320',
        },
        charcoal: {
          800: '#2A2421',
          900: '#1C1715',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-subtle': '0 4px 20px -2px rgba(197, 160, 89, 0.25)',
        'gold-glow': '0 0 30px 2px rgba(212, 175, 55, 0.3)',
        'royal': '0 10px 40px -10px rgba(72, 14, 26, 0.2)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ECC870 0%, #D4AF37 50%, #A98338 100%)',
        'burgundy-gradient': 'linear-gradient(160deg, #5E1924 0%, #340811 100%)',
        'midnight-gradient': 'linear-gradient(160deg, #0E1E38 0%, #050B14 100%)',
        'emerald-gradient': 'linear-gradient(160deg, #0C4B35 0%, #042218 100%)',
        'vermilion-gradient': 'linear-gradient(160deg, #C53726 0%, #861F13 100%)',
      }
    },
  },
  plugins: [],
}
