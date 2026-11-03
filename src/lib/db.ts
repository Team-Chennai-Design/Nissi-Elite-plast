import fs from "fs/promises";
import path from "path";
import { after } from "next/server";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  city: string;
  series: string;
  message?: string;
  createdAt: string;
  status: "new" | "contacted" | "qualified" | "closed";
}

export interface BrochureDownload {
  id: string;
  name?: string;
  email: string;
  phone: string;
  seriesInterest?: string;
  brochureName: string;
  downloadedAt: string;
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** Escape user text before putting it in an HTML email (prevents HTML/link injection). */
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** In production the JSON file fallback must never be used: Vercel disks are not persistent. */
function assertStorageReady() {
  if (!isSupabaseConfigured && process.env.NODE_ENV === "production") {
    throw new Error(
      "Database not configured: set SUPABASE_URL and SUPABASE_SERVICE_KEY in the environment."
    );
  }
}

function notify(subject: string, html: string) {
  // after() keeps the serverless function alive until the email is sent.
  try {
    after(() => sendNotificationEmail(subject, html));
  } catch {
    void sendNotificationEmail(subject, html);
  }
}

function getSupabaseHeaders() {
  const key = SUPABASE_KEY!;
  // New-style keys (sb_secret_...) are not JWTs: send them only in "apikey".
  // Legacy service_role keys (JWT, start with "eyJ") also go in Authorization.
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
  };
  if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`;
  return headers;
}

// ---------------- Optional Resend Email Notification ----------------
async function sendNotificationEmail(subject: string, htmlContent: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.LEAD_NOTIFY_EMAIL || "nissiupvcprofiles@gmail.com";

  if (!resendKey) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nissi Leads <leads@nissiupvcgroups.com>",
        to: [targetEmail],
        subject,
        html: htmlContent,
      }),
    });
  } catch (error) {
    console.error("Failed to send lead email notification:", error);
  }
}

// ---------------- Local File Fallback for Offline / Dev ----------------
const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "database.json");
let writeQueue = Promise.resolve();

interface LocalDbSchema {
  enquiries: Enquiry[];
  brochure_downloads: BrochureDownload[];
  metadata: { lastUpdated: string; version: string };
}

async function initLocalDb(): Promise<LocalDbSchema> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    const content = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    const fresh: LocalDbSchema = {
      enquiries: [],
      brochure_downloads: [],
      metadata: { lastUpdated: new Date().toISOString(), version: "1.0.0" },
    };
    try {
      await fs.writeFile(DB_FILE, JSON.stringify(fresh, null, 2), "utf-8");
    } catch {
      // Ephemeral environments like Vercel serverless where fs is read-only
    }
    return fresh;
  }
}

async function writeLocalDb(data: LocalDbSchema): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    try {
      await fs.mkdir(DB_DIR, { recursive: true });
      data.metadata.lastUpdated = new Date().toISOString();
      const tmp = `${DB_FILE}.${Date.now()}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
      await fs.rename(tmp, DB_FILE);
    } catch (e) {
      console.warn("Local file write skipped (filesystem read-only or in production):", e);
    }
  });
  return writeQueue;
}

// ---------------- Public Database Operations ----------------

export async function createEnquiry(
  input: Omit<Enquiry, "id" | "createdAt" | "status">
): Promise<Enquiry> {
  assertStorageReady();
  const id = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  if (isSupabaseConfigured) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: "POST",
      headers: { ...getSupabaseHeaders(), Prefer: "return=representation" },
      body: JSON.stringify({
        id,
        name: input.name,
        phone: input.phone,
        email: input.email,
        role: input.role,
        city: input.city,
        series: input.series,
        message: input.message || "",
        created_at: now,
        status: "new",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase insert enquiry error:", errText);
      throw new Error(`Database error: ${errText}`);
    }

    const records = await res.json();
    const created = records[0];

    // Send background notification email
    notify(
      `New Nissi Lead: ${input.name.replace(/[\r\n]/g, " ")} (${input.role.replace(/[\r\n]/g, " ")})`,
      `<h3>New Fabricator/Dealer Enquiry</h3>
       <p><strong>Name:</strong> ${esc(input.name)}</p>
       <p><strong>Phone:</strong> ${esc(input.phone)}</p>
       <p><strong>Email:</strong> ${esc(input.email)}</p>
       <p><strong>Role:</strong> ${esc(input.role)}</p>
       <p><strong>City:</strong> ${esc(input.city)}</p>
       <p><strong>Series of Interest:</strong> ${esc(input.series)}</p>
       <p><strong>Message:</strong> ${esc(input.message || "None")}</p>`
    );

    return {
      id: created.id,
      name: created.name,
      phone: created.phone,
      email: created.email,
      role: created.role,
      city: created.city,
      series: created.series,
      message: created.message,
      createdAt: created.created_at,
      status: created.status || "new",
    };
  }

  // Local development fallback
  const localDb = await initLocalDb();
  const newEnquiry: Enquiry = {
    id,
    ...input,
    createdAt: now,
    status: "new",
  };
  localDb.enquiries.unshift(newEnquiry);
  await writeLocalDb(localDb);
  return newEnquiry;
}

interface SupabaseEnquiryRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  city: string;
  series: string;
  message?: string;
  created_at: string;
  status: "new" | "contacted" | "qualified" | "closed";
}

interface SupabaseDownloadRow {
  id: string;
  name?: string;
  email: string;
  phone: string;
  series_interest?: string;
  brochure_name: string;
  downloaded_at: string;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  assertStorageReady();
  if (isSupabaseConfigured) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries?order=created_at.desc`, {
      headers: getSupabaseHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const rows: SupabaseEnquiryRow[] = await res.json();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email,
      role: r.role,
      city: r.city,
      series: r.series,
      message: r.message,
      createdAt: r.created_at,
      status: r.status,
    }));
  }

  const localDb = await initLocalDb();
  return localDb.enquiries;
}

export async function createBrochureDownload(
  input: Omit<BrochureDownload, "id" | "downloadedAt">
): Promise<BrochureDownload> {
  assertStorageReady();
  const id = `DL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  if (isSupabaseConfigured) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/brochure_downloads`, {
      method: "POST",
      headers: { ...getSupabaseHeaders(), Prefer: "return=representation" },
      body: JSON.stringify({
        id,
        name: input.name || "",
        email: input.email,
        phone: input.phone,
        series_interest: input.seriesInterest || "",
        brochure_name: input.brochureName,
        downloaded_at: now,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase insert brochure download error:", errText);
      throw new Error(`Database error: ${errText}`);
    }

    const records = await res.json();
    const created = records[0];

    // Notification email
    notify(
      `Catalog Downloaded: ${input.email} (${input.phone})`,
      `<h3>Product Manual Download Lead</h3>
       <p><strong>Name:</strong> ${esc(input.name || "N/A")}</p>
       <p><strong>Email:</strong> ${esc(input.email)}</p>
       <p><strong>Phone:</strong> ${esc(input.phone)}</p>
       <p><strong>Series of Interest:</strong> ${esc(input.seriesInterest || "All")}</p>`
    );

    return {
      id: created.id,
      name: created.name,
      email: created.email,
      phone: created.phone,
      seriesInterest: created.series_interest,
      brochureName: created.brochure_name,
      downloadedAt: created.downloaded_at,
    };
  }

  const localDb = await initLocalDb();
  const newDownload: BrochureDownload = {
    id,
    ...input,
    downloadedAt: now,
  };
  localDb.brochure_downloads.unshift(newDownload);
  await writeLocalDb(localDb);
  return newDownload;
}

export async function getBrochureDownloads(): Promise<BrochureDownload[]> {
  assertStorageReady();
  if (isSupabaseConfigured) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/brochure_downloads?order=downloaded_at.desc`, {
      headers: getSupabaseHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const rows: SupabaseDownloadRow[] = await res.json();
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      seriesInterest: r.series_interest,
      brochureName: r.brochure_name,
      downloadedAt: r.downloaded_at,
    }));
  }

  const localDb = await initLocalDb();
  return localDb.brochure_downloads;
}
