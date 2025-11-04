import { api } from '$lib/utils/api';

/**
 * Carga la información del programa de fidelización
 */
export async function load() {
	try {
		const loyaltyProgram = await api.getLoyaltyProgram();
		
		return {
			loyaltyProgram
		};
	} catch (error) {
		console.error('Error loading loyalty program:', error);
		
		// Retornar estructura vacía en caso de error
		return {
			loyaltyProgram: {
				name: 'Club de Fidelización',
				description: '',
				benefits: []
			}
		};
	}
}

/**
 * Action para manejar la inscripción al club
 */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		
		const memberData = {
			name: formData.get('name'),
			email: formData.get('email'),
			phone: formData.get('phone'),
			birthdate: formData.get('birthdate') || null
		};
		
		// Validación básica
		const errors = {};
		
		if (!memberData.name || memberData.name.length < 3) {
			errors.name = 'El nombre debe tener al menos 3 caracteres';
		}
		
		if (!memberData.email || !memberData.email.includes('@')) {
			errors.email = 'Email inválido';
		}
		
		if (!memberData.phone || memberData.phone.length < 8) {
			errors.phone = 'Teléfono inválido';
		}
		
		if (Object.keys(errors).length > 0) {
			return {
				success: false,
				errors,
				...memberData
			};
		}
		
		try {
			const response = await api.joinLoyaltyClub(memberData);
			
			return {
				success: true,
				member_code: response.member_code,
				email: memberData.email
			};
		} catch (error) {
			console.error('Error joining loyalty club:', error);
			
			return {
				success: false,
				error: error.message || 'Error al procesar tu inscripción. Por favor, intenta nuevamente.',
				...memberData
			};
		}
	}
};
