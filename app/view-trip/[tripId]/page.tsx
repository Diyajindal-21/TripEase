'use client'
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import DailyVisit from "./components/DailyVisit";
import Footer from "./components/Footer";

interface TripData {
  id: string;
  userSelection: {
    days: string;
    budget: string;
    traveler: string;
    location: string;
  };
  tripdata: {
    itinerary: Array<{
      day: number;
      activities: string[];
    }>;
    summary: string;
  };
  createdAt: Date;
}

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tripId) return;
      
      try {
        const docRef = doc(db, "trips", tripId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as TripData;
          setTrip({
            ...data,
            createdAt: new Date(data.createdAt) // Convert Firestore timestamp to Date
          });
        } else {
          setError("No trip found");
          toast.error("The requested trip does not exist");
        }
      } catch (err) {
        setError("Failed to load trip data");
        console.error("Error getting document:", err);
        toast.error("Failed to load trip data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  if (isLoading) {
    return (
      <section className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F]">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-10 py-12 text-center text-[#443737] text-lg font-semibold">
          Loading trip details...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F]">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-10 py-12 text-center text-red-600 text-lg font-semibold">
          {error}
        </div>
      </section>
    );
  }

  if (!trip) return null;

  return (
    <section className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F] py-8">
      <div className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-10">
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <DailyVisit trip={trip} />
        {/* Footer */}
        <Footer trip={trip} />
      </div>
    </section>
  );
};

export default ViewTrip;
