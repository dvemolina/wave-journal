import type { PageServerLoad } from "./$types";
import { handleAuthRedirect } from "$src/lib/utils/utils";



export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;
    const user = event.locals.user;

    if(!user || !session)  if(!user || !session) return handleAuthRedirect(event);
    
    return { user }
};