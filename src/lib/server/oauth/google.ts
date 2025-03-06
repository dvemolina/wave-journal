import 'dotenv/config'
import { Google } from "arctic";

let callbackUrl;

if(process.env.NODE_ENV === "production") {
	callbackUrl = `${process.env.PROJECT_URL}/google/callback`
} else {
	callbackUrl = `http://localhost:5173/google/callback`
}
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

export const google = new Google(
	clientId,
	clientSecret,
	callbackUrl
);

export interface GoogleUser {
	googleId: string,
	name: string,
	surname: string,
	email: string,
	profileImage: string
}