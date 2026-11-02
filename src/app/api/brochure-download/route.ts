import { NextRequest, NextResponse } from "next/server";
import { createBrochureDownload, getBrochureDownloads } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, seriesInterest } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Work email and phone number are required to download." },
        { status: 400 }
      );
    }

    const saved = await createBrochureDownload({
      name: name ? String(name).trim() : "Prospective Lead",
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      seriesInterest: seriesInterest ? String(seriesInterest).trim() : "Complete Product Catalog",
      brochureName: "Nissi Elite Plast UPVC Profiles Product Manual 2026",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Download request authenticated and saved to database.",
        downloadUrl: "/Nissi_Elite_Plast_Product_Manual.pdf",
        data: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error in /api/brochure-download:", error);
    return NextResponse.json(
      { error: "Failed to process download request." },
      { status: 500 }
    );
  }
}

export async function GET() {
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
