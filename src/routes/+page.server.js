import { api } from '$lib/utils/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	try {
		// Obtener el filtro de categoría de la URL si existe
		const categoryId = url.searchParams.get('category');
		
		// Cargar el menú (con filtro opcional)
		const menuData = await api.getMenu(categoryId);
		
		return {
			menuData,
			selectedCategory: categoryId
		};
	} catch (error) {
		console.error('Error loading menu data:', error);
		
		// Retornar estructura vacía en caso de error
		return {
			menuData: {
				menu_title: 'Nuestro Menú',
				menu_description: 'Descubre nuestros deliciosos platos',
				menu_footer_text: '',
				categories: [],
				products: []
			},
			selectedCategory: null
		};
	}
}
