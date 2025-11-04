import { api } from '$lib/utils/api';

/**
 * Carga la lista de posts del blog desde el backend
 * Soporta búsqueda, filtros por categoría y paginación
 */
export async function load({ url }) {
	try {
		// Extraer parámetros de la URL
		const category = url.searchParams.get('category');
		const search = url.searchParams.get('search');
		const page = url.searchParams.get('page') || '1';
		
		// Preparar parámetros para la API
		const params = {};
		if (category) params.category = category;
		if (search) params.search = search;
		params.page = page;
		
		// Obtener posts del blog
		const blogData = await api.getBlogPosts(params);
		
		return {
			blogData,
			selectedCategory: category || null,
			searchTerm: search || '',
			currentPage: parseInt(page)
		};
	} catch (error) {
		console.error('Error loading blog posts:', error);
		
		// Retornar estructura vacía en caso de error
		return {
			blogData: {
				posts: [],
				categories: [],
				tags: [],
				total: 0,
				page: 1,
				total_pages: 1
			},
			selectedCategory: null,
			searchTerm: '',
			currentPage: 1
		};
	}
}
