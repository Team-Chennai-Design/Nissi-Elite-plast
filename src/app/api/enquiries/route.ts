import { NextRequest, NextResponse } from "next/server";
import { createEnquiry, getEnquiries } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s-]{10,15}$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = checkRateLimit(ip, 8, 10 * 60 * 1000); // 8 submissions per 10 mins

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request format." }, { status: 400 });
    }
    const { name, phone, email, role, city, series, message, hp_field } = body;

    // Honeypot spam trap
    if (hp_field) {
      // Return fake success for automated bots
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid 10 to 15-digit contact phone number." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const trimmedMessage = typeof message === "string" ? message.trim().slice(0, 2000) : "";
    const trimmedCity = typeof city === "string" ? city.trim().slice(0, 100) : "Not Specified";
    const trimmedRole = typeof role === "string" ? role.trim().slice(0, 100) : "Fabricator / Window Manufacturer";
    const trimmedSeries = typeof series === "string" ? series.trim().slice(0, 100) : "60 Casement Series";

    const saved = await createEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      role: trimmedRole,
      city: trimmedCity,
      series: trimmedSeries,
      message: trimmedMessage,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry successfully recorded.",
        id: saved.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error in /api/enquiries:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again or contact us directly." },
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
    const enquiries = await getEnquiries();
    return NextResponse.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to retrieve enquiries." },
      { status: 500 }
    );
  }
}
