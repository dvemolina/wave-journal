import type { PageServerLoad } from "./$types";
import { handleAuthRedirect } from "$src/lib/utils/utils";
import { UserService } from "$src/features/Users/lib/UserService";

const userService = new UserService()
export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;
    const user = event.locals.user;

    if(!user || !session) return handleAuthRedirect(event);

    const userData = await userService.getUserById(user.id);

    return { user, userData }
};