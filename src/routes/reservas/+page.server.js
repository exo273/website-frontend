import { api } from '$lib/utils/api';
import { fail } from '@sveltejs/kit';

/**
 * Action para manejar el envío del formulario de reservas
 */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		
		// Extraer datos del formulario
		const reservationData = {
			customer_name: formData.get('customer_name'),
			customer_email: formData.get('customer_email'),
			customer_phone: formData.get('customer_phone'),
			reservation_date: formData.get('reservation_date'),
			reservation_time: formData.get('reservation_time'),
			party_size: parseInt(formData.get('party_size')),
			special_requests: formData.get('special_requests') || ''
		};
		
		// Validación básica del lado del servidor
		const errors = {};
		
		if (!reservationData.customer_name || reservationData.customer_name.length < 3) {
			errors.customer_name = 'El nombre debe tener al menos 3 caracteres';
		}
		
		if (!reservationData.customer_email || !reservationData.customer_email.includes('@')) {
			errors.customer_email = 'Email inválido';
		}
		
		if (!reservationData.customer_phone || reservationData.customer_phone.length < 8) {
			errors.customer_phone = 'Teléfono inválido';
		}
		
		if (!reservationData.reservation_date) {
			errors.reservation_date = 'Fecha requerida';
		}
		
		if (!reservationData.reservation_time) {
			errors.reservation_time = 'Hora requerida';
		}
		
		if (!reservationData.party_size || reservationData.party_size < 1 || reservationData.party_size > 20) {
			errors.party_size = 'Número de personas debe estar entre 1 y 20';
		}
		
		// Si hay errores, retornar fail con los errores
		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				...reservationData
			});
		}
		
		try {
			// Enviar reserva al backend
			const response = await api.createReservation(reservationData);
			
			// Retornar éxito con el código de confirmación
			return {
				success: true,
				confirmation_code: response.confirmation_code,
				email: reservationData.customer_email
			};
		} catch (error) {
			console.error('Error creating reservation:', error);
			
			// Retornar error
			return fail(500, {
				error: error.message || 'Error al procesar la reserva. Por favor, intenta nuevamente o contáctanos directamente.',
				...reservationData
			});
		}
	}
};
