import PlaceCard from "./PlaceCard";
interface DayData {
    Plan?:any[];
    BestTimeToVisit?: string | object;
    Activities?: any[];
    Places?: any[];
  }
const DailyVisit=({ trip }: { trip: any })=>{
    return(
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-6 py-6 mb-8">
            <h2 className="font-bold text-lg">Places to Visit</h2>
            <div>
            {trip.tripdata[0]?.TravelPlan?.Itinerary &&
   (Object.entries(trip.tripdata[0].TravelPlan.Itinerary) as [string, DayData][]).sort(([a], [b]) => {
    const numA = parseInt(a.replace(/\D/g, ""), 10);
    const numB = parseInt(b.replace(/\D/g, ""), 10);
    return numA - numB;
  })
   .map(([day, dayData])=> (
    <div key={day} className="grid grid-cols-2 gap-5">
      <div className="mt-5">
        <h2 className="font-medium text-lg">{day}</h2>
        
        {/* Render Activities/Places (arrays) */}
        <div className="grid">
          {(dayData?.Activities || dayData?.Places || dayData?.Plan)?.map((place: any, index: any) => (
            <div key={index} className="my-3">
              <PlaceCard place={place} trip={trip}></PlaceCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
            </div>
        </div>
    )
}
export default DailyVisit;