<script>
	export let data;
	
	// Generar URL de Google Maps con la dirección
	$: mapsUrl = data.config?.contact_address 
		? `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(data.config.contact_address)}`
		: '';
	
	// Parsear horarios de apertura
	$: openingHours = data.config?.opening_hours || [];
</script>

<svelte:head>
	<title>Cómo Llegar - {data.config?.site_name || 'Restaurante'}</title>
	<meta name="description" content="Encuéntranos fácilmente. Dirección, horarios y formas de contacto de nuestro restaurante." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-b from-surface-50-900-token to-surface-100-800-token py-16 md:py-24">
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-4xl md:text-6xl font-bold mb-4" style="color: var(--color-primary);">
			Cómo Llegar
		</h1>
		<p class="text-lg md:text-xl text-surface-600-300-token max-w-2xl mx-auto">
			Visítanos y disfruta de una experiencia gastronómica única
		</p>
	</div>
</section>

<div class="container mx-auto px-4 py-12 md:py-16">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
		<!-- Columna Izquierda: Información de Contacto -->
		<div class="space-y-8">
			<!-- Dirección -->
			{#if data.config?.contact_address}
				<div class="card p-6">
					<div class="flex items-start gap-4">
						<div 
							class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
							style="background-color: var(--color-primary);"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-2">Dirección</h3>
							<p class="text-surface-600-300-token mb-3">
								{data.config.contact_address}
							</p>
							<a
								href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(data.config.contact_address)}"
								target="_blank"
								rel="noopener noreferrer"
								class="btn variant-ghost-primary btn-sm"
							>
								Ver en Google Maps →
							</a>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Teléfono -->
			{#if data.config?.contact_phone}
				<div class="card p-6">
					<div class="flex items-start gap-4">
						<div 
							class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
							style="background-color: var(--color-primary);"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-2">Teléfono</h3>
							<a 
								href="tel:{data.config.contact_phone}"
								class="text-lg font-medium hover:text-primary-500 transition-colors"
							>
								{data.config.contact_phone}
							</a>
							<div class="flex gap-2 mt-3">
								<a href="tel:{data.config.contact_phone}" class="btn variant-ghost-primary btn-sm">
									Llamar
								</a>
								<a 
									href="https://wa.me/{data.config.contact_phone.replace(/[^0-9]/g, '')}"
									target="_blank"
									rel="noopener noreferrer"
									class="btn variant-ghost-success btn-sm"
								>
									WhatsApp
								</a>
							</div>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Email -->
			{#if data.config?.contact_email}
				<div class="card p-6">
					<div class="flex items-start gap-4">
						<div 
							class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
							style="background-color: var(--color-primary);"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-2">Email</h3>
							<a 
								href="mailto:{data.config.contact_email}"
								class="text-lg font-medium hover:text-primary-500 transition-colors"
							>
								{data.config.contact_email}
							</a>
							<div class="mt-3">
								<a href="mailto:{data.config.contact_email}" class="btn variant-ghost-primary btn-sm">
									Enviar Email
								</a>
							</div>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Horarios -->
			{#if openingHours.length > 0}
				<div class="card p-6">
					<div class="flex items-start gap-4">
						<div 
							class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
							style="background-color: var(--color-primary);"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-4">Horarios de Atención</h3>
							<div class="space-y-2">
								{#each openingHours as hour}
									<div class="flex justify-between items-center">
										<span class="font-medium">{hour.day}</span>
										<span class="text-surface-600-300-token">
											{hour.hours}
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Redes Sociales -->
			{#if data.config?.facebook_url || data.config?.instagram_url || data.config?.twitter_url}
				<div class="card p-6">
					<h3 class="text-xl font-bold mb-4">Síguenos en Redes Sociales</h3>
					<div class="flex gap-4">
						{#if data.config.facebook_url}
							<a
								href={data.config.facebook_url}
								target="_blank"
								rel="noopener noreferrer"
								class="btn variant-soft hover:variant-filled-primary"
								aria-label="Facebook"
							>
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</a>
						{/if}
						
						{#if data.config.instagram_url}
							<a
								href={data.config.instagram_url}
								target="_blank"
								rel="noopener noreferrer"
								class="btn variant-soft hover:variant-filled-primary"
								aria-label="Instagram"
							>
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg>
							</a>
						{/if}
						
						{#if data.config.twitter_url}
							<a
								href={data.config.twitter_url}
								target="_blank"
								rel="noopener noreferrer"
								class="btn variant-soft hover:variant-filled-primary"
								aria-label="Twitter"
							>
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
								</svg>
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
		
		<!-- Columna Derecha: Mapa -->
		<div class="lg:sticky lg:top-24 lg:self-start">
			<div class="card overflow-hidden">
				<!-- Mapa de Google Maps -->
				{#if data.config?.contact_address}
					<div class="aspect-[4/3] w-full bg-surface-200-700-token relative">
						<!-- Placeholder mientras se carga el mapa -->
						<div class="absolute inset-0 flex items-center justify-center">
							<div class="text-center">
								<svg class="w-16 h-16 mx-auto mb-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
								</svg>
								<p class="text-surface-600-300-token mb-4">
									Mapa interactivo de ubicación
								</p>
								<a
									href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(data.config.contact_address)}"
									target="_blank"
									rel="noopener noreferrer"
									class="btn variant-filled-primary"
								>
									Abrir en Google Maps
								</a>
							</div>
						</div>
						
						<!-- Nota: Para producción, necesitarás obtener una API Key de Google Maps -->
						<!-- <iframe
							src={mapsUrl}
							frameborder="0"
							class="absolute inset-0 w-full h-full"
							allowfullscreen
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
						></iframe> -->
					</div>
				{:else}
					<div class="aspect-[4/3] w-full bg-surface-200-700-token flex items-center justify-center">
						<p class="text-surface-600-300-token">Mapa no disponible</p>
					</div>
				{/if}
				
				<!-- Indicaciones -->
				<div class="p-6">
					<h3 class="text-xl font-bold mb-4">Cómo Llegar</h3>
					<div class="space-y-4">
						<div>
							<h4 class="font-medium mb-2 flex items-center gap-2">
								<svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
								</svg>
								En Metro / Transporte Público
							</h4>
							<p class="text-sm text-surface-600-300-token">
								Estación más cercana: [Nombre de la estación]
								<br>Aprox. 5 minutos caminando
							</p>
						</div>
						
						<div>
							<h4 class="font-medium mb-2 flex items-center gap-2">
								<svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
								</svg>
								En Auto
							</h4>
							<p class="text-sm text-surface-600-300-token">
								Estacionamiento disponible en la zona
								<br>Entrada por [calle principal]
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- CTA Reservas -->
	{#if data.config?.visible_pages?.reservations}
		<div class="mt-16 text-center">
			<div class="card p-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
				<h2 class="text-3xl font-bold mb-4">¿Listo para visitarnos?</h2>
				<p class="text-xl mb-6 text-white/90">
					Reserva tu mesa ahora y asegura tu lugar
				</p>
				<a href="/reservas" class="btn variant-filled bg-white text-primary-500 hover:bg-white/90 text-lg px-8 py-4">
					Reservar Mesa
				</a>
			</div>
		</div>
	{/if}
</div>
