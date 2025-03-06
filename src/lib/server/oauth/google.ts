import 'dotenv/config'
import { Google } from "arctic";

const callbackUrl = `${process.env.PROJECT_URL}/google/callback`
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