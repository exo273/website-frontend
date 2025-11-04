<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	
	export let data;
	
	// Obtener la fecha actual en español
	const currentDate = new Intl.DateTimeFormat('es-CL', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date());
	
	// Capitalizar primera letra
	const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
</script>

<svelte:head>
	<title>{data.menuData.menu_title} - {data.config?.site_name}</title>
	<meta name="description" content={data.menuData.menu_description} />
</svelte:head>

<!-- Hero Section -->
<section 
	class="relative bg-cover bg-center py-20 md:py-32"
	style="background-image: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)), url('/hero-bg.jpg');"
>
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
			{data.menuData.menu_title}
		</h1>
		
		<p class="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto">
			{data.menuData.menu_description}
		</p>
		
		<!-- Fecha -->
		<div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
			<span class="font-medium">{formattedDate}</span>
		</div>
	</div>
</section>

<!-- Banner Informativo -->
{#if data.menuData.menu_footer_text}
	<div 
		class="py-4 text-center text-white font-medium"
		style="background-color: var(--color-accent);"
	>
		<div class="container mx-auto px-4">
			{data.menuData.menu_footer_text}
		</div>
	</div>
{/if}

<!-- Filtros de Categoría -->
{#if data.menuData.categories && data.menuData.categories.length > 0}
	<section class="bg-surface-50-900-token py-6 border-b border-surface-200-700-token sticky top-[72px] z-40">
		<div class="container mx-auto px-4">
			<div class="flex flex-wrap gap-3 justify-center">
				<!-- Botón "Todas" -->
				<a
					href="/"
					class="btn"
					class:variant-filled-primary={!data.selectedCategory}
					class:variant-ghost-surface={data.selectedCategory}
				>
					Todas las Categorías
				</a>
				
				<!-- Botones de Categorías -->
				{#each data.menuData.categories as category}
					<a
						href="/?category={category.id}"
						class="btn"
						class:variant-filled-primary={data.selectedCategory == category.id}
						class:variant-ghost-surface={data.selectedCategory != category.id}
					>
						{category.name}
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Grid de Productos -->
<section class="py-12 md:py-16">
	<div class="container mx-auto px-4">
		{#if data.menuData.products && data.menuData.products.length > 0}
			<!-- Grid Responsivo -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each data.menuData.products as product}
					<ProductCard {product} />
				{/each}
			</div>
		{:else}
			<!-- Estado Vacío -->
			<div class="text-center py-16">
				<svg class="w-24 h-24 mx-auto text-surface-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
				<h3 class="text-2xl font-bold mb-2">No hay productos disponibles</h3>
				<p class="text-surface-600-300-token mb-6">
					{#if data.selectedCategory}
						No encontramos productos en esta categoría en este momento.
					{:else}
						El menú se está actualizando. Vuelve pronto.
					{/if}
				</p>
				{#if data.selectedCategory}
					<a href="/" class="btn variant-filled-primary">
						Ver Todas las Categorías
					</a>
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- Call to Action - Reservas -->
{#if data.config?.visible_pages?.reservations}
	<section class="bg-surface-100-800-token py-16">
		<div class="container mx-auto px-4 text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">
				¿Te gustaría reservar una mesa?
			</h2>
			<p class="text-lg text-surface-600-300-token mb-8 max-w-2xl mx-auto">
				Asegura tu lugar y disfruta de una experiencia gastronómica inolvidable
			</p>
			<a 
				href="/reservas" 
				class="btn variant-filled text-lg px-8 py-4"
				style="background-color: var(--color-accent);"
			>
				Reservar Ahora
			</a>
		</div>
	</section>
{/if}

<style>
	/* Animación de hover para las tarjetas */
	:global(.card-hover) {
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	
	:global(.card-hover:hover) {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
	}
	
	/* Limitar líneas de texto */
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
