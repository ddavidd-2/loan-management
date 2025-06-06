import { LoginForm } from '@/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
        <Suspense>
          <LoginForm />
        </Suspense>
    </main>
  );
}