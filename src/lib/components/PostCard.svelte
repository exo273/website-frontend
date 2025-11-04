<script>
	export let post;
	
	// Formatear fecha
	const formattedDate = new Intl.DateTimeFormat('es-CL', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(post.published_date));
</script>

<article class="card card-hover overflow-hidden h-full flex flex-col">
	<!-- Imagen destacada -->
	{#if post.featured_image}
		<a href="/blog/{post.slug}" class="block aspect-video overflow-hidden">
			<img
				src={post.featured_image}
				alt={post.title}
				loading="lazy"
				class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
			/>
		</a>
	{:else}
		<a href="/blog/{post.slug}" class="block aspect-video bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
			<svg class="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
			</svg>
		</a>
	{/if}
	
	<!-- Contenido -->
	<div class="p-6 flex flex-col flex-1">
		<!-- Categoría y fecha -->
		<div class="flex items-center gap-3 mb-3 text-sm text-surface-600-300-token">
			{#if post.category_name}
				<span class="badge variant-soft-primary uppercase text-xs">
					{post.category_name}
				</span>
			{/if}
			<span class="flex items-center gap-1">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				{formattedDate}
			</span>
		</div>
		
		<!-- Título -->
		<a href="/blog/{post.slug}" class="block mb-3">
			<h2 class="text-2xl font-bold hover:text-primary-500 transition-colors">
				{post.title}
			</h2>
		</a>
		
		<!-- Excerpt -->
		<p class="text-surface-600-300-token mb-4 flex-1 line-clamp-3">
			{post.excerpt || post.content?.substring(0, 150) + '...'}
		</p>
		
		<!-- Footer con tags y enlace -->
		<div class="flex items-center justify-between mt-auto pt-4 border-t border-surface-200-700-token">
			<!-- Tags -->
			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each post.tags.slice(0, 3) as tag}
						<span class="badge variant-ghost-surface text-xs">
							#{tag}
						</span>
					{/each}
				</div>
			{:else}
				<div></div>
			{/if}
			
			<!-- Botón Leer más -->
			<a href="/blog/{post.slug}" class="btn variant-ghost-primary btn-sm">
				Leer más →
			</a>
		</div>
	</div>
</article>

<style>
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
