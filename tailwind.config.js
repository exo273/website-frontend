import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				// Los colores se cargarán dinámicamente desde la API
				// pero definimos algunos por defecto para desarrollo
				primary: {
					DEFAULT: '#e74c3c',
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#e74c3c',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d'
				},
				secondary: {
					DEFAULT: '#2c3e50',
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#2c3e50',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a'
				},
				accent: {
					DEFAULT: '#f39c12',
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f39c12',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f'
				}
			}
		}
	},
	plugins: [
		skeleton({
			themes: {
				preset: ['skeleton']
			}
		})
	]
};
