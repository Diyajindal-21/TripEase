// app/api/save-trip/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { tripdata, formData, user } = await req.json();
    const userId = user?.uid || user?.id || null;
    const docId = Date.now().toString();

    await db.collection("trips").doc(docId).set({
      userSelection: formData,
      tripdata, // If tripdata is a JSON string, else just use tripdata
      userEmail: user?.email,
      userId,
      id: docId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: docId });
  } catch (error) {
    console.error("Error saving trip:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }, 
      { status: 500 }
    );
  }
}
