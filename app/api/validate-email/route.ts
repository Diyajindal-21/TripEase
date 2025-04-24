// /app/api/validate-email/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const apiKey = process.env.ZEROBOUNCE_API_KEY; // Store your key in .env.local
  const ip_address = ""; // Optional: can pass user's IP if desired

  const zbRes = await fetch(
    `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}&ip_address=${ip_address}`
  );
  const data = await zbRes.json();

  return NextResponse.json(data);
}
