<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Drawer } from '@skeletonlabs/skeleton';
	
	export let data;
	
	// Estado del menú móvil
	let mobileMenuOpen = false;
	
	// Cerrar menú al cambiar de ruta
	$: $page.url.pathname, (mobileMenuOpen = false);
	
	// Aplicar colores dinámicos desde la API
	$: if (data.config) {
		if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--color-primary', data.config.primary_color);
			document.documentElement.style.setProperty('--color-secondary', data.config.secondary_color);
			document.documentElement.style.setProperty('--color-accent', data.config.accent_color);
		}
	}
	
	// Google Analytics
	onMount(() => {
		if (data.config?.google_analytics_id) {
			// Inyectar script de Google Analytics
			const script1 = document.createElement('script');
			script1.async = true;
			script1.src = `https://www.googletagmanager.com/gtag/js?id=${data.config.google_analytics_id}`;
			document.head.appendChild(script1);
			
			const script2 = document.createElement('script');
			script2.innerHTML = `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${data.config.google_analytics_id}');
			`;
			document.head.appendChild(script2);
		}
	});
	
	// Tracking de pageviews en cambios de ruta
	$: if (typeof gtag !== 'undefined' && $page.url.pathname) {
		gtag('config', data.config?.google_analytics_id, {
			page_path: $page.url.pathname
		});
	}
	
	// Helper para verificar si una página está visible
	function isPageVisible(pageName) {
		return data.config?.visible_pages?.[pageName] ?? false;
	}
	
	// Toggle menú móvil
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<svelte:head>
	<title>{data.config?.site_name || "K'Vernicola"}</title>
	<meta name="description" content={data.config?.meta_description || "Restaurante K'Vernicola"} />
</svelte:head>

<!-- Header -->
<header class="bg-surface-100-800-token border-b border-surface-300-600-token sticky top-0 z-50 shadow-md">
	<div class="container mx-auto px-4">
		<nav class="flex items-center justify-between py-4">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-3">
				{#if data.config?.logo_url}
					<img 
						src={data.config.logo_url} 
						alt={data.config.site_name} 
						class="h-12 w-auto"
					/>
				{/if}
				<div class="flex flex-col">
					<span class="text-2xl font-bold" style="color: var(--color-primary)">
						{data.config?.site_name || "K'Vernicola"}
					</span>
					{#if data.config?.tagline}
						<span class="text-sm text-surface-600-300-token">
							{data.config.tagline}
						</span>
					{/if}
				</div>
			</a>
			
			<!-- Navigation Links -->
			<div class="hidden md:flex items-center space-x-6">
				<a 
					href="/" 
					class="hover:text-primary-500 transition-colors font-medium"
					class:text-primary-500={$page.url.pathname === '/'}
				>
					Menú
				</a>
				
				{#if isPageVisible('gallery')}
					<a 
						href="/galeria" 
						class="hover:text-primary-500 transition-colors font-medium"
						class:text-primary-500={$page.url.pathname.startsWith('/galeria')}
					>
						Galería
					</a>
				{/if}
				
				{#if isPageVisible('blog')}
					<a 
						href="/blog" 
						class="hover:text-primary-500 transition-colors font-medium"
						class:text-primary-500={$page.url.pathname.startsWith('/blog')}
					>
						Blog
					</a>
				{/if}
				
				{#if isPageVisible('contact')}
					<a 
						href="/como-llegar" 
						class="hover:text-primary-500 transition-colors font-medium"
						class:text-primary-500={$page.url.pathname.startsWith('/como-llegar')}
					>
						Cómo Llegar
					</a>
				{/if}
				
				{#if isPageVisible('loyalty_club')}
					<a 
						href="/club-fidelizacion" 
						class="hover:text-primary-500 transition-colors font-medium"
						class:text-primary-500={$page.url.pathname.startsWith('/club-fidelizacion')}
					>
						Club
					</a>
				{/if}
				
				{#if isPageVisible('reservations')}
					<a 
						href="/reservas" 
						class="btn variant-filled-primary"
						style="background-color: var(--color-accent);"
					>
						Reservar Mesa
					</a>
				{/if}
			</div>
			
			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="md:hidden btn btn-sm variant-ghost"
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</nav>
	</div>
</header>

<!-- Mobile Menu Overlay & Drawer -->
{#if mobileMenuOpen}
	<!-- Overlay -->
	<div 
		class="md:hidden fixed inset-0 z-40 bg-black/50" 
		on:click={toggleMobileMenu}
		on:keydown={(e) => e.key === 'Escape' && toggleMobileMenu()}
		role="button"
		tabindex="0"
	></div>
	
	<!-- Drawer -->
	<nav class="md:hidden fixed top-0 right-0 bottom-0 z-50 w-64 bg-surface-50-900-token shadow-2xl overflow-y-auto">
		<div class="p-6">
			<!-- Close Button -->
			<button
				on:click={toggleMobileMenu}
				class="absolute top-4 right-4 btn btn-sm variant-ghost"
				aria-label="Close menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			
			<!-- Logo -->
			<div class="mb-8">
				<span class="text-xl font-bold" style="color: var(--color-primary)">
					{data.config?.site_name || "K'Vernicola"}
				</span>
			</div>
			
			<!-- Menu Items -->
			<div class="space-y-2">
				<a 
					href="/"
					class="block px-4 py-3 rounded-lg hover:bg-surface-200-700-token transition-colors font-medium"
					class:bg-primary-500={$page.url.pathname === '/'}
					class:text-white={$page.url.pathname === '/'}
				>
					Menú
				</a>
				
				{#if isPageVisible('gallery')}
					<a 
						href="/galeria"
						class="block px-4 py-3 rounded-lg hover:bg-surface-200-700-token transition-colors font-medium"
						class:bg-primary-500={$page.url.pathname.startsWith('/galeria')}
						class:text-white={$page.url.pathname.startsWith('/galeria')}
					>
						Galería
					</a>
				{/if}
				
				{#if isPageVisible('blog')}
					<a 
						href="/blog"
						class="block px-4 py-3 rounded-lg hover:bg-surface-200-700-token transition-colors font-medium"
						class:bg-primary-500={$page.url.pathname.startsWith('/blog')}
						class:text-white={$page.url.pathname.startsWith('/blog')}
					>
						Blog
					</a>
				{/if}
				
				{#if isPageVisible('contact')}
					<a 
						href="/como-llegar"
						class="block px-4 py-3 rounded-lg hover:bg-surface-200-700-token transition-colors font-medium"
						class:bg-primary-500={$page.url.pathname.startsWith('/como-llegar')}
						class:text-white={$page.url.pathname.startsWith('/como-llegar')}
					>
						Cómo Llegar
					</a>
				{/if}
				
				{#if isPageVisible('loyalty_club')}
					<a 
						href="/club-fidelizacion"
						class="block px-4 py-3 rounded-lg hover:bg-surface-200-700-token transition-colors font-medium"
						class:bg-primary-500={$page.url.pathname.startsWith('/club-fidelizacion')}
						class:text-white={$page.url.pathname.startsWith('/club-fidelizacion')}
					>
						Club de Fidelización
					</a>
				{/if}
				
				{#if isPageVisible('reservations')}
					<a 
						href="/reservas"
						class="block px-4 py-3 rounded-lg text-center font-bold text-white mt-4"
						style="background-color: var(--color-accent);"
					>
						Reservar Mesa
					</a>
				{/if}
			</div>
			
			<!-- Footer Links en móvil -->
			{#if data.legalPages && data.legalPages.length > 0}
				<div class="mt-8 pt-6 border-t border-surface-200-700-token">
					<div class="space-y-2">
						{#each data.legalPages as legalPage}
							<a 
								href="/legal/{legalPage.slug}"
								class="block px-4 py-2 text-sm text-surface-600-300-token hover:text-primary-500"
							>
								{legalPage.title}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</nav>
{/if}

<!-- Main Content -->
<main class="min-h-screen">
	<slot />
</main>

<!-- Footer -->
<footer class="bg-surface-100-800-token border-t border-surface-300-600-token mt-auto">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Información de Contacto -->
			<div>
				<h3 class="text-lg font-bold mb-4" style="color: var(--color-primary)">Contacto</h3>
				<div class="space-y-2 text-surface-600-300-token">
					{#if data.config?.address}
						<p class="flex items-start space-x-2">
							<svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span>{data.config.address}</span>
						</p>
					{/if}
					
					{#if data.config?.phone}
						<p class="flex items-center space-x-2">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
							<a href="tel:{data.config.phone}" class="hover:text-primary-500">
								{data.config.phone}
							</a>
						</p>
					{/if}
					
					{#if data.config?.email}
						<p class="flex items-center space-x-2">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							<a href="mailto:{data.config.email}" class="hover:text-primary-500">
								{data.config.email}
							</a>
						</p>
					{/if}
				</div>
			</div>
			
			<!-- Horario -->
			<div>
				<h3 class="text-lg font-bold mb-4" style="color: var(--color-primary)">Horario</h3>
				<div class="space-y-1 text-surface-600-300-token text-sm">
					{#if data.config?.opening_hours}
						{#each Object.entries(data.config.opening_hours) as [day, hours]}
							<div class="flex justify-between">
								<span class="capitalize">{day}:</span>
								<span>{hours}</span>
							</div>
						{/each}
					{/if}
				</div>
			</div>
			
			<!-- Redes Sociales y Enlaces Legales -->
			<div>
				<h3 class="text-lg font-bold mb-4" style="color: var(--color-primary)">Síguenos</h3>
				<div class="flex space-x-4 mb-6">
					{#if data.config?.social_links?.facebook}
						<a 
							href={data.config.social_links.facebook} 
							target="_blank" 
							rel="noopener noreferrer"
							class="hover:text-primary-500 transition-colors"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
						</a>
					{/if}
					
					{#if data.config?.social_links?.instagram}
						<a 
							href={data.config.social_links.instagram} 
							target="_blank" 
							rel="noopener noreferrer"
							class="hover:text-primary-500 transition-colors"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
					{/if}
					
					{#if data.config?.social_links?.twitter}
						<a 
							href={data.config.social_links.twitter} 
							target="_blank" 
							rel="noopener noreferrer"
							class="hover:text-primary-500 transition-colors"
						>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</a>
					{/if}
				</div>
				
				<!-- Enlaces Legales -->
				{#if data.legalPages && data.legalPages.length > 0}
					<div class="text-sm">
						<h4 class="font-semibold mb-2">Legal</h4>
						<div class="space-y-1 text-surface-600-300-token">
							{#each data.legalPages as legalPage}
								<div>
									<a 
										href="/legal/{legalPage.slug}" 
										class="hover:text-primary-500 transition-colors"
									>
										{legalPage.title}
									</a>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
		
		<!-- Copyright -->
		<div class="border-t border-surface-300-600-token mt-8 pt-6 text-center text-sm text-surface-600-300-token">
			<p>{data.config?.footer_copyright || data.config?.footer_text || "© 2025 K'Vernicola"}</p>
		</div>
	</div>
</footer>
