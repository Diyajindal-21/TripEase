"use client";
import { db } from "@/service/firebaseConfig";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrip=()=>{
    const [userTrips,setUserTrips]=useState<DocumentData[]>([]);
    const { data: session,status  } = useSession();
    const router=useRouter();
    useEffect(()=>{
        GetUserTrips();
    },[session, status, router])
    const GetUserTrips=async ()=>{
        const user=session?.user
        if (status === "loading") return;
        if(!user){
            router.push("/");
            return;
        };
        const q=query(collection(db,'trips'),where("userEmail","==",user?.email));
        const querySnapshot=await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc)=>{
            console.log(doc.id,"=>",doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()])
        })
    }
    return(
        <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F] py-8">
      <div className="w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-[#443737] mb-6 text-center">My Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userTrips?.length > 0
            ? userTrips.map((trip, index) => (
                <UserTripCardItem key={index} trip={trip} />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-40 bg-[#E8D5B7]/50 rounded-xl animate-pulse"
                />
              ))}
        </div>
      </div>
    </section>
    )
}
export default MyTrip;