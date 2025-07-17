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
    <div className="bg-[#E8D5B7]/80 rounded-xl shadow-md p-4 w-full">
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hotel?.HotelName + ", " + hotel?.HotelAddress
        )}`}
        target="_blank"
      >
        <div className="hover:scale-[1.02] transition-transform cursor-pointer">
          <div className="rounded-xl overflow-hidden aspect-[3/2] bg-gray-200">
            {photo && (
              <img
                src={photo}
                alt={hotel?.HotelName}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <h2 className="font-semibold text-base text-[#443737]">{hotel?.HotelName}</h2>
            <p className="text-sm text-gray-600">📍 {hotel?.HotelAddress}</p>
            <p className="text-sm text-[#443737]">🏷️ {hotel?.Price}</p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-bold text-[#443737]">Rating:</span>
              <span>{hotel?.Rating} ⭐</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
