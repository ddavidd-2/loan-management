import { Suspense } from 'react';
import { SignUpForm } from '@/ui/auth/signup-form';
 
export default function LoginPage() {
  return (
    <main className="mt-auto mb-auto flex items-center justify-center flex-grow">
        <Suspense>
          <SignUpForm />
        </Suspense>
    </main>
  );
}