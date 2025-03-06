import type { PageServerLoad } from "./$types";
import { accessRedirect } from "$src/lib/utils";


export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;
    const user = event.locals.user;

    if(!user || !session) return accessRedirect(event, 'Access your account to see your Profile');

    return { user }
};