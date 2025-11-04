<script>
	import { enhance } from '$app/forms';
	
	export let form;
	
	// Estado del formulario
	let isSubmitting = false;
	let selectedDate = '';
	let selectedTime = '';
	
	// Generar horarios disponibles (11:00 - 23:00, cada 30 min)
	const availableTimes = [];
	for (let hour = 11; hour <= 23; hour++) {
		for (let minute of ['00', '30']) {
			if (hour === 23 && minute === '30') continue; // Último horario 23:00
			const time = `${hour.toString().padStart(2, '0')}:${minute}`;
			availableTimes.push(time);
		}
	}
	
	// Fecha mínima (hoy)
	const today = new Date().toISOString().split('T')[0];
	
	// Fecha máxima (3 meses adelante)
	const maxDate = new Date();
	maxDate.setMonth(maxDate.getMonth() + 3);
	const maxDateStr = maxDate.toISOString().split('T')[0];
</script>

<svelte:head>
	<title>Reservar Mesa - {data.config?.site_name || 'Restaurante'}</title>
	<meta name="description" content="Reserva tu mesa en nuestro restaurante. Selecciona fecha, hora y número de personas." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-b from-surface-50-900-token to-surface-100-800-token py-16 md:py-24">
	<div class="container mx-auto px-4 text-center">
		<h1 class="text-4xl md:text-6xl font-bold mb-4" style="color: var(--color-primary);">
			Reservar Mesa
		</h1>
		<p class="text-lg md:text-xl text-surface-600-300-token max-w-2xl mx-auto">
			Asegura tu lugar y disfruta de una experiencia gastronómica inolvidable
		</p>
	</div>
</section>

<section class="py-12 md:py-16">
	<div class="container mx-auto px-4">
		<div class="max-w-2xl mx-auto">
			{#if form?.success}
				<!-- Mensaje de éxito -->
				<div class="card p-8 text-center bg-success-50 dark:bg-success-900/20 border-2 border-success-500">
					<div class="w-20 h-20 mx-auto mb-4 rounded-full bg-success-500 flex items-center justify-center">
						<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
					</div>
					
					<h2 class="text-3xl font-bold mb-4 text-success-700 dark:text-success-400">
						¡Reserva Confirmada!
					</h2>
					
					<p class="text-lg mb-6">
						Tu código de reserva es:
					</p>
					
					<div class="text-4xl font-mono font-bold mb-6 text-success-600 dark:text-success-300 bg-white dark:bg-surface-800 py-4 rounded-lg">
						{form.confirmation_code}
					</div>
					
					<p class="text-surface-600-300-token mb-8">
						Hemos enviado un correo de confirmación a <strong>{form.email}</strong> con todos los detalles de tu reserva.
						Por favor, presenta este código al llegar al restaurante.
					</p>
					
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="/" class="btn variant-filled-primary">
							Volver al Inicio
						</a>
						<a href="/reservas" class="btn variant-ghost-surface">
							Nueva Reserva
						</a>
					</div>
				</div>
			{:else}
				<!-- Formulario de reserva -->
				<form
					method="POST"
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							await update();
							isSubmitting = false;
						};
					}}
					class="card p-8"
				>
					<h2 class="text-2xl font-bold mb-6">Completa tus Datos</h2>
					
					<!-- Errores generales -->
					{#if form?.error}
						<div class="alert variant-filled-error mb-6">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p>{form.error}</p>
						</div>
					{/if}
					
					<div class="space-y-6">
						<!-- Nombre completo -->
						<label class="label">
							<span class="label-text">Nombre Completo *</span>
							<input
								type="text"
								name="customer_name"
								required
								minlength="3"
								maxlength="100"
								class="input"
								class:input-error={form?.errors?.customer_name}
								placeholder="Juan Pérez"
								value={form?.customer_name || ''}
							/>
							{#if form?.errors?.customer_name}
								<span class="text-error-500 text-sm">{form.errors.customer_name}</span>
							{/if}
						</label>
						
						<!-- Email -->
						<label class="label">
							<span class="label-text">Email *</span>
							<input
								type="email"
								name="customer_email"
								required
								class="input"
								class:input-error={form?.errors?.customer_email}
								placeholder="juan@email.com"
								value={form?.customer_email || ''}
							/>
							{#if form?.errors?.customer_email}
								<span class="text-error-500 text-sm">{form.errors.customer_email}</span>
							{/if}
						</label>
						
						<!-- Teléfono -->
						<label class="label">
							<span class="label-text">Teléfono *</span>
							<input
								type="tel"
								name="customer_phone"
								required
								pattern="[+]?[0-9\s\-()]+"
								class="input"
								class:input-error={form?.errors?.customer_phone}
								placeholder="+56 9 1234 5678"
								value={form?.customer_phone || ''}
							/>
							{#if form?.errors?.customer_phone}
								<span class="text-error-500 text-sm">{form.errors.customer_phone}</span>
							{/if}
							<span class="text-sm text-surface-600-300-token">Incluye código de país (ej: +56)</span>
						</label>
						
						<!-- Fecha -->
						<label class="label">
							<span class="label-text">Fecha de Reserva *</span>
							<input
								type="date"
								name="reservation_date"
								required
								min={today}
								max={maxDateStr}
								bind:value={selectedDate}
								class="input"
								class:input-error={form?.errors?.reservation_date}
							/>
							{#if form?.errors?.reservation_date}
								<span class="text-error-500 text-sm">{form.errors.reservation_date}</span>
							{/if}
						</label>
						
						<!-- Hora -->
						<label class="label">
							<span class="label-text">Hora *</span>
							<select
								name="reservation_time"
								required
								bind:value={selectedTime}
								class="select"
								class:input-error={form?.errors?.reservation_time}
							>
								<option value="">Selecciona una hora</option>
								{#each availableTimes as time}
									<option value={time} selected={form?.reservation_time === time}>
										{time}
									</option>
								{/each}
							</select>
							{#if form?.errors?.reservation_time}
								<span class="text-error-500 text-sm">{form.errors.reservation_time}</span>
							{/if}
						</label>
						
						<!-- Número de personas -->
						<label class="label">
							<span class="label-text">Número de Personas *</span>
							<input
								type="number"
								name="party_size"
								required
								min="1"
								max="20"
								class="input"
								class:input-error={form?.errors?.party_size}
								placeholder="2"
								value={form?.party_size || '2'}
							/>
							{#if form?.errors?.party_size}
								<span class="text-error-500 text-sm">{form.errors.party_size}</span>
							{/if}
							<span class="text-sm text-surface-600-300-token">Para grupos mayores a 10 personas, contáctanos directamente</span>
						</label>
						
						<!-- Notas especiales -->
						<label class="label">
							<span class="label-text">Notas Especiales (Opcional)</span>
							<textarea
								name="special_requests"
								rows="4"
								maxlength="500"
								class="textarea"
								placeholder="Alergias, preferencias de mesa, ocasión especial, etc."
								value={form?.special_requests || ''}
							></textarea>
							<span class="text-sm text-surface-600-300-token">Máximo 500 caracteres</span>
						</label>
						
						<!-- Términos y condiciones -->
						<label class="flex items-start gap-3">
							<input
								type="checkbox"
								name="accept_terms"
								required
								class="checkbox"
							/>
							<span class="text-sm">
								Acepto los <a href="/legal/terminos-y-condiciones" class="anchor">términos y condiciones</a> y la <a href="/legal/politica-de-privacidad" class="anchor">política de privacidad</a>
							</span>
						</label>
					</div>
					
					<!-- Botón de envío -->
					<div class="mt-8">
						<button
							type="submit"
							disabled={isSubmitting}
							class="btn variant-filled w-full text-lg"
							style="background-color: var(--color-accent);"
						>
							{#if isSubmitting}
								<svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Procesando...
							{:else}
								Confirmar Reserva
							{/if}
						</button>
					</div>
					
					<!-- Información adicional -->
					<div class="mt-6 p-4 bg-surface-100-800-token rounded-lg">
						<h3 class="font-bold mb-2 flex items-center gap-2">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Información Importante
						</h3>
						<ul class="text-sm text-surface-600-300-token space-y-1 list-disc list-inside">
							<li>Las reservas deben hacerse con al menos 2 horas de anticipación</li>
							<li>Mantendremos tu mesa reservada por 15 minutos</li>
							<li>Para cancelaciones, contáctanos con 24 horas de anticipación</li>
							<li>Recibirás un correo de confirmación con tu código de reserva</li>
						</ul>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
