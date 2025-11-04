import { api } from '$lib/utils/api';

/**
 * Carga las imágenes de la galería desde el backend
 * Soporta filtrado por categoría mediante URL params
 */
export async function load({ url }) {
	try {
		// Extraer parámetros de la URL
		const category = url.searchParams.get('category');
		const search = url.searchParams.get('search');
		
		// Preparar parámetros para la API
		const params = {};
		if (category) params.category = category;
		if (search) params.search = search;
		
		// Obtener datos de la galería
		const galleryData = await api.getGallery(params);
		
		return {
			galleryData,
			selectedCategory: category || null,
			searchTerm: search || ''
		};
	} catch (error) {
		console.error('Error loading gallery:', error);
		
		// Retornar estructura vacía en caso de error
		return {
			galleryData: {
				categories: [],
				images: []
			},
			selectedCategory: null,
			searchTerm: ''
		};
	}
}
