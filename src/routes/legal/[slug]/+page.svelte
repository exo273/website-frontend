<script>
	export let data;
	
	// Formatear fecha de última actualización
	const formattedDate = new Intl.DateTimeFormat('es-CL', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(data.page.updated_at));
</script>

<svelte:head>
	<title>{data.page.title} - {data.config?.site_name || 'Restaurante'}</title>
	<meta name="description" content={data.page.title} />
	<meta name="robots" content="index, follow" />
</svelte:head>

<!-- Breadcrumb -->
<nav class="bg-surface-50-900-token border-b border-surface-200-700-token py-4">
	<div class="container mx-auto px-4">
		<ol class="breadcrumb">
			<li class="crumb"><a href="/">Inicio</a></li>
			<li class="crumb-separator" aria-hidden>/</li>
			<li class="crumb">{data.page.title}</li>
		</ol>
	</div>
</nav>

<article class="py-12 md:py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<header class="mb-8 pb-6 border-b border-surface-200-700-token">
				<h1 class="text-4xl md:text-5xl font-bold mb-4">
					{data.page.title}
				</h1>
				
				<div class="flex items-center gap-2 text-sm text-surface-600-300-token">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>Última actualización: {formattedDate}</span>
				</div>
			</header>
			
			<!-- Contenido de la página legal -->
			<div class="blog-content prose prose-lg max-w-none">
				{@html data.page.content}
			</div>
			
			<!-- Footer con información de contacto -->
			{#if data.config?.contact_email}
				<div class="mt-12 pt-6 border-t border-surface-200-700-token">
					<div class="card p-6 bg-surface-100-800-token">
						<h3 class="text-lg font-bold mb-2">¿Tienes preguntas?</h3>
						<p class="text-surface-600-300-token mb-4">
							Si tienes alguna duda sobre nuestras políticas, no dudes en contactarnos.
						</p>
						<div class="flex flex-wrap gap-4">
							{#if data.config.contact_email}
								<a href="mailto:{data.config.contact_email}" class="btn variant-ghost-primary btn-sm">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
									</svg>
									{data.config.contact_email}
								</a>
							{/if}
							{#if data.config.contact_phone}
								<a href="tel:{data.config.contact_phone}" class="btn variant-ghost-primary btn-sm">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
									</svg>
									{data.config.contact_phone}
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Navegación -->
			<div class="mt-8">
				<a href="/" class="btn variant-ghost-primary">
					← Volver al Inicio
				</a>
			</div>
		</div>
	</div>
</article>
