import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
const getWikipediaMainImage = async (title: string) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${encodeURIComponent(title)}&origin=*`;
    const resp = await fetch(url);
    const data = await resp.json();
    const page = data.query.pages[0];
    const image= page.original?.source || null;
    return image;
  }
const InfoSection = ({ trip }: { trip: any }) => {
    const [photo, setPhoto] = useState<string>();
    useEffect(() => {
        const fetchImage = async () => {
            try {
              const cityName = trip?.userSelection?.location?.properties?.city;
              if (!cityName) return;              
              const image = await getWikipediaMainImage(cityName);
              setPhoto(image);
            } catch (error) {
              console.error("Failed to fetch image:", error);
            }
          };      
          fetchImage();
      }, [trip]); // Add dependency on `trip`
      
    return (
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-3 mb-8">
           <img src={photo} className="w-full h-[340px] object-cover rounded-xl" />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.properties?.formatted}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">📅{trip.userSelection?.days
  ? `${trip.userSelection.days} ${trip.userSelection.days === "1" ? 'Day' : 'Days'}`:null} Trip</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">💰{trip.userSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">👤No. of Traveler: {trip.userSelection?.days
  ? `${trip.userSelection.traveler} ${trip.userSelection.traveler === "1" ? 'Person' : 'People'}`:null}</h2>
                    </div>
                </div> 
            </div>
        </div>
    )
}
export default InfoSection;

function fetchPhotos() {
    throw new Error("Function not implemented.");
}
