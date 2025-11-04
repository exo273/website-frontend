<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	
	// Este layout es específico para la ruta /tv
	// No incluye header ni footer, solo el contenido
	
	onMount(() => {
		// Prevenir el sleep/screensaver en la TV
		if ('wakeLock' in navigator) {
			try {
				navigator.wakeLock.request('screen');
			} catch (err) {
				console.log('Wake Lock no disponible:', err);
			}
		}
	});
</script>

<!-- Layout sin header ni footer para pantalla completa -->
<div class="tv-layout">
	<slot />
</div>

<style>
	:global(body) {
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
	
	.tv-layout {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
	}
</style>
