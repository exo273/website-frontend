<script>
	import { enhance } from '$app/forms';
	
	export let data;
	export let form;
	
	let isSubmitting = false;
</script>

<svelte:head>
	<title>Club de Fidelización - {data.config?.site_name || 'Restaurante'}</title>
	<meta name="description" content="Únete a nuestro club de fidelización y disfruta de beneficios exclusivos, descuentos y promociones especiales." />
</svelte:head>

<!-- Hero Section -->
<section 
	class="relative bg-cover bg-center py-20 md:py-32"
	style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);"
>
	<div class="container mx-auto px-4 text-center text-white">
		<h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
			{data.loyaltyProgram.name || 'Club de Fidelización'}
		</h1>
		
		{#if data.loyaltyProgram.description}
			<p class="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto">
				{data.loyaltyProgram.description}
			</p>
		{/if}
		
		<div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span class="font-medium">¡Inscripción Gratuita!</span>
		</div>
	</div>
</section>

<div class="container mx-auto px-4 py-12 md:py-16">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
		<!-- Columna Izquierda: Beneficios -->
		<div>
			<h2 class="text-3xl font-bold mb-6">Beneficios Exclusivos</h2>
			
			{#if data.loyaltyProgram.benefits && data.loyaltyProgram.benefits.length > 0}
				<div class="space-y-4">
					{#each data.loyaltyProgram.benefits as benefit, index}
						<div class="card p-6 hover:shadow-lg transition-shadow">
							<div class="flex items-start gap-4">
								<!-- Número -->
								<div 
									class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
									style="background-color: var(--color-primary);"
								>
									{index + 1}
								</div>
								
								<!-- Contenido -->
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">{benefit.title}</h3>
									<p class="text-surface-600-300-token">
										{benefit.description}
									</p>
									{#if benefit.points_required}
										<div class="mt-3 inline-flex items-center gap-2 text-sm font-medium" style="color: var(--color-accent);">
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
											</svg>
											Requiere {benefit.points_required} puntos
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="card p-8 text-center">
					<svg class="w-16 h-16 mx-auto mb-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
					</svg>
					<p class="text-surface-600-300-token">
						Beneficios próximamente disponibles
					</p>
				</div>
			{/if}
			
			<!-- Cómo funciona -->
			<div class="mt-12">
				<h2 class="text-2xl font-bold mb-6">¿Cómo Funciona?</h2>
				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div class="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">
							1
						</div>
						<div>
							<h4 class="font-bold mb-1">Regístrate Gratis</h4>
							<p class="text-sm text-surface-600-300-token">
								Completa el formulario y recibe tu código de miembro al instante
							</p>
						</div>
					</div>
					
					<div class="flex items-start gap-4">
						<div class="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">
							2
						</div>
						<div>
							<h4 class="font-bold mb-1">Acumula Puntos</h4>
							<p class="text-sm text-surface-600-300-token">
								Por cada compra ganas puntos que puedes canjear por beneficios
							</p>
						</div>
					</div>
					
					<div class="flex items-start gap-4">
						<div class="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">
							3
						</div>
						<div>
							<h4 class="font-bold mb-1">Disfruta Beneficios</h4>
							<p class="text-sm text-surface-600-300-token">
								Descuentos exclusivos, promociones especiales y sorpresas
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Columna Derecha: Formulario -->
		<div class="lg:sticky lg:top-24 lg:self-start">
			{#if form?.success}
				<!-- Mensaje de éxito -->
				<div class="card p-8 text-center bg-success-50 dark:bg-success-900/20 border-2 border-success-500">
					<div class="w-20 h-20 mx-auto mb-4 rounded-full bg-success-500 flex items-center justify-center">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
					</div>
					
					<h2 class="text-2xl font-bold mb-4 text-success-700 dark:text-success-400">
						¡Bienvenido al Club!
					</h2>
					
					<p class="text-lg mb-4">
						Tu código de miembro es:
					</p>
					
					<div class="text-3xl font-mono font-bold mb-6 text-success-600 dark:text-success-300 bg-white dark:bg-surface-800 py-3 rounded-lg">
						{form.member_code}
					</div>
					
					<p class="text-surface-600-300-token mb-6">
						Hemos enviado un correo a <strong>{form.email}</strong> con tu código de miembro y todos los detalles.
					</p>
					
					<a href="/" class="btn variant-filled-primary">
						Volver al Inicio
					</a>
				</div>
			{:else}
				<!-- Formulario de inscripción -->
				<div class="card p-8">
					<h2 class="text-2xl font-bold mb-6">Únete Ahora</h2>
					
					{#if form?.error}
						<div class="alert variant-filled-error mb-6">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p>{form.error}</p>
						</div>
					{/if}
					
					<form
						method="POST"
						use:enhance={() => {
							isSubmitting = true;
							return async ({ update }) => {
								await update();
								isSubmitting = false;
							};
						}}
						class="space-y-6"
					>
						<!-- Nombre -->
						<label class="label">
							<span class="label-text">Nombre Completo *</span>
							<input
								type="text"
								name="name"
								required
								minlength="3"
								class="input"
								class:input-error={form?.errors?.name}
								placeholder="Juan Pérez"
								value={form?.name || ''}
							/>
							{#if form?.errors?.name}
								<span class="text-error-500 text-sm">{form.errors.name}</span>
							{/if}
						</label>
						
						<!-- Email -->
						<label class="label">
							<span class="label-text">Email *</span>
							<input
								type="email"
								name="email"
								required
								class="input"
								class:input-error={form?.errors?.email}
								placeholder="juan@email.com"
								value={form?.email || ''}
							/>
							{#if form?.errors?.email}
								<span class="text-error-500 text-sm">{form.errors.email}</span>
							{/if}
						</label>
						
						<!-- Teléfono -->
						<label class="label">
							<span class="label-text">Teléfono *</span>
							<input
								type="tel"
								name="phone"
								required
								class="input"
								class:input-error={form?.errors?.phone}
								placeholder="+56 9 1234 5678"
								value={form?.phone || ''}
							/>
							{#if form?.errors?.phone}
								<span class="text-error-500 text-sm">{form.errors.phone}</span>
							{/if}
						</label>
						
						<!-- Fecha de nacimiento (opcional) -->
						<label class="label">
							<span class="label-text">Fecha de Nacimiento (Opcional)</span>
							<input
								type="date"
								name="birthdate"
								class="input"
								max={new Date().toISOString().split('T')[0]}
								value={form?.birthdate || ''}
							/>
							<span class="text-xs text-surface-600-300-token">
								¡Recibe una sorpresa especial en tu cumpleaños!
							</span>
						</label>
						
						<!-- Términos -->
						<label class="flex items-start gap-3">
							<input
								type="checkbox"
								required
								class="checkbox"
							/>
							<span class="text-sm">
								Acepto recibir promociones y ofertas especiales del club
							</span>
						</label>
						
						<!-- Botón -->
						<button
							type="submit"
							disabled={isSubmitting}
							class="btn variant-filled w-full text-lg"
							style="background-color: var(--color-primary);"
						>
							{#if isSubmitting}
								<svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Procesando...
							{:else}
								Inscribirme Gratis
							{/if}
						</button>
					</form>
					
					<!-- Nota de privacidad -->
					<p class="text-xs text-surface-600-300-token text-center mt-6">
						Tus datos están protegidos. Lee nuestra <a href="/legal/politica-de-privacidad" class="anchor">política de privacidad</a>.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
