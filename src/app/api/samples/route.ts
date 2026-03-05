import { NextRequest, NextResponse } from "next/server";

// In a real application, you would save this to a database
// For now, we'll just log it and return success
let samples: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const sampleData = await request.json();

    // Validate required fields
    if (!sampleData.location) {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 },
      );
    }

    // Add timestamp if not present
    if (!sampleData.createdAt) {
      sampleData.createdAt = new Date().toISOString();
    }

    // In a real app, save to database
    samples.push(sampleData);
    console.log("New sample saved:", sampleData);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Sample saved successfully",
      data: sampleData,
    });
  } catch (error) {
    console.error("Error saving sample:", error);
    return NextResponse.json(
      { error: "Failed to save sample" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    // In a real app, fetch from database
    return NextResponse.json({
      success: true,
      data: samples,
    });
  } catch (error) {
    console.error("Error fetching samples:", error);
    return NextResponse.json(
      { error: "Failed to fetch samples" },
      { status: 500 },
    );
  }
}
