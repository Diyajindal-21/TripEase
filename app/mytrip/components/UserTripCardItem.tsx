import Link from "next/link";
import { useEffect, useState } from "react";

const getWikipediaMainImage = async (title: string) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${encodeURIComponent(title)}&origin=*`;
    const resp = await fetch(url);
    const data = await resp.json();
    const page = data.query.pages[0];
    const image= page.original?.source || null;
    return image;
  }
  
const UserTripCardItem = ({trip}:{trip:any}) => {
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
        <Link href={"/view-trip/"+trip?.id}>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 p-6 transition hover:shadow-2xl hover:scale-[1.02]">
            <img src={photo} className="w-32 h-32 object-cover rounded-xl shadow-md border border-[#E8D5B7] bg-[#F4E1D2]" />
            <div className="flex-1 flex flex-col gap-2">
        <div className="text-xl font-semibold text-[#443737] text-center">
          {trip?.userSelection?.location?.properties?.formatted}
        </div>
        <div className="text-[#987284] text-base text-center">
          {trip.userSelection?.days
            ? `${trip.userSelection.days} ${
                trip.userSelection.days === "1" ? "Day" : "Days"
              }`
            : null}
          {` trip with ${trip.userSelection?.budget} Budget`}
        </div>
        </div>
        </div>
        </Link>
    )
}

export default UserTripCardItem;