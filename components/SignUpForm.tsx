"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) throw new Error(await response.text());
      // Sign in with NextAuth
      const result = await signIn('credentials', { redirect: false, email, password });
      if (result?.error) throw new Error(result.error);
      router.push('/create-trip');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-5 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-[#443737] text-center mb-2">Create your account</h2>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <input
        type="text"
        placeholder="Name"
        className="border border-[#D5AA9F] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#987284] bg-[#F4E1D2] text-[#443737] placeholder-[#987284]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="border border-[#D5AA9F] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#987284] bg-[#F4E1D2] text-[#443737] placeholder-[#987284]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border border-[#D5AA9F] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#987284] bg-[#F4E1D2] text-[#443737] placeholder-[#987284]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-[#D5AA9F] text-white font-bold py-2 rounded-lg shadow hover:bg-[#987284] transition"
      >
        Sign Up
      </button>
    </form>
  );
}
