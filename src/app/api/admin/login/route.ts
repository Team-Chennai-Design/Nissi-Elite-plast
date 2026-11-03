import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";
import { checkRateLimit, getClientIp, resetRateLimit } from "@/lib/rate-limit";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/session";

export async function POST(req: NextRequest) {
  const key = `admin-login:${getClientIp(req)}`;
  const { allowed } = checkRateLimit(key, 5, 15 * 60 * 1000); // 5 tries / 15 min / IP
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    console.error("Admin login not configured: set ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET.");
    return NextResponse.json({ error: "Login is not configured on the server." }, { status: 500 });
  }

  if (!username || !password || !verifyCredentials(username, password)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = createSessionToken(username);
  if (!token) {
    return NextResponse.json(
      { error: "SESSION_SECRET must be at least 32 characters." },
      { status: 500 }
    );
  }

  resetRateLimit(key);
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
