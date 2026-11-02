import fs from "fs/promises";
import path from "path";

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

export interface DatabaseSchema {
  enquiries: Enquiry[];
  brochure_downloads: BrochureDownload[];
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "database.json");

// In-memory write queue to avoid race conditions
let writeQueue = Promise.resolve();

async function initDb(): Promise<DatabaseSchema> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      return JSON.parse(data) as DatabaseSchema;
    } catch {
      // If file doesn't exist or is corrupted, create initial DB
      const initialDb: DatabaseSchema = {
        enquiries: [],
        brochure_downloads: [],
        metadata: {
          lastUpdated: new Date().toISOString(),
          version: "1.0.0",
        },
      };
      await fs.writeFile(DB_FILE, JSON.stringify(initialDb, null, 2), "utf-8");
      return initialDb;
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return {
      enquiries: [],
      brochure_downloads: [],
      metadata: { lastUpdated: new Date().toISOString(), version: "1.0.0" },
    };
  }
}

async function writeDb(data: DatabaseSchema): Promise<void> {
  // Chain writes sequentially to prevent file corruptions
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DB_DIR, { recursive: true });
    data.metadata.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(data, null, 2), "utf-8");
    await fs.rename(tempFile, DB_FILE);
  });
  return writeQueue;
}

export async function createEnquiry(
  input: Omit<Enquiry, "id" | "createdAt" | "status">
): Promise<Enquiry> {
  const db = await initDb();
  const newEnquiry: Enquiry = {
    id: `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    ...input,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  db.enquiries.unshift(newEnquiry);
  await writeDb(db);
  return newEnquiry;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const db = await initDb();
  return db.enquiries;
}

export async function createBrochureDownload(
  input: Omit<BrochureDownload, "id" | "downloadedAt">
): Promise<BrochureDownload> {
  const db = await initDb();
  const newDownload: BrochureDownload = {
    id: `DL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    ...input,
    downloadedAt: new Date().toISOString(),
  };

  db.brochure_downloads.unshift(newDownload);
  await writeDb(db);
  return newDownload;
}

export async function getBrochureDownloads(): Promise<BrochureDownload[]> {
  const db = await initDb();
  return db.brochure_downloads;
}

export async function getDatabaseStats() {
  const db = await initDb();
  const today = new Date().toISOString().split("T")[0];

  const todayEnquiries = db.enquiries.filter((e) =>
    e.createdAt.startsWith(today)
  ).length;

  const todayDownloads = db.brochure_downloads.filter((d) =>
    d.downloadedAt.startsWith(today)
  ).length;

  return {
    totalEnquiries: db.enquiries.length,
    totalDownloads: db.brochure_downloads.length,
    todayEnquiries,
    todayDownloads,
    lastUpdated: db.metadata.lastUpdated,
  };
}
