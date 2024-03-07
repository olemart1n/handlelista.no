import type { Input} from "valibot"
import {email, maxLength, minLength, object, string} from "valibot"
 
export const LoginSchema = object({
	email: string([
		minLength(1, 'Skriv inn en gyldig email.'),
		email('Skriv inn en gyldig email e.g eksempel@gmail.com.'),
		maxLength(256, 'Error'),
	]),
	password: string([minLength(1, 'Skriv inn et gyldig passord.')]),
	// Add more fields
})
 
export type LoginForm = Input<typeof LoginSchema>;