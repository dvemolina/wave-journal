import { journalEntrySchema } from "$src/features/Journal/lib/validations";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import fs from 'fs';
import type { Spot } from "$src/lib/types";


export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(journalEntrySchema))
    const spots: Spot[] = JSON.parse(fs.readFileSync(new URL('../../../../../lib/testSpots.json', import.meta.url), 'utf8'));
    
    return { form, spots }
};