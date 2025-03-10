import { journalEntrySchema } from "$src/features/Journal/lib/validations";
import type { PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import fs from 'fs';
import type { Spot } from "$src/lib/types";
import type { Actions } from "@sveltejs/kit";
import { JournalService } from "$src/features/Journal/lib/JournalService";

const journalService = new JournalService()


export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(journalEntrySchema))
    const spots: Spot[] = JSON.parse(fs.readFileSync(new URL('../../../../../lib/testSpots.json', import.meta.url), 'utf8'));

    return { form, spots }
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event.request, zod(journalEntrySchema));
        
        if (!form.valid) {
            console.log('Form is Invalid: ', form.errors);
            return fail(400, { form }); // Changed from 401 to 400 as it's more appropriate for validation errors
        }
        
        console.log('Form has passed Validation!', form);
        
        try {
            // Get the user ID from the session
            // You'll need to adapt this based on your auth implementation
            const userId = event.locals.user?.id;
            
            if (!userId) {
                return fail(401, { 
                    form,
                    error: "You must be logged in to create a journal entry" 
                });
            }
            
            // Use the service to create the journal entry
            const result = await journalService.createJournalEntry(form.data, userId);
            
            if (!result.success) {
                return fail(500, { 
                    form,
                    error: result.error 
                });
            }
            
            // Return the success result
            return { 
                form,
                success: true,
                journalEntry: result.data
            };
        } catch (error) {
            console.error("Error processing form submission:", error);
            return fail(500, { 
                form,
                error: "An unexpected error occurred while saving your journal entry"
            });
        }
    }
};