'use client'
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

const Hero = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (session) {
      router.push("/create-trip");
    } else {
      router.push("/signin");
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F] px-4 py-12">
      <div className="flex flex-col items-center max-w-3xl w-full">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#443737] mb-4 text-center">
          Discover Your Next Adventure with AI:
          <br />
          <span className="block text-3xl md:text-5xl text-[#D5AA9F] decoration-[#D5AA9F] mt-2">
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#987284] mb-10 max-w-2xl text-center">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Button
          onClick={handleGetStarted}
          className="bg-[#D5AA9F] text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-[#987284] transition mb-12 text-lg"
        >
          Get Started
        </Button>
      </div>
      <img
        src="/landing.png"
        alt="TripEase Landing"
        className="w-full max-w-2xl rounded-2xl object-cover"
        style={{ marginTop: '-40px' }}
      />
    </section>
  );
};

export default Hero;
