import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';

/**
 * Carga un post específico del blog usando el slug
 */
export async function load({ params }) {
	try {
		const post = await api.getBlogPost(params.slug);
		
		if (!post) {
			throw error(404, 'Post no encontrado');
		}
		
		return {
			post
		};
	} catch (err) {
		console.error('Error loading blog post:', err);
		throw error(404, 'Post no encontrado');
	}
}
