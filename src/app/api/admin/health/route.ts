import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

// Admin-only setup check: open /api/admin/health while logged in to /admin.
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  const env = {
    SUPABASE_URL: Boolean(url),
    SUPABASE_SERVICE_KEY: Boolean(key),
    ADMIN_USERNAME: Boolean(process.env.ADMIN_USERNAME),
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    SESSION_SECRET: Boolean(process.env.SESSION_SECRET),
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
  };

  const tables: Record<string, string> = {};
  if (url && key) {
    for (const table of ["enquiries", "brochure_downloads"]) {
      try {
        const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}?select=id&limit=1`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
          cache: "no-store",
        });
        if (res.ok) {
          tables[table] = "OK";
        } else {
          const text = await res.text();
          tables[table] = `ERROR ${res.status}: ${text.slice(0, 200)}`;
        }
      } catch (e) {
        tables[table] = `UNREACHABLE: ${e instanceof Error ? e.message : String(e)}`;
      }
    }
  }

  const hints: string[] = [];
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
    hints.push("Set SUPABASE_URL and SUPABASE_SERVICE_KEY in Vercel, then redeploy.");
  }
  for (const [t, v] of Object.entries(tables)) {
    if (v.includes("404") || v.includes("PGRST205") || v.includes("does not exist")) {
      hints.push(`Table "${t}" is missing: run supabase-schema.sql in the Supabase SQL Editor.`);
    }
    if (v.includes("401") || v.includes("Invalid API key")) {
      hints.push("Supabase rejected the key: use the service_role key (Project Settings > API), not the anon key.");
    }
  }

  return NextResponse.json({ env, tables, hints });
}
