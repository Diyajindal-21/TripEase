import PlaceCard from "./PlaceCard";

interface DayData {
  Plan?: any[];
  BestTimeToVisit?: string | object;
  Activities?: any[];
  Places?: any[];
}

const DailyVisit = ({ trip }: { trip: any }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-6 py-6 mb-8">
      <h2 className="font-bold text-lg text-[#443737]">Places to Visit</h2>
      <div className="flex flex-col gap-6">
        {trip.tripdata[0]?.TravelPlan?.Itinerary &&
          (Object.entries(trip.tripdata[0].TravelPlan.Itinerary) as [string, DayData][])
            .sort(([a], [b]) => {
              const numA = parseInt(a.replace(/\D/g, ""), 10);
              const numB = parseInt(b.replace(/\D/g, ""), 10);
              return numA - numB;
            })
            .map(([day, dayData]) => (
              <div key={day}>
                <h2 className="font-semibold text-lg text-[#987284] mb-2">{day}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(dayData?.Activities || dayData?.Places || dayData?.Plan)?.map((place: any, index: number) => (
                    <div key={index} className="my-2">
                      <PlaceCard place={place} trip={trip} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DailyVisit;
