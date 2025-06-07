import { Button } from "@/components/ui/button";
import { ExampleLoanChart } from "@/ui/loans/loanchart";
import Link from "next/link";

export default function Home() {

  return (
    <main>
      <div className='flex flex-col items-center gap-3 pt-4'>
        <h1 className='font-bold text-2xl'>The Loan Management App for Lenders</h1>
        <div>All your Loan Management needs in <span className='font-bold'>One Place</span></div>
        <div>Detailed Analytics on all of your loans</div>
        <div className='w-full max-w-[1000px] pl-10 pr-10'>
          <ExampleLoanChart />
        </div>
        <div>
            <Button asChild>
              <Link href='/auth/signup'>Get Started</Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
