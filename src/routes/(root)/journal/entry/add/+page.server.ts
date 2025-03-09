import { journalEntrySchema } from "$src/features/Journal/lib/validations";
import type { PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import fs from 'fs';
import type { Spot } from "$src/lib/types";
import type { Actions } from "@sveltejs/kit";


export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(journalEntrySchema))
    const spots: Spot[] = JSON.parse(fs.readFileSync(new URL('../../../../../lib/testSpots.json', import.meta.url), 'utf8'));
    
    return { form, spots }
};

export const actions: Actions = {
    default: async (event) => {
        
        const form = await superValidate(event.request, zod(journalEntrySchema));
        if(!form.valid) {
            console.log('Form is Invalid: ', form.errors)
            return fail(401, { form })
        }

        console.log('Form has passed Validation!', form)
        return { form }

    }
};