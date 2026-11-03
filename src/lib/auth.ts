import { NextRequest } from "next/server";
import { SESSION_COOKIE, safeEqual, verifySessionToken } from "@/lib/session";

/**
 * Admin check used by every protected API route.
 * Accepts a valid signed session cookie (browser login).
 * Also accepts "Authorization: Bearer <ADMIN_TOKEN>" for scripts / integrations.
 */
export function isAdmin(req: NextRequest): boolean {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  if (verifySessionToken(cookie)) return true;

  const expected = process.env.ADMIN_TOKEN;
  const header = req.headers.get("authorization");
  if (expected && header?.startsWith("Bearer ")) {
    return safeEqual(header.slice(7).trim(), expected);
  }
  return false;
}

/** Checks the dashboard login form against ADMIN_USERNAME / ADMIN_PASSWORD. */
export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;

  // Evaluate both so timing does not reveal which field was wrong.
  const userOk = safeEqual(username, expectedUser);
  const passOk = safeEqual(password, expectedPass);
  return userOk && passOk;
}
