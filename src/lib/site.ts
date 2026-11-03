// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is connected.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nissiupvcgroups.com").replace(/\/$/, "");
