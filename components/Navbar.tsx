"use client"
import Image from "next/image"
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react'
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar=()=>{
  const router = useRouter();
  const { data: session} = useSession();
  const handlePlanTrip = () => {
    if (session) {
      router.push("/create-trip");
    } else {
      router.push("/signin");
    }
  };
    return(
      <nav className="bg-[#F4E1D2] border-b border-[#E8D5B7] px-8 py-3 flex items-center justify-between shadow-sm">
  <Link href="/" className="flex items-center gap-2">
    <Image src="/logo.png" alt="TripEase Logo" width={36} height={36} />
    <span className="text-2xl font-semibold text-[#443737] tracking-wide">TripEase</span>
  </Link>
  <div className="flex items-center gap-6">
    {session?.user ? (
      <>
        <span className="text-[#987284]">Hi, {session.user.name}</span>
        <Link href="/mytrip" className="text-[#443737] hover:underline">My Trips</Link>
          <Button onClick={handlePlanTrip} className="bg-[#D5AA9F] text-white font-bold rounded-lg shadow hover:bg-[#987284] transition">Plan Trip</Button>
        <Button
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          className="bg-white text-[#443737] border border-[#D5AA9F] rounded-lg hover:bg-[#E8D5B7] transition"
        >
          Sign Out
        </Button>
      </>
    ) : (
      <>
        <Link href="/signin">
          <Button className="bg-white text-[#443737] border border-[#D5AA9F] rounded-lg hover:bg-[#F4E1D2] transition">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-[#D5AA9F] text-white rounded-lg hover:bg-[#987284] transition">Sign Up</Button>
        </Link>
      </>
    )}
  </div>
</nav>

    )
}
export default Navbar;