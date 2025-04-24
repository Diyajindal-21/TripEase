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
  const [emailStatus, setEmailStatus] = useState(null);

const validateWithZeroBounce = async (email: string) => {
setEmailStatus("Checking..." as any);
  const res = await fetch("/api/validate-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  setEmailStatus(data.status);

  // Handle ZeroBounce response
  if (data.status !== "valid") {
    if (data.did_you_mean) {
      setError(`Did you mean "${email.split("@")[0]}@${data.did_you_mean}"?`);
    } else if (data.status === "invalid") {
      setError("This email address is invalid or undeliverable.");
    } else if (data.status === "do_not_mail" || data.disposable) {
      setError("Disposable or restricted email addresses are not allowed.");
    } else {
      setError("Please enter a valid, deliverable email address.");
    }
    return false;
  }
  setError("");
  return true;
};
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = await validateWithZeroBounce(email);
  if (!isValid) return;
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
      {error && (
  <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
    </svg>
    <span className="font-medium">{error}</span>
  </div>
)}

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
