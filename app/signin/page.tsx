"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/create-trip");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F]">
      <form
        onSubmit={handleCredentialsSubmit}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-10 py-12 flex flex-col gap-6 min-w-[340px] max-w-[90vw]"
      >
        <h2 className="text-3xl font-bold text-[#443737] mb-2 text-center">Sign In</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="border border-[#D5AA9F] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#987284] bg-[#F4E1D2] text-[#443737]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-[#D5AA9F] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#987284] bg-[#F4E1D2] text-[#443737]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="bg-[#D5AA9F] text-white font-bold py-2 rounded-lg shadow hover:bg-[#987284] transition"
        >
          Sign In
        </Button>
        {/* Divider */}
<div className="mt-4 flex items-center justify-center">
<div className="border-t border-gray-300 flex-grow mr-3"></div>
<span className="text-gray-500 text-sm">OR</span>
<div className="border-t border-gray-300 flex-grow ml-3"></div>
</div>

{/* Google Sign-In Button */}
<Button
onClick={() => signIn('google', { callbackUrl: '/create-trip' })}
className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
>
{/* ...SVG and text as above... */}
<span>Sign in with Google</span>
</Button>
        <div className="text-center text-[#987284] mt-2">
          Don't have an account?{' '}
          <Link href="/signup" className="underline hover:text-[#D5AA9F] transition">Sign Up</Link>
        </div>
      </form>
    </section>
  );
}

