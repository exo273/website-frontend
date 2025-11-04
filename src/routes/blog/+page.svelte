<script>
	import PostCard from '$lib/components/PostCard.svelte';
	
	export let data;
	
	// Estado del formulario de búsqueda
	let searchInput = data.searchTerm;
	
	// Manejar búsqueda
	function handleSearch(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const search = formData.get('search');
		
		// Construir URL con parámetros
		const params = new URLSearchParams();
		if (search) params.set('search', search);
		if (data.selectedCategory) params.set('category', data.selectedCategory);
		
		window.location.href = `/blog?${params.toString()}`;
	}
</script>

<svelte:head>
	<title>Blog - {data.config?.site_name || 'Restaurante'}</title>
	<meta name="description" content="Descubre las últimas noticias, recetas y eventos de nuestro restaurante." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-b from-surface-50-900-token to-surface-100-800-token py-16 md:py-24">
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-4xl md:text-6xl font-bold mb-4" style="color: var(--color-primary);">
			Blog
		</h1>
		<p class="text-lg md:text-xl text-surface-600-300-token max-w-2xl mx-auto mb-8">
			Noticias, recetas y eventos especiales
		</p>
		
		<!-- Formulario de búsqueda -->
		<form on:submit={handleSearch} class="max-w-xl mx-auto">
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type="search"
					name="search"
					placeholder="Buscar artículos..."
					bind:value={searchInput}
					class="input"
				/>
				<button type="submit" class="btn variant-filled-primary">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
			</div>
		</form>
	</div>
</section>

<div class="container mx-auto px-4 py-12">
	<div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
		<!-- Columna Principal - Posts -->
		<div>
			<!-- Filtros activos -->
			{#if data.searchTerm || data.selectedCategory}
				<div class="mb-6 flex flex-wrap items-center gap-3">
					<span class="text-sm text-surface-600-300-token">Filtros activos:</span>
					
					{#if data.searchTerm}
						<a href="/blog" class="chip variant-soft">
							🔍 "{data.searchTerm}"
							<span>✕</span>
						</a>
					{/if}
					
					{#if data.selectedCategory}
						<a href="/blog{data.searchTerm ? `?search=${data.searchTerm}` : ''}" class="chip variant-soft">
							📁 {data.blogData.categories.find(c => c.id == data.selectedCategory)?.name || 'Categoría'}
							<span>✕</span>
						</a>
					{/if}
					
					<a href="/blog" class="btn btn-sm variant-ghost-surface">
						Limpiar filtros
					</a>
				</div>
			{/if}
			
			<!-- Grid de Posts -->
			{#if data.blogData.posts && data.blogData.posts.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{#each data.blogData.posts as post}
						<PostCard {post} />
					{/each}
				</div>
				
				<!-- Paginación -->
				{#if data.blogData.total_pages > 1}
					<div class="flex items-center justify-center gap-2">
						<!-- Anterior -->
						{#if data.currentPage > 1}
							<a
								href="/blog?page={data.currentPage - 1}{data.selectedCategory ? `&category=${data.selectedCategory}` : ''}{data.searchTerm ? `&search=${data.searchTerm}` : ''}"
								class="btn variant-ghost-surface"
							>
								← Anterior
							</a>
						{/if}
						
						<!-- Números de página -->
						{#each Array(data.blogData.total_pages) as _, i}
							{@const pageNum = i + 1}
							<a
								href="/blog?page={pageNum}{data.selectedCategory ? `&category=${data.selectedCategory}` : ''}{data.searchTerm ? `&search=${data.searchTerm}` : ''}"
								class="btn btn-sm"
								class:variant-filled-primary={pageNum === data.currentPage}
								class:variant-ghost-surface={pageNum !== data.currentPage}
							>
								{pageNum}
							</a>
						{/each}
						
						<!-- Siguiente -->
						{#if data.currentPage < data.blogData.total_pages}
							<a
								href="/blog?page={data.currentPage + 1}{data.selectedCategory ? `&category=${data.selectedCategory}` : ''}{data.searchTerm ? `&search=${data.searchTerm}` : ''}"
								class="btn variant-ghost-surface"
							>
								Siguiente →
							</a>
						{/if}
					</div>
				{/if}
			{:else}
				<!-- Estado Vacío -->
				<div class="text-center py-16">
					<svg class="w-24 h-24 mx-auto text-surface-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
					</svg>
					<h3 class="text-2xl font-bold mb-2">No encontramos artículos</h3>
					<p class="text-surface-600-300-token mb-6">
						{#if data.searchTerm || data.selectedCategory}
							Intenta con otros filtros o vuelve a ver todos los artículos.
						{:else}
							El blog se está actualizando. Vuelve pronto.
						{/if}
					</p>
					{#if data.searchTerm || data.selectedCategory}
						<a href="/blog" class="btn variant-filled-primary">
							Ver Todos los Artículos
						</a>
					{/if}
				</div>
			{/if}
		</div>
		
		<!-- Sidebar -->
		<aside class="space-y-6">
			<!-- Categorías -->
			{#if data.blogData.categories && data.blogData.categories.length > 0}
				<div class="card p-6">
					<h3 class="text-xl font-bold mb-4">Categorías</h3>
					<div class="space-y-2">
						{#each data.blogData.categories as category}
							<a
								href="/blog?category={category.id}"
								class="flex items-center justify-between p-2 rounded hover:bg-surface-100-800-token transition-colors"
								class:bg-primary-500={data.selectedCategory == category.id}
								class:text-white={data.selectedCategory == category.id}
							>
								<span>{category.name}</span>
								<span class="badge variant-soft text-xs">{category.post_count || 0}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Tags Populares -->
			{#if data.blogData.tags && data.blogData.tags.length > 0}
				<div class="card p-6">
					<h3 class="text-xl font-bold mb-4">Tags Populares</h3>
					<div class="flex flex-wrap gap-2">
						{#each data.blogData.tags as tag}
							<a
								href="/blog?search={tag}"
								class="badge variant-soft-primary hover:variant-filled-primary transition-colors"
							>
								#{tag}
							</a>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- CTA Newsletter (opcional) -->
			<div class="card p-6 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
				<h3 class="text-xl font-bold mb-2">Suscríbete al Newsletter</h3>
				<p class="text-white/90 text-sm mb-4">
					Recibe las últimas noticias y ofertas especiales
				</p>
				<form class="space-y-2">
					<input
						type="email"
						placeholder="tu@email.com"
						class="input"
						required
					/>
					<button type="submit" class="btn variant-filled w-full bg-white text-primary-500 hover:bg-white/90">
						Suscribirme
					</button>
				</form>
			</div>
		</aside>
	</div>
</div>
