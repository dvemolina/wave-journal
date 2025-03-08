import { journalEntrySchema } from "$src/features/Journal/lib/journalValidation";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";


export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(journalEntrySchema))
    return form
};