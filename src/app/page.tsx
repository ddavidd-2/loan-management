import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-2xl'>The App for Lenders</h1>
        <div>All your Loan Management needs in <span className='font-bold'>One Place</span></div>
        <div>
            <Button asChild>
              <Link href='/auth/signup'>Get Started</Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
