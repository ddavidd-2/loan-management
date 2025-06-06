'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { login, LoginState } from "@/lib/actions";
import Link from "next/link";

export function LoginForm() { 
  const initState: LoginState = { message: null, errors: {} };
  const [state, formAction] = useActionState(login, initState);

  return (
    <Card className="w-full max-w-sm">
      <form action={formAction} className='flex flex-col gap-2'>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your username and password to sign in
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href='/'>
                Go Back
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <br />
        <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="jdoe"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                />
              </div>
            </div>
          <div>
            {(state.errors?.username || state.errors?.password) ?
              <CardDescription className="text-red-500">
                {state.message}
              </CardDescription>
              :
              <CardDescription aria-hidden="true">
                <br />
              </CardDescription>
            }
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div>
            Don't have an account?{' '}
            <Link href='/auth/signup' className='hover:underline'>Sign Up</Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}