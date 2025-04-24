'use client'
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
const Hero = () => {
    const router = useRouter();
    const { data: session} = useSession();
    const handleGetStarted = () => {
        if (session) {
          router.push("/create-trip");
        } else {
          router.push("/signin");
        }
      };
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F]">
  <p className="text-4xl md:text-6xl font-extrabold text-[#443737] mb-4 text-center">
  Discover Your Next Adventure with AI:{" "}<br></br>
  <span className="text-3xl md:text-5xl text-[#D5AA9F] decoration-[#D5AA9F] underline-offset-4">
    Personalized Itineraries at Your Fingertips
  </span>
</p>
  <p className="text-xl md:text-2xl text-[#987284] mb-8 max-w-2xl text-center">
    Your personal trip planner and travel curatore, creating custom itineraries tailored to your interests and budget.
  </p>
  <Button
    onClick={handleGetStarted}
    className="bg-[#D5AA9F] text-white font-bold py-3 px-8 rounded-full shadow hover:bg-[#F1C40F] transition"
  >
    Get Started
  </Button>
</section>


    )
}
export default Hero;