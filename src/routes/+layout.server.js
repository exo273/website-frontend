import { api } from '$lib/utils/api.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	try {
		// Cargar configuración del sitio y páginas legales en paralelo
		const [config, legalPages] = await Promise.all([
			api.getConfig(),
			api.getLegalPages()
		]);

		return {
			config,
			legalPages
		};
	} catch (error) {
		console.error('Error loading layout data:', error);
		
		// Retornar datos por defecto en caso de error
		return {
			config: {
				site_name: "K'Vernicola",
				site_url: "",
				tagline: "",
				logo_url: null,
				header_text: "",
				footer_text: "© 2025 K'Vernicola",
				footer_copyright: "© 2025 K'Vernicola. Todos los derechos reservados.",
				primary_color: "#e74c3c",
				secondary_color: "#2c3e50",
				accent_color: "#f39c12",
				phone: "",
				whatsapp: "",
				email: "",
				address: "",
				opening_hours: {},
				social_links: {},
				visible_pages: {
					home: true,
					menu: true,
					gallery: true,
					blog: true,
					reservations: true,
					loyalty_club: true,
					contact: true
				},
				meta_description: "",
				google_analytics_id: null
			},
			legalPages: []
		};
	}
}
