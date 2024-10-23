import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Add your custom colors here
        digiGreen: {
          DEFAULT: '#1D483B'
        },
        digiLightOrange: {
          DEFAULT: '#F7E6D3'
        },
        digiOrange: {
          DEFAULT: '#E7A572'
        },
        digiRed: {
          DEFAULT: '#CF2A4C'
        },
        digiWhite: {
          DEFAULT: '#FFFFFF',
          secondary: '#DADADA'
        },
        digiText: {
          DEFAULT: '#A3A3A3',
          secondary: '#4F4F4F',
          tertiary: '#828282'
        }
      }
    }
  },
  plugins: []
}
export default config
