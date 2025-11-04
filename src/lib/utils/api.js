/**
 * Cliente API para el backend de Django
 * Usa variable de entorno en desarrollo o valor relativo en producción
 */
const API_BASE_URL = typeof window !== 'undefined' 
	? '/api/website'  // En el navegador, usar ruta relativa (nginx hace el proxy)
	: process.env.PUBLIC_API_URL || 'http://nginx/api/website'; // En SSR, usar variable de entorno

/**
 * Cliente API para el backend de Django
 */
class ApiClient {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	/**
	 * Realizar una petición GET
	 */
	async get(endpoint) {
		try {
			const response = await fetch(`${this.baseURL}${endpoint}`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			return await response.json();
		} catch (error) {
			console.error(`Error fetching ${endpoint}:`, error);
			throw error;
		}
	}

	/**
	 * Realizar una petición POST
	 */
	async post(endpoint, data) {
		try {
			const response = await fetch(`${this.baseURL}${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error(`Error posting to ${endpoint}:`, error);
			throw error;
		}
	}

	// ==========================================
	// Endpoints del Website
	// ==========================================

	/**
	 * Obtener la configuración del sitio web
	 */
	async getConfig() {
		return this.get('/api/website/config/');
	}

	/**
	 * Obtener imágenes de la galería
	 */
	async getGallery(params = {}) {
		const query = new URLSearchParams(params).toString();
		const endpoint = query ? `/api/website/gallery/?${query}` : '/api/website/gallery/';
		return this.get(endpoint);
	}

	/**
	 * Obtener el menú público
	 */
	async getMenu(categoryId = null) {
		const endpoint = categoryId 
			? `/api/website/menu/?category=${categoryId}` 
			: '/api/website/menu/';
		return this.get(endpoint);
	}

	/**
	 * Obtener lista de posts del blog
	 */
	async getBlogPosts(params = {}) {
		const query = new URLSearchParams(params).toString();
		const endpoint = query ? `/api/website/blog/?${query}` : '/api/website/blog/';
		return this.get(endpoint);
	}

	/**
	 * Obtener detalle de un post del blog
	 */
	async getBlogPost(slug) {
		return this.get(`/api/website/blog/${slug}/`);
	}

	/**
	 * Obtener lista de páginas legales
	 */
	async getLegalPages() {
		return this.get('/api/website/legal/');
	}

	/**
	 * Obtener una página legal específica
	 */
	async getLegalPage(slug) {
		return this.get(`/api/website/legal/${slug}/`);
	}

	/**
	 * Crear una reserva
	 */
	async createReservation(data) {
		return this.post('/api/website/reservations/', data);
	}

	/**
	 * Obtener información del programa de fidelización
	 */
	async getLoyaltyProgram() {
		return this.get('/api/website/loyalty-program/');
	}

	/**
	 * Unirse al club de fidelización
	 */
	async joinLoyaltyClub(data) {
		return this.post('/api/website/loyalty-club/join/', data);
	}
}

// Exportar una instancia del cliente con la URL base configurada
export const api = new ApiClient(API_BASE_URL);
