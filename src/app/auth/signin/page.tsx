import { LoginForm } from '@/ui/auth/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center flex-grow">
        <Suspense>
          <LoginForm />
        </Suspense>
    </main>
  );
}