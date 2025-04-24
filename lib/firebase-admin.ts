import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Ensure proper environment variable usage
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize only once using a singleton pattern
const app = getApps().length === 0 
  ? initializeApp({ credential: cert(firebaseConfig) }) 
  : getApps()[0];

export const adminAuth = getAuth(app);
export const db = getFirestore(app);
