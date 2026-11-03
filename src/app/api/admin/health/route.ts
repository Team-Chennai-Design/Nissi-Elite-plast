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

  if (url) {
    let parsed: URL | null = null;
    try {
      parsed = new URL(url);
    } catch {
      hints.push("SUPABASE_URL is not a valid URL. It must look like https://xxxx.supabase.co");
    }
    if (parsed && (parsed.pathname !== "/" && parsed.pathname !== "")) {
      hints.push(
        `SUPABASE_URL contains a path (${parsed.pathname}). Use ONLY the Project URL, e.g. https://xxxx.supabase.co (no /dashboard, /rest/v1 or other path).`
      );
    }
    if (parsed && !/\.supabase\.(co|in)$/i.test(parsed.hostname)) {
      hints.push(
        `SUPABASE_URL host "${parsed.hostname}" is not a Supabase project address. Copy the Project URL from Supabase > Project Settings > API (it ends with .supabase.co).`
      );
    }
  }

  if (!url || !key) {
    hints.push(
      "Supabase is NOT connected: set SUPABASE_URL and SUPABASE_SERVICE_KEY in Vercel and redeploy. Until then new leads are NOT being saved."
    );
  } else {
    role = keyRole(key);
    if (key.startsWith("sb_publishable_")) {
      hints.push("SUPABASE_SERVICE_KEY is a PUBLISHABLE key. Use the secret key (sb_secret_...) or the legacy service_role key.");
    }
    if (role === "anon") {
      hints.push(
        "SUPABASE_SERVICE_KEY is the ANON key. Use the service_role key (Supabase > Project Settings > API). With the anon key, reads return empty lists and the dashboard shows 0 leads."
      );
    }

    const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
    if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`;

    for (const table of ["enquiries", "brochure_downloads"]) {
      try {
        const res = await fetch(`${url}/rest/v1/${table}?select=id&limit=1`, { headers, cache: "no-store" });
        if (res.ok) {
          const body = await res.text();
          let isJsonArray = false;
          try {
            isJsonArray = Array.isArray(JSON.parse(body));
          } catch {
            isJsonArray = false;
          }
          if (isJsonArray) {
            tables[table] = "OK";
          } else {
            tables[table] = `ERROR: response was not Supabase data (${body.slice(0, 80).replace(/\s+/g, " ")})`;
            hints.push("SUPABASE_URL does not point to your Supabase API (got a web page back). Use the Project URL from Project Settings > API.");
          }
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
          hints.push(`Saving a lead FAILED. Supabase said: ${writeTest}`);
          if (/ERROR 405/.test(writeTest)) {
            hints.push("405 = the address does not accept saves. SUPABASE_URL is wrong: it must be exactly the Project URL (https://xxxx.supabase.co), not the dashboard link, a website URL or the database connection string. Fix it in Vercel and redeploy.");
          }
          if (/42501|row-level security|401|403/i.test(writeTest)) {
            hints.push("Permission denied: the key is not a secret/service_role key. Copy the secret key (sb_secret_...) into SUPABASE_SERVICE_KEY and redeploy.");
          }
          if (/PGRST204|column/i.test(writeTest)) {
            hints.push("A column is missing: the tables were not created by supabase-schema.sql. Drop both tables and run the full script again.");
          }
          if (/22P02|invalid input syntax|uuid/i.test(writeTest)) {
            hints.push("The id column has the wrong type (uuid instead of text). Drop both tables and run the full supabase-schema.sql again.");
          }
          if (/23502|null value/i.test(writeTest)) {
            hints.push("A column has an extra NOT NULL rule. Drop both tables and run the full supabase-schema.sql again.");
          }
        }
      } catch (e) {
        writeTest = `ERROR: ${e instanceof Error ? e.message : String(e)}`;
      }
    }
  }

  const ok = hints.length === 0 && writeTest === "OK";
  return NextResponse.json({ ok, keyRole: role, env, tables, writeTest, hints });
}
