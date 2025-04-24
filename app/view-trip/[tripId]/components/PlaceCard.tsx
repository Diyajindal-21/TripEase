
import Link from "next/link";
import { useEffect, useState } from "react";
const PlaceCard=({ place ,trip}: { place: any,trip:any })=>{
    const [photo, setPhoto] = useState<string | null>(null);
const fetchUnsplashImage = async (query: string) => {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY; // store your key in .env
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.results[0]?.urls?.regular || null;
  };
  
  useEffect(() => {
    const fetchImage = async () => {
        if (!place?.PlaceName) return;
        const image = await fetchUnsplashImage(place.PlaceName);
        setPhoto(image);
      };
      fetchImage();
  }, [place]);
    return (
        <div className="bg-[#F4E1D2]/80 rounded-xl shadow-md p-5 flex flex-col gap-2 mb-4">
        <Link href={"https://www.google.com/maps/search/?api=1&query="+place?.PlaceName+","+trip?.userSelection?.location?.properties?.formatted}>
        <div className="border rounded-xl p-3 flex mt-2 gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
            <img src={photo || undefined} className="w-[130px] h-[130px] rounded-xl object-cover" alt={place?.PlaceName || 'Place image'} />
            <div>
                <h2 className="font-bold text-lg">{place.PlaceName}</h2>
                <p className="text-sm text-gray-400">{place.PlaceDetails}</p>
                <p className="mt-2">⌛ {place.TimeTravel}</p>
            </div>
        </div>
        </Link>
        </div>
    )
}
export default PlaceCard