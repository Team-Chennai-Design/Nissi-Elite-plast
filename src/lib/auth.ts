import { NextRequest } from "next/server";

export function isAdmin(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken) {
    // In local development fallback when ADMIN_TOKEN is not in .env
    if (process.env.NODE_ENV !== "production") {
      return token === "nissi-admin-2026";
    }
    return false;
  }

  return token === expectedToken;
}
