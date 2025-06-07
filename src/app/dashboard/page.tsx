import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/prisma";
import LoanList from "@/ui/loans/loanlist";
import { Suspense } from "react";
import EmptyLoanList from "@/ui/skeletons";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  let user: User | null = null;

  if (session?.value) {
    const userId = Number(session.value);
    if (!isNaN(userId)) {
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    }
  }

  if (!user) {
    return (
      <div>
        <div>You must be logged in to view your Dashboard</div>
        <Button asChild>
          <Link href='/auth/signin'>Sign In</Link>
        </Button>
        <Button asChild>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-2 flex flex-col items-center gap-4">
      <div className="font-bold">
        Welcome Back, {`${user.firstName} ${user.lastName}`}!
      </div>
      <Button asChild>
        <Link href='/dashboard/loan/create'>
          Add Loan
        </Link>
      </Button>
      <div>
        <Suspense fallback={<EmptyLoanList />}>
          <LoanList user={user}/>
        </Suspense>
      </div>
    </div>
  );
}