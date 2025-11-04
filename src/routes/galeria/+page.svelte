<script>
	import { fade } from 'svelte/transition';
	
	export let data;
	
	// Estado del modal lightbox
	let selectedImage = null;
	let currentIndex = 0;
	
	// Abrir imagen en lightbox
	function openLightbox(image, index) {
		selectedImage = image;
		currentIndex = index;
	}
	
	// Cerrar lightbox
	function closeLightbox() {
		selectedImage = null;
	}
	
	// Navegar a imagen anterior
	function previousImage() {
		if (currentIndex > 0) {
			currentIndex--;
			selectedImage = data.galleryData.images[currentIndex];
		}
	}
	
	// Navegar a imagen siguiente
	function nextImage() {
		if (currentIndex < data.galleryData.images.length - 1) {
			currentIndex++;
			selectedImage = data.galleryData.images[currentIndex];
		}
	}
	
	// Cerrar con tecla Escape
	function handleKeydown(event) {
		if (!selectedImage) return;
		
		if (event.key === 'Escape') closeLightbox();
		if (event.key === 'ArrowLeft') previousImage();
		if (event.key === 'ArrowRight') nextImage();
	}
</script>

<svelte:head>
	<title>Galería - {data.config?.site_name || 'Restaurante'}</title>
	<meta name="description" content="Explora nuestra galería de imágenes y descubre los momentos especiales de nuestro restaurante." />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Hero Section -->
<section class="bg-gradient-to-b from-surface-50-900-token to-surface-100-800-token py-16 md:py-24">
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-4xl md:text-6xl font-bold mb-4" style="color: var(--color-primary);">
			Galería de Imágenes
		</h1>
		<p class="text-lg md:text-xl text-surface-600-300-token max-w-2xl mx-auto">
			Descubre los momentos especiales, nuestros platillos y el ambiente de nuestro restaurante
		</p>
	</div>
</section>

<!-- Filtros de Categoría -->
{#if data.galleryData.categories && data.galleryData.categories.length > 0}
	<section class="bg-surface-50-900-token py-6 border-b border-surface-200-700-token sticky top-[72px] z-40">
		<div class="container mx-auto px-4">
			<div class="flex flex-wrap gap-3 justify-center">
				<!-- Botón "Todas" -->
				<a
					href="/galeria"
					class="btn"
					class:variant-filled-primary={!data.selectedCategory}
					class:variant-ghost-surface={data.selectedCategory}
				>
					Todas las Categorías
				</a>
				
				<!-- Botones de Categorías -->
				{#each data.galleryData.categories as category}
					<a
						href="/galeria?category={category.id}"
						class="btn"
						class:variant-filled-primary={data.selectedCategory == category.id}
						class:variant-ghost-surface={data.selectedCategory != category.id}
					>
						{category.name}
						<span class="badge variant-soft ml-2">{category.image_count}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Grid de Imágenes -->
<section class="py-12 md:py-16">
	<div class="container mx-auto px-4">
		{#if data.galleryData.images && data.galleryData.images.length > 0}
			<!-- Masonry Grid con Tailwind -->
			<div class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
				{#each data.galleryData.images as image, index}
					<button
						on:click={() => openLightbox(image, index)}
						class="block w-full break-inside-avoid group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
					>
						<!-- Imagen -->
						<img
							src={image.image_url}
							alt={image.title}
							loading="lazy"
							class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
						/>
						
						<!-- Overlay con título -->
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
							<div class="text-white">
								<h3 class="font-bold text-lg mb-1">{image.title}</h3>
								{#if image.category_name}
									<span class="badge variant-filled text-xs">{image.category_name}</span>
								{/if}
							</div>
						</div>
						
						<!-- Ícono de expansión -->
						<div class="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<svg class="w-5 h-5 text-surface-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
							</svg>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<!-- Estado Vacío -->
			<div class="text-center py-16">
				<svg class="w-24 h-24 mx-auto text-surface-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				<h3 class="text-2xl font-bold mb-2">No hay imágenes disponibles</h3>
				<p class="text-surface-600-300-token mb-6">
					{#if data.selectedCategory}
						No encontramos imágenes en esta categoría.
					{:else}
						La galería se está actualizando. Vuelve pronto.
					{/if}
				</p>
				{#if data.selectedCategory}
					<a href="/galeria" class="btn variant-filled-primary">
						Ver Todas las Categorías
					</a>
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- Lightbox Modal -->
{#if selectedImage}
	<div
		class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
		on:click={closeLightbox}
		transition:fade={{ duration: 200 }}
	>
		<!-- Botón Cerrar -->
		<button
			on:click={closeLightbox}
			class="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors z-50"
		>
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		
		<!-- Navegación Anterior -->
		{#if currentIndex > 0}
			<button
				on:click|stopPropagation={previousImage}
				class="absolute left-4 text-white hover:text-primary-400 transition-colors"
			>
				<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
		{/if}
		
		<!-- Imagen Principal -->
		<div class="max-w-6xl max-h-full" on:click|stopPropagation>
			<img
				src={selectedImage.image_url}
				alt={selectedImage.title}
				class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
			/>
			
			<!-- Info de la imagen -->
			<div class="mt-4 text-white text-center">
				<h2 class="text-2xl font-bold mb-2">{selectedImage.title}</h2>
				{#if selectedImage.description}
					<p class="text-white/80 mb-2">{selectedImage.description}</p>
				{/if}
				{#if selectedImage.category_name}
					<span class="badge variant-filled-primary">{selectedImage.category_name}</span>
				{/if}
				<p class="text-sm text-white/60 mt-2">
					{currentIndex + 1} / {data.galleryData.images.length}
				</p>
			</div>
		</div>
		
		<!-- Navegación Siguiente -->
		{#if currentIndex < data.galleryData.images.length - 1}
			<button
				on:click|stopPropagation={nextImage}
				class="absolute right-4 text-white hover:text-primary-400 transition-colors"
			>
				<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	/* Columnas responsivas para masonry */
	@media (min-width: 768px) {
		.columns-2 {
			column-count: 2;
		}
	}
	
	@media (min-width: 1024px) {
		.columns-3 {
			column-count: 3;
		}
	}
	
	@media (min-width: 1280px) {
		.columns-4 {
			column-count: 4;
		}
	}
</style>
