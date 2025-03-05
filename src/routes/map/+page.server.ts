import type { Spot } from "$src/lib/types";
import type { PageServerLoad } from "./$types";
import fs from 'fs'

export const load: PageServerLoad = async () => {
    const spots: Spot[] = JSON.parse(fs.readFileSync(new URL('../../lib/testSpots.json', import.meta.url), 'utf8'));

    return { spots }
};
