import { redirect, type RequestEvent } from "@sveltejs/kit";

export function obtainRedirectUrl(event: RequestEvent, message: string | undefined = "Access your account to use Wave Journal App") {
    try {
        const redirectTo = encodeURIComponent(event.url.pathname + event.url.search);
        const redirectMessage = encodeURIComponent(message);
        return `/access?redirectTo=${redirectTo}&redirectMessage=${redirectMessage}`;
    } catch (error) {
        console.error("Error generating redirect URL", { event, message, error });
        return "/access"; // Fallback URL
    }
}

export function handleAuthRedirect(event: RequestEvent) {
    const redirectUrl = obtainRedirectUrl(event);
    redirect(302, redirectUrl)
}
