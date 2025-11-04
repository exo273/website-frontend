<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	
	// Store para el menú
	const menuData = writable(null);
	
	// Estado de la conexión
	let connectionStatus = 'connecting'; // 'connecting', 'connected', 'disconnected'
	let ws = null;
	let reconnectTimeout = null;
	let currentCategoryIndex = 0;
	let slideInterval = null;
	
	// Configuración del slideshow
	const SLIDE_DURATION = 10000; // 10 segundos por slide
	const RECONNECT_DELAY = 5000; // 5 segundos para reconectar
	
	/**
	 * Conecta al WebSocket del backend
	 */
	function connectWebSocket() {
		try {
			// Construir URL del WebSocket
			// En producción, usar el dominio y protocolo correctos
			const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
			const host = window.location.host;
			const wsUrl = `${protocol}//${host}/ws/signage/`;
			
			console.log('Conectando a:', wsUrl);
			connectionStatus = 'connecting';
			
			ws = new WebSocket(wsUrl);
			
			ws.onopen = () => {
				console.log('✅ Conectado al servidor de señalización');
				connectionStatus = 'connected';
				
				// Limpiar cualquier timeout de reconexión pendiente
				if (reconnectTimeout) {
					clearTimeout(reconnectTimeout);
					reconnectTimeout = null;
				}
			};
			
			ws.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);
					console.log('📨 Mensaje recibido:', message);
					
					if (message.type === 'menu_update' && message.data) {
						menuData.set(message.data);
						currentCategoryIndex = 0; // Reiniciar slideshow
						console.log('🍽️ Menú actualizado:', message.data);
					}
				} catch (err) {
					console.error('Error al procesar mensaje:', err);
				}
			};
			
			ws.onerror = (error) => {
				console.error('❌ Error de WebSocket:', error);
				connectionStatus = 'disconnected';
			};
			
			ws.onclose = (event) => {
				console.log('🔌 Desconectado del servidor. Código:', event.code);
				connectionStatus = 'disconnected';
				ws = null;
				
				// Intentar reconectar automáticamente
				if (!reconnectTimeout) {
					reconnectTimeout = setTimeout(() => {
						console.log('🔄 Intentando reconectar...');
						connectWebSocket();
					}, RECONNECT_DELAY);
				}
			};
		} catch (err) {
			console.error('Error al crear WebSocket:', err);
			connectionStatus = 'disconnected';
			
			// Reintentar conexión
			if (!reconnectTimeout) {
				reconnectTimeout = setTimeout(connectWebSocket, RECONNECT_DELAY);
			}
		}
	}
	
	/**
	 * Inicia el slideshow automático de categorías
	 */
	function startSlideshow(categories) {
		if (slideInterval) {
			clearInterval(slideInterval);
		}
		
		if (categories && categories.length > 1) {
			slideInterval = setInterval(() => {
				currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
			}, SLIDE_DURATION);
		}
	}
	
	// Reactivar slideshow cuando cambie el menú
	$: if ($menuData?.categories) {
		startSlideshow($menuData.categories);
	}
	
	/**
	 * Filtra productos por categoría
	 */
	function getProductsForCategory(category) {
		if (!$menuData || !$menuData.products) return [];
		
		return $menuData.products.filter(p => p.category_name === category.name);
	}
	
	/**
	 * Formatea el precio en formato chileno
	 */
	function formatPrice(price) {
		if (!price) return '';
		
		const num = parseFloat(price);
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(num);
	}
	
	onMount(() => {
		// Conectar al WebSocket al montar el componente
		connectWebSocket();
		
		// Cleanup al desmontar
		return () => {
			if (ws) {
				ws.close();
			}
			if (reconnectTimeout) {
				clearTimeout(reconnectTimeout);
			}
			if (slideInterval) {
				clearInterval(slideInterval);
			}
		};
	});
	
	onDestroy(() => {
		if (ws) {
			ws.close();
		}
		if (reconnectTimeout) {
			clearTimeout(reconnectTimeout);
		}
		if (slideInterval) {
			clearInterval(slideInterval);
		}
	});
</script>

<svelte:head>
	<title>Menú Digital - K'Vernicola</title>
	<meta name="robots" content="noindex, nofollow">
</svelte:head>

<div class="tv-container">
	{#if connectionStatus === 'connecting'}
		<!-- Estado: Conectando -->
		<div class="loading-screen" transition:fade>
			<div class="loading-content">
				<div class="spinner"></div>
				<h1 class="loading-title">Conectando...</h1>
				<p class="loading-subtitle">Estableciendo conexión con el servidor</p>
			</div>
		</div>
	{:else if connectionStatus === 'disconnected'}
		<!-- Estado: Desconectado -->
		<div class="loading-screen error-screen" transition:fade>
			<div class="loading-content">
				<svg class="error-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<h1 class="loading-title">Conexión Perdida</h1>
				<p class="loading-subtitle">Intentando reconectar automáticamente...</p>
			</div>
		</div>
	{:else if !$menuData}
		<!-- Estado: Cargando menú -->
		<div class="loading-screen" transition:fade>
			<div class="loading-content">
				<div class="spinner"></div>
				<h1 class="loading-title">Cargando Menú...</h1>
				<p class="loading-subtitle">Por favor espere</p>
			</div>
		</div>
	{:else if $menuData.categories && $menuData.categories.length > 0}
		<!-- Estado: Mostrando menú -->
		<div class="menu-display">
			<!-- Header -->
			<header class="menu-header">
				<div class="restaurant-name">
					<h1>K'Vernicola</h1>
					<p class="tagline">Restaurante</p>
				</div>
				<div class="connection-indicator connected">
					<span class="pulse"></span>
					<span>En Vivo</span>
				</div>
			</header>
			
			<!-- Slideshow de categorías -->
			<div class="slideshow-container">
				{#each $menuData.categories as category, index (category.id)}
					{#if index === currentCategoryIndex}
						{@const products = getProductsForCategory(category)}
						
						{#if products.length > 0}
							<div 
								class="slide category-slide"
								in:fly="{{ x: 300, duration: 800, delay: 100 }}"
								out:fly="{{ x: -300, duration: 800 }}"
							>
								<!-- Título de la categoría -->
								<div class="category-header">
									<h2 class="category-title">{category.name}</h2>
									{#if category.description}
										<p class="category-description">{category.description}</p>
									{/if}
								</div>
								
								<!-- Grid de productos -->
								<div class="products-grid">
									{#each products as product (product.id)}
										<div class="product-item" transition:fade>
											<div class="product-header">
												<h3 class="product-name">{product.name}</h3>
												<span class="product-price">{formatPrice(product.web_price)}</span>
											</div>
											
											{#if product.description_display}
												<p class="product-description">{product.description_display}</p>
											{/if}
											
											{#if product.allergens}
												<div class="product-allergens">
													<svg class="allergen-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
														<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
													</svg>
													<span>{product.allergens}</span>
												</div>
											{/if}
											
											{#if product.is_featured}
												<div class="featured-badge">
													<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
													</svg>
													<span>Destacado</span>
												</div>
											{/if}
										</div>
									{/each}
								</div>
								
								<!-- Indicadores de slide -->
								<div class="slide-indicators">
									{#each $menuData.categories as cat, idx}
										<span 
											class="indicator" 
											class:active={idx === currentCategoryIndex}
										></span>
									{/each}
								</div>
							</div>
						{/if}
					{/if}
				{/each}
			</div>
			
			<!-- Footer -->
			<footer class="menu-footer">
				<p>Todos los precios incluyen IVA</p>
				<p class="footer-note">Los platos y precios pueden variar sin previo aviso</p>
			</footer>
		</div>
	{:else}
		<!-- Estado: Sin datos -->
		<div class="loading-screen" transition:fade>
			<div class="loading-content">
				<h1 class="loading-title">No hay menú disponible</h1>
				<p class="loading-subtitle">Esperando datos del sistema...</p>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Layout principal */
	.tv-container {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	
	/* Pantalla de carga */
	.loading-screen {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
	}
	
	.loading-content {
		text-align: center;
		color: white;
	}
	
	.loading-title {
		font-size: 4rem;
		font-weight: 700;
		margin: 2rem 0 1rem;
		color: white;
	}
	
	.loading-subtitle {
		font-size: 1.5rem;
		color: #94a3b8;
	}
	
	/* Spinner */
	.spinner {
		width: 80px;
		height: 80px;
		border: 8px solid rgba(255, 255, 255, 0.1);
		border-top-color: #3b82f6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	
	/* Error screen */
	.error-screen {
		background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%);
	}
	
	.error-icon {
		width: 100px;
		height: 100px;
		color: #fca5a5;
		margin: 0 auto;
	}
	
	/* Menu display */
	.menu-display {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
		color: white;
	}
	
	/* Header */
	.menu-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 3rem 5rem;
		background: rgba(15, 23, 42, 0.8);
		backdrop-filter: blur(10px);
		border-bottom: 2px solid rgba(59, 130, 246, 0.3);
	}
	
	.restaurant-name h1 {
		font-size: 4rem;
		font-weight: 800;
		margin: 0;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.tagline {
		font-size: 1.5rem;
		color: #94a3b8;
		margin: 0.5rem 0 0 0;
	}
	
	.connection-indicator {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		background: rgba(34, 197, 94, 0.2);
		border-radius: 50px;
		font-size: 1.25rem;
		font-weight: 600;
	}
	
	.pulse {
		width: 12px;
		height: 12px;
		background: #22c55e;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}
	
	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.2); }
	}
	
	/* Slideshow */
	.slideshow-container {
		flex: 1;
		position: relative;
		overflow: hidden;
		padding: 3rem 5rem;
	}
	
	.slide {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 3rem 5rem;
		display: flex;
		flex-direction: column;
	}
	
	/* Category */
	.category-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	
	.category-title {
		font-size: 5rem;
		font-weight: 800;
		margin: 0 0 1rem 0;
		background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.category-description {
		font-size: 1.75rem;
		color: #cbd5e1;
		margin: 0;
	}
	
	/* Products grid */
	.products-grid {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 2rem;
		overflow-y: auto;
		padding-right: 1rem;
	}
	
	/* Scrollbar personalizado */
	.products-grid::-webkit-scrollbar {
		width: 10px;
	}
	
	.products-grid::-webkit-scrollbar-track {
		background: rgba(30, 41, 59, 0.5);
		border-radius: 10px;
	}
	
	.products-grid::-webkit-scrollbar-thumb {
		background: rgba(59, 130, 246, 0.5);
		border-radius: 10px;
	}
	
	.products-grid::-webkit-scrollbar-thumb:hover {
		background: rgba(59, 130, 246, 0.7);
	}
	
	/* Product item */
	.product-item {
		background: rgba(30, 41, 59, 0.5);
		border: 2px solid rgba(59, 130, 246, 0.2);
		border-radius: 1.5rem;
		padding: 2rem;
		transition: all 0.3s ease;
	}
	
	.product-item:hover {
		transform: translateY(-4px);
		border-color: rgba(59, 130, 246, 0.5);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}
	
	.product-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.product-name {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		flex: 1;
		color: white;
	}
	
	.product-price {
		font-size: 2.25rem;
		font-weight: 800;
		color: #60a5fa;
		white-space: nowrap;
	}
	
	.product-description {
		font-size: 1.25rem;
		color: #cbd5e1;
		line-height: 1.6;
		margin: 1rem 0;
	}
	
	.product-allergens {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #fbbf24;
		font-size: 1rem;
		margin-top: 1rem;
	}
	
	.allergen-icon {
		width: 20px;
		height: 20px;
	}
	
	.featured-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(251, 191, 36, 0.2);
		border: 1px solid rgba(251, 191, 36, 0.5);
		border-radius: 50px;
		color: #fbbf24;
		font-size: 0.875rem;
		font-weight: 600;
		margin-top: 1rem;
	}
	
	/* Slide indicators */
	.slide-indicators {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 1rem;
		z-index: 10;
	}
	
	.indicator {
		width: 12px;
		height: 12px;
		background: rgba(148, 163, 184, 0.4);
		border-radius: 50%;
		transition: all 0.3s ease;
	}
	
	.indicator.active {
		width: 40px;
		border-radius: 6px;
		background: #3b82f6;
	}
	
	/* Footer */
	.menu-footer {
		text-align: center;
		padding: 2rem;
		background: rgba(15, 23, 42, 0.8);
		border-top: 2px solid rgba(59, 130, 246, 0.3);
		font-size: 1.25rem;
		color: #94a3b8;
	}
	
	.footer-note {
		font-size: 1rem;
		margin-top: 0.5rem;
		color: #64748b;
	}
	
	/* Responsive adjustments */
	@media (max-width: 1920px) {
		.category-title {
			font-size: 4rem;
		}
		
		.product-name {
			font-size: 1.75rem;
		}
		
		.product-price {
			font-size: 2rem;
		}
	}
</style>
