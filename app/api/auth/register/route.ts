import { adminAuth, db } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 1. Create Firebase user
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Create Firestore user document
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      createdAt: new Date().toISOString(),
      provider: "credentials"
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Check for Firebase duplicate email error
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: 'Email already exists. Please use a different email or sign in.' },
        { status: 400 }
      );
    }
    // Other errors
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
}
