import { Suspense } from 'react';
import { SignUpForm } from '@/ui/auth/signup-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
        <Suspense>
          <SignUpForm />
        </Suspense>
    </main>
  );
}