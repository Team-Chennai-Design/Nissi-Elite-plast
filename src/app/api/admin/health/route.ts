import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

function keyRole(key: string): string {
  // Supabase keys are JWTs; the payload says "anon" or "service_role".
  try {
    const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString("utf-8"));
    return String(payload.role || "unknown");
  } catch {
    return "unknown (not a JWT key)";
  }
}

// Admin-only setup check used by the dashboard banner and /api/admin/health.
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  const url = rawUrl?.replace(/\/$/, "");

  const env = {
    SUPABASE_URL: Boolean(rawUrl),
    SUPABASE_SERVICE_KEY: Boolean(key),
    ADMIN_USERNAME: Boolean(process.env.ADMIN_USERNAME),
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    SESSION_SECRET: Boolean(process.env.SESSION_SECRET),
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
  };

  const hints: string[] = [];
  const tables: Record<string, string> = {};
  let writeTest = "skipped";
  let role = "n/a";

  if (!url || !key) {
    hints.push(
      "Supabase is NOT connected: set SUPABASE_URL and SUPABASE_SERVICE_KEY in Vercel and redeploy. Until then new leads are NOT being saved."
    );
  } else {
    role = keyRole(key);
    if (role === "anon") {
      hints.push(
        "SUPABASE_SERVICE_KEY is the ANON key. Use the service_role key (Supabase > Project Settings > API). With the anon key, reads return empty lists and the dashboard shows 0 leads."
      );
    }

    const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

    for (const table of ["enquiries", "brochure_downloads"]) {
      try {
        const res = await fetch(`${url}/rest/v1/${table}?select=id&limit=1`, { headers, cache: "no-store" });
        if (res.ok) {
          tables[table] = "OK";
        } else {
          const text = await res.text();
          tables[table] = `ERROR ${res.status}: ${text.slice(0, 200)}`;
          if (/PGRST205|does not exist|404/.test(tables[table])) {
            hints.push(`Table "${table}" is missing: run supabase-schema.sql in the Supabase SQL Editor.`);
          }
        }
      } catch (e) {
        tables[table] = `UNREACHABLE: ${e instanceof Error ? e.message : String(e)}`;
        hints.push("Cannot reach Supabase: check that SUPABASE_URL is correct (https://xxxx.supabase.co).");
      }
    }

    // Real write test: insert a row, then delete it.
    if (tables.enquiries === "OK") {
      const testId = `HEALTHCHECK-${Date.now()}`;
      try {
        const ins = await fetch(`${url}/rest/v1/enquiries`, {
          method: "POST",
          headers: { ...headers, Prefer: "return=minimal" },
          body: JSON.stringify({ id: testId, name: "health check", phone: "0000000000", email: "health@check.local", status: "new" }),
        });
        if (ins.ok) {
          writeTest = "OK";
          await fetch(`${url}/rest/v1/enquiries?id=eq.${testId}`, { method: "DELETE", headers });
        } else {
          writeTest = `ERROR ${ins.status}: ${(await ins.text()).slice(0, 200)}`;
          hints.push("Saving a lead FAILED. Check the key (must be service_role) and that supabase-schema.sql was run.");
        }
      } catch (e) {
        writeTest = `ERROR: ${e instanceof Error ? e.message : String(e)}`;
      }
    }
  }

  const ok = hints.length === 0 && writeTest === "OK";
  return NextResponse.json({ ok, keyRole: role, env, tables, writeTest, hints });
}
