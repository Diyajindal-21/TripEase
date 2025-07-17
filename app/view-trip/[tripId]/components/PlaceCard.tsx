import Link from "next/link";
import { useEffect, useState } from "react";

const PlaceCard = ({ place, trip }: { place: any; trip: any }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const fetchUnsplashImage = async (query: string) => {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      console.error("Missing Unsplash access key");
      return null;
    }
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${accessKey}&per_page=1`;
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

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${place?.PlaceName},${trip?.userSelection?.location?.properties?.formatted}`;

  return (
    <div className="bg-[#F4E1D2]/80 rounded-xl shadow-md p-4 sm:p-5 flex flex-col gap-3 mb-4">
      <Link href={mapLink} target="_blank">
        <div className="border rounded-xl p-3 flex flex-col sm:flex-row gap-4 hover:scale-[1.02] transition-transform duration-300 hover:shadow-md cursor-pointer">
          <img
            src={photo || "/fallback-image.jpg"} // Optional fallback
            alt={place?.PlaceName || "Place image"}
            className="w-full sm:w-[140px] h-[160px] object-cover rounded-xl"
            loading="lazy"
          />
          <div className="flex flex-col justify-between">
            <h2 className="font-bold text-lg text-[#443737]">{place.PlaceName}</h2>
            <p className="text-sm text-gray-500 mt-1">{place.PlaceDetails}</p>
            <p className="mt-2 text-sm text-[#987284]">⌛ {place.TimeTravel}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;
