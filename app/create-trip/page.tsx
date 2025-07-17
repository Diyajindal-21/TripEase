"use client"
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { generateTravelPlan } from "@/service/AIModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrbitProgress } from "react-loading-indicators";
interface UserType {
    uid?: string;
    id?: string;
    email?: string;
  }
  
  interface FormDataType {
    days: string;
    budget: string;
    traveler: string;
    location: string;
  }
const CreateTrip = () => {
    const [loading,setLoading] = useState(false);
    const { data: session } = useSession();
  const router = useRouter();
    const [formData, setFormData] = useState({
        days: "",
        budget: "",
        traveler: "",
        location: ""
      });
    const [place, setPlace] = useState<any>(null);
    const handleInputChange = (name: string, value: any) => {
        setFormData(() => ({
            ...formData,
            [name]: value,
        }));
    };
    useEffect(() => {
        console.log(formData);
    }, [formData])
    const OnGenerateTrip =async () => {
        if (!session) {
            router.push("/signin");
            return;
          }
        // Check if days is missing or more than 30
        if (!formData.days || Number(formData.days) > 30) {
          if (Number(formData.days) > 30) {
            toast.error("Enter a number less than or equal to 30 for days");
          } else {
            toast.error("Please enter the number of days");
          }
          return;
        }
      
        // Check for other required fields
        if (!formData.budget || !formData.traveler || !formData.location) {
          toast.error("Please provide all the fields correctly");
          return;
        }
        setLoading(true);
        const result: any = await generateTravelPlan(formData);
        console.log(result);
        setLoading(false);
        const SaveAITrip = async (Tripdata: any, formData: FormDataType, user: UserType) => {
            setLoading(true);
            try {
              const response = await fetch("/api/save-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  tripdata:JSON.parse(Tripdata),
                  formData,
                  user,
                }),
              });
          
              const result = await response.json();
      setLoading(false);
      if (!result.success) {
        throw new Error(result.error || "Failed to save trip");
      }
      return result.id;
    } catch (error) {
      setLoading(false);
      console.error("Error saving trip:", error);
      return null;
    }
          };
          const docId=await SaveAITrip(result, formData, {
            email: session?.user?.email || undefined,
            uid: session?.user?.id, // or use your preferred user ID property
            id: session?.user?.id,
          });
          if (docId) {
            router.push(`/view-trip/${docId}`);
          } else {
            toast.error("Trip could not be saved. Please try again.");
          }
      };
      
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F] px-4 sm:px-0">
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-6 sm:px-10 py-10 w-full max-w-3xl flex flex-col gap-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-[#443737] text-center mb-2">
      Tell us your travel preferences
    </h1>
    <p className="text-[#987284] text-center text-sm sm:text-base mb-6">
      Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences
    </p>

            <div className=" flex flex-col gap-8">
                <div>
                    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!}>
                    <label className="font-medium text-[#443737] mb-1 block">What is your Destination?</label>
                        <GeoapifyGeocoderAutocomplete
                            placeholder="Select destination"
                            // Only pass the display string as value!
                            value={place?.properties?.formatted || ""}
                            placeSelect={(value) => {
                                setPlace(value);
                                handleInputChange("location", value);
                            }}
                            position={place?.properties?.lat && place?.properties?.lon ? { lat: place.properties.lat, lon: place.properties.lon } : undefined}
                            filterByCountryCode={undefined} // Add any specific country codes if needed
                        />
                    </GeoapifyContext>
                </div>
                <div className="flex flex-col gap-2">
        <label className="font-medium text-[#443737]">How many days are you planning your trip?</label>
        <Input
          className="rounded-lg border border-[#D5AA9F] bg-[#F4E1D2] px-4 py-2 text-[#443737] focus:ring-2 focus:ring-[#987284] transition"
          min={0}
          max={30} onInput={e => {
                        // Remove negative numbers as soon as user types them
                        const input = e.target as HTMLInputElement;
                        if (input.value && Number(input.value) < 0) {
                            input.value = "0";
                        }
                    }}
                        onKeyDown={e => {
                            // Prevent typing '-', '+', 'e'
                            if (["-", "+", "e", "E"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }} placeholder="Enter the number of days" type="Number" onChange={(e) => handleInputChange('days', e.target.value)}></Input>
                </div>
                <div className="flex flex-col gap-2">
        <label className="font-medium text-[#443737]">What is your Budget?</label>
        <div className="flex flex-wrap gap-4">
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`basis-[calc(50%-0.5rem)] sm:flex-1 p-4 border rounded-lg cursor-pointer
                            bg-[#F4E1D2] text-[#443737] border-[#D5AA9F]
                            hover:shadow-2xl hover:scale-105 hover:bg-[#E8D5B7] hover:border-[#987284] hover:ring-2 hover:ring-[#D5AA9F]
                            active:scale-100 transition
                            ${formData.budget === item.title ? 'ring-4 ring-[#987284] border-[#443737] shadow-2xl bg-[#E8D5B7] scale-105' : ''}`}
                          >
                            <div className="mb-1">{item.icon}</div>
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-xs text-[#987284]">{item.desc}</div>
                          </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
        <label className="font-medium text-[#443737]">Whom do you plan on travelling with?</label>
        <div className="flex flex-wrap gap-4">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`basis-[calc(50%-0.5rem)] sm:flex-1 p-4 border rounded-lg cursor-pointer
              bg-[#F4E1D2] text-[#443737] border-[#D5AA9F]
              hover:shadow-2xl hover:scale-105 hover:bg-[#E8D5B7] hover:border-[#987284] hover:ring-2 hover:ring-[#D5AA9F]
              active:scale-100 transition
              ${formData.traveler === item.people ? 'ring-4 ring-[#987284] border-[#443737] shadow-2xl bg-[#E8D5B7] scale-105' : ''}`}
            >
              <div className="mb-1">{item.icon}</div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-xs text-[#987284]">{item.desc}</div>
            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
        <Button
          className="bg-[#D5AA9F] text-white font-bold h-14 text-lg sm:text-xl px-10 rounded-xl shadow hover:bg-[#987284] transition w-full max-w-xs"
          disabled={loading}
          onClick={OnGenerateTrip}
        >
          {loading ? <OrbitProgress color="#000000" size="small" text="" /> : "Generate Trip"}
        </Button>
                </div>
            </div>
            </div>
            </section>
    )
}
export default CreateTrip;