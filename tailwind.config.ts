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
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'hsl(var(--card-hover))'
				}
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'glow-strong': 'var(--shadow-glow-strong)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-glow': 'var(--gradient-glow)'
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
				},
				'realistic-orbit': {
					'0%': { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateX(10px) translateY(-5px) rotate(90deg)' },
					'50%': { transform: 'translateX(0px) translateY(-10px) rotate(180deg)' },
					'75%': { transform: 'translateX(-10px) translateY(-5px) rotate(270deg)' },
					'100%': { transform: 'translateX(0px) translateY(0px) rotate(360deg)' }
				},
				'earth-rotation': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'atmosphere-pulse': {
					'0%, 100%': { opacity: '0.3' },
					'50%': { opacity: '0.7' }
				},
				'energy-field': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'hyperspace-scan': {
					'0%': { transform: 'translateX(-100%) rotate(0deg)' },
					'50%': { transform: 'translateX(0%) rotate(180deg)' },
					'100%': { transform: 'translateX(100%) rotate(360deg)' }
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(200px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(200px) rotate(-360deg)' }
				},
				'animate-float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(180deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.1)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'realistic-orbit': 'realistic-orbit 30s ease-in-out infinite',
				'earth-rotation': 'earth-rotation 60s linear infinite',
				'atmosphere-pulse': 'atmosphere-pulse 4s ease-in-out infinite',
				'energy-field': 'energy-field 12s linear infinite reverse',
				'hyperspace-scan': 'hyperspace-scan 3s ease-in-out infinite',
				'orbit': 'orbit 20s linear infinite',
				'animate-float': 'animate-float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite'
			}
		}
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("tailwindcss-animate")
	],
} satisfies Config;