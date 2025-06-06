import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/prisma";


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
          <Link href='/[auth]/signin'>Sign In</Link>
        </Button>
        <Button asChild>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      {`${user.username}'s Dashboard`}
    </div>
  );
}