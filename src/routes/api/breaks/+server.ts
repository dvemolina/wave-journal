import type { RequestHandler } from "@sveltejs/kit";
import fs from 'fs';

export const GET: RequestHandler = async () => {
    const breaks = fs.readFileSync(new URL('../../../features/Breaks/lib/breaks.json', import.meta.url), 'utf8')
    return new Response(breaks)
};