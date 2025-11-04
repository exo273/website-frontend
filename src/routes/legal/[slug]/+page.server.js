import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';

/**
 * Carga una página legal específica usando el slug
 */
export async function load({ params }) {
	try {
		const page = await api.getLegalPage(params.slug);
		
		if (!page) {
			throw error(404, 'Página no encontrada');
		}
		
		return {
			page
		};
	} catch (err) {
		console.error('Error loading legal page:', err);
		throw error(404, 'Página no encontrada');
	}
}
