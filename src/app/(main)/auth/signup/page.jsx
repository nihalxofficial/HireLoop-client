// app/auth/signup/page.js
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SignupForm from './SignupForm';

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#050816]">
        <div className="text-center">
          <Loader2 size={48} className="text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}