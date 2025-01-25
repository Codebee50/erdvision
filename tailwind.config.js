/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			blue_dark: '#14213D',
  			yellow_dark: '#FCA311',
  			primary_light: '#ECEEFF',
  			green01: '#042028',
  			green02: '#7ED6DF',
  			blue01: '#4E7FE7',
  			mgrey100: '#F1F5F9',
  			mgrey200: '#F2F4F5',
  			mblack100: '#727584',
  			mblack200: '#434754',
			chatinput: "#F1F2F4",
  			green02transparent: 'rgb(126, 214, 223, 0.3)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		gridTemplateColumns: {
  			large: 'repeat(auto-fill, minmax(140px, 1fr))',
  			small: 'repeat(auto-fill, minmax(100px, 1fr))'
  		},
  		screens: {
  			br475: '475px',
  			br350: '350px',
  			herobr01: '810px',
  			herobr02: '700px',
  			herobr03: '579px',
  			herobr04: '490px',
  			herobr05: '380px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	backgroundImage: {
  		gridbackground: "url('/images/grid.svg')"
  	},
  	fontFamily: {
  		manrope: [
  			'Manrope',
  			'sans-serif'
  		]
  	},
  	keyframes: {
  		'caret-blink': {
  			'0%,70%,100%': {
  				opacity: '1'
  			},
  			'20%,50%': {
  				opacity: '0'
  			}
  		}
  	},
  	animation: {
  		'caret-blink': 'caret-blink 1.25s ease-out infinite'
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
