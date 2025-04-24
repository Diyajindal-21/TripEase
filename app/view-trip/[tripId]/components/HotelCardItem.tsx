
import Link from "next/link";
import { useEffect, useState } from "react";
const HotelCardItem = ({ hotel }: { hotel: any }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHotelImage() {
      const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
      if (!apiKey) {
        console.error("Pixabay API key is missing");
        return;
      }
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(hotel?.HotelName)}&image_type=photo`
      );
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        setPhoto(data.hits[0].webformatURL);
      } else {
        setPhoto(null);
      }
    }
    fetchHotelImage();
  }, [hotel]);
    return (
      <div className="bg-[#E8D5B7]/80 rounded-xl shadow-md p-5 flex flex-col gap-2 mb-4">
        <Link href={"https://www.google.com/maps/search/?api=1&query=" + hotel?.HotelName + "," + hotel?.HotelAddress} target="_blank">
            <div className="hover:scale-105 transition-all cursor-pointer">
            <img src={photo || undefined} alt={hotel?.HotelName} className="rounded-xl h-[180px] w-full object-cover" />
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.HotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍{hotel?.HotelAddress}</h2>
                    <h2 className="text-sm">🏷️{hotel?.Price}</h2>
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="font-bold">Rating:</span>
                        <h2>{hotel?.Rating} ⭐</h2>
                    </div>

                </div>
            </div>
        </Link>
        </div>
    )
}
export default HotelCardItem;