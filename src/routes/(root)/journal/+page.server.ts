import type { PageServerLoad } from "./$types";
import { handleAuthRedirect } from "$src/lib/utils/utils";
import { JournalService } from "$src/features/Journal/lib/JournalService";

const journalService = new JournalService();


export const load: PageServerLoad = async (event) => {
    const session = event.locals.session;
    const user = event.locals.user;

    if(!user || !session)  if(!user || !session) return handleAuthRedirect(event);

    const journalEntries = await journalService.listUserJournalEntries(user.id);
    
    return { user, journalEntries }
};