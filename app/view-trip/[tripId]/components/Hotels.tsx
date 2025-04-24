import Image from "next/image";
import Link from "next/link";
import HotelCardItem from "./HotelCardItem";

const Hotels = ({ trip }: { trip: any }) => {
    return (
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-8 py-6 mb-8">
            <h2 className="font-bold text-xl mt-3">Hotel Recommendations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip.tripdata[0].TravelPlan?.HotelOptions.map((hotel: any, index: any) => (
                    <HotelCardItem key={index} hotel={hotel}></HotelCardItem>
                ))}
            </div>
        </div>
    )
}
export default Hotels;