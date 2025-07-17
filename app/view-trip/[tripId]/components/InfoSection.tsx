import { useEffect, useState } from "react";

const getWikipediaMainImage = async (title: string) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages&piprop=original&titles=${encodeURIComponent(
    title
  )}&origin=*`;
  const resp = await fetch(url);
  const data = await resp.json();
  const page = data.query.pages[0];
  return page.original?.source || null;
};

const InfoSection = ({ trip }: { trip: any }) => {
  const [photo, setPhoto] = useState<string | null>(null);

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
  }, [trip]);

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-6 py-6 flex flex-col gap-4 mb-8">
      {photo && (
        <img
          src={photo}
          alt="Destination"
          className="w-full aspect-video object-cover rounded-xl"
        />
      )}

      <div className="my-2 flex flex-col gap-3">
        <h2 className="font-bold text-xl md:text-2xl text-[#443737]">
          {trip?.userSelection?.location?.properties?.formatted}
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm">
            📅 {trip.userSelection?.days
              ? `${trip.userSelection.days} ${trip.userSelection.days === "1" ? "Day" : "Days"} Trip`
              : "Trip Duration Unknown"}
          </span>
          <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm">
            💰 {trip.userSelection?.budget || "Budget not specified"}
          </span>
          <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm">
            👤 {trip.userSelection?.traveler
              ? `${trip.userSelection.traveler} ${trip.userSelection.traveler === "1" ? "Person" : "People"}`
              : "Traveler Info Missing"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
