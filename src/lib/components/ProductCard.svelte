<script>
	export let product;
	
	// Formatear precio
	function formatPrice(price) {
		if (!price) return '';
		return new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<div class="card card-hover overflow-hidden h-full flex flex-col">
	<!-- Imagen del Producto -->
	{#if product.image_url}
		<div class="relative overflow-hidden aspect-[4/3] bg-surface-200-700-token">
			<img
				src={product.image_url}
				alt={product.name}
				class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
				loading="lazy"
			/>
		</div>
	{:else}
		<!-- Placeholder si no hay imagen -->
		<div class="relative overflow-hidden aspect-[4/3] bg-surface-200-700-token flex items-center justify-center">
			<svg class="w-16 h-16 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
		</div>
	{/if}
	
	<!-- Contenido -->
	<div class="p-4 flex-1 flex flex-col">
		<!-- Categoría -->
		{#if product.category_name}
			<span class="text-xs font-medium text-primary-500 uppercase tracking-wide mb-2">
				{product.category_name}
			</span>
		{/if}
		
		<!-- Nombre del Producto -->
		<h3 class="text-xl font-bold mb-2">
			{product.name}
		</h3>
		
		<!-- Descripción -->
		{#if product.description_display}
			<p class="text-surface-600-300-token text-sm mb-4 line-clamp-3 flex-1">
				{product.description_display}
			</p>
		{/if}
		
		<!-- Footer con Precio y Disponibilidad -->
		<div class="flex items-center justify-between mt-auto pt-3 border-t border-surface-200-700-token">
			<!-- Precio -->
			{#if product.web_price}
				<span class="text-2xl font-bold" style="color: var(--color-accent);">
					{formatPrice(product.web_price)}
				</span>
			{/if}
			
			<!-- Indicador de Disponibilidad -->
			{#if !product.is_available}
				<span class="badge variant-soft-error text-xs">
					No disponible
				</span>
			{/if}
		</div>
		
		<!-- Alérgenos -->
		{#if product.allergens && product.allergens.length > 0}
			<div class="flex flex-wrap gap-1 mt-3">
				{#each product.allergens as allergen}
					<span class="badge variant-ghost-surface text-xs">
						{allergen}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</div>
