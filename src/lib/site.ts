// Single source of truth for the public site URL.
// Accepts SITE_URL or NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.nissiupvcgroups.com"
).replace(/\/$/, "");
