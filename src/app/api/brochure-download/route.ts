import { NextRequest, NextResponse } from "next/server";
import { createBrochureDownload, getBrochureDownloads } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s-]{10,15}$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(ip, 12, 10 * 60 * 1000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Download rate limit reached. Please wait a moment." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request format." }, { status: 400 });
    }
    const { name, email, phone, seriesInterest, hp_field } = body;

    // Honeypot check
    if (hp_field) {
      return NextResponse.json({
        success: true,
        downloadUrl: "/Nissi_Elite_Plast_Product_Manual.pdf",
      });
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid work or personal email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid 10 to 15-digit mobile number." },
        { status: 400 }
      );
    }

    const trimmedName = typeof name === "string" ? name.trim().slice(0, 100) : "";
    const trimmedInterest = typeof seriesInterest === "string" ? seriesInterest.trim().slice(0, 100) : "Complete Product Catalog";

    const saved = await createBrochureDownload({
      name: trimmedName,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      seriesInterest: trimmedInterest,
      brochureName: "Nissi Elite Plast UPVC Profiles Product Manual 2026",
    });

    return NextResponse.json(
      {
        success: true,
        downloadUrl: "/Nissi_Elite_Plast_Product_Manual.pdf",
        id: saved.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error in /api/brochure-download:", error);
    return NextResponse.json(
      { error: "Failed to process download request. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid administrator authorization header required." },
      { status: 401 }
    );
  }

  try {
    const downloads = await getBrochureDownloads();
    return NextResponse.json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    console.error("Error fetching brochure download logs:", error);
    return NextResponse.json(
      { error: "Failed to retrieve download records." },
      { status: 500 }
    );
  }
}
