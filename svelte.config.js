import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocesar con Vite
	preprocess: vitePreprocess(),

	kit: {
		// Adapter para Node.js (para producción con Docker)
		adapter: adapter({
			out: 'build',
			precompress: false,
			envPrefix: ''
		}),
		
		// Alias para imports
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/utils',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
