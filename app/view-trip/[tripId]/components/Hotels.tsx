import HotelCardItem from "./HotelCardItem";

const Hotels = ({ trip }: { trip: any }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-6 py-6 mb-8">
      <h2 className="font-bold text-xl mt-3 text-[#443737]">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
        {trip.tripdata[0].TravelPlan?.HotelOptions.map((hotel: any, index: number) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
