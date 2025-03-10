import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const response = await event.fetch('/api/breaks');
    const breaks = await response.json()

    return { breaks }
};
