import { NextRequest, NextResponse } from "next/server";
import { createEnquiry, getEnquiries } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, role, city, series, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required fields." },
        { status: 400 }
      );
    }

    const saved = await createEnquiry({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      role: role ? String(role).trim() : "Fabricator / Window Manufacturer",
      city: city ? String(city).trim() : "Not Specified",
      series: series ? String(series).trim() : "General Enquiry",
      message: message ? String(message).trim() : "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry successfully recorded in database.",
        data: saved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error in /api/enquiries:", error);
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
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
