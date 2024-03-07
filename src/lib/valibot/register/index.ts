import type { Input} from "valibot"
import {email, maxLength, minLength, object, string} from "valibot"
 
export const RegisterSchema = object({
	email: string([
		minLength(1, 'Skriv inn en gyldig email.'),
		email('Skriv inn en gyldig email e.g eksempel@gmail.com.'),
		maxLength(256, 'Error'),
	]),
	password: string([minLength(1, 'Skriv inn et gyldig passord.')]),
	// Add more fields
	name: string([minLength(2, 'Minst to bokstaver.')]),
	// Add more fields
})
 
export type RegisterForm = Input<typeof RegisterSchema>;