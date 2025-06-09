import { Loan } from "@/app/generated/prisma";
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
import { IoIosSettings } from 'react-icons/io';
import { LoanDelete } from "./deleteloan";

export default function LoanMenu({ 
  loan 
} : { 
  loan: Loan 
}) {

  const loanId = loan.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><IoIosSettings /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/loan/${loanId}`}>
              Detailed View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/loan/${loanId}/edit`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LoanDelete loanId={loanId} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

}