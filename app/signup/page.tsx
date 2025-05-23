'use client'
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  return (
    <section className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F4E1D2] via-[#E8D5B7] to-[#D5AA9F] pt-8 pb-8">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl px-10 py-12 flex flex-col gap-6 min-w-[340px] max-w-[90vw]">
        <h2 className="text-3xl font-bold text-[#443737] mb-2 text-center">Sign Up</h2>
        <SignUpForm />
        <div className="mt-4 flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>

        <Button
          onClick={() => signIn('google', { callbackUrl: '/create-trip' })}
          className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Sign up with Google</span>
        </Button>
        <div className="text-center text-[#987284] mt-2">
          Already have an account?{' '}
          <Link href="/signin" className="underline hover:text-[#D5AA9F] transition">Sign In</Link>
        </div>
      </div>
    </section>
  );
}
