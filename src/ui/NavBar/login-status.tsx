import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { User } from '@/generated/prisma';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { IoPersonSharp } from "react-icons/io5";

export default async function LoginStatus() {
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

  return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ?
          <Button variant="outline">{user.username}<IoPersonSharp /></Button>
          :
          <Button variant="outline"><IoPersonSharp /></Button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {user ?
          <> 
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/dashboard'>
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
            </DropdownMenuItem>
          </>
          :
          <>
            <DropdownMenuItem>
              Sign In 
            </DropdownMenuItem>
          </>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}