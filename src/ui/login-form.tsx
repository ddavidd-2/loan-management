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
            Enter your username and password to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href='/signup'>
                Sign Up
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
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
              </CardDescription>
            }
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}