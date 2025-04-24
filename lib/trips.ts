import { db } from '@/lib/firebase-admin';

export const saveTrip = async (userId: string, tripData: Record<string, any>) => {
  const docRef = await db.collection('users').doc(userId).collection('trips').add({
    ...tripData,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};
