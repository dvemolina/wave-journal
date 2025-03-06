import type { LayoutServerLoad } from "./$types";
import { handleAuthRedirect } from "$src/lib/utils";


export const load: LayoutServerLoad = async (event) => {
    const session = event.locals.session;
    const user = event.locals.user;

    if(!user || !session) return handleAuthRedirect(event);
    
    return { user };
};