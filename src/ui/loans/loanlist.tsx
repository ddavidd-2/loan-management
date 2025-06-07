import { User, Loan} from "@/generated/prisma";
import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { debtRemaining, LoanDetails } from "@/lib/utils";
import LoanMenu from "./loanmenu";
import Link from "next/link";

export default async function LoanList({ user } : { user : User }) {
  const loans: Loan[] = await prisma.loan.findMany({
    where: {
      userId: user.id,
    }
  });

  return (
    <Table className='bg-white rounded'>
      <TableCaption>A list of your current loans.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Loan ID</TableHead>
          <TableHead>Debtor</TableHead>
          <TableHead>Principal</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Months</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Signed</TableHead>
          <TableHead className="text-right">Menu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.sort((a,b) => a.id - b.id).map((loan) => {
          const debtDetails: LoanDetails = { 
            principal: loan.amount, 
            interestRate: loan.interestRate, 
            durationMonths: loan.duration, 
            amountPaid: loan.amountPaid,
          }
          const debt = debtRemaining(debtDetails);
          const formattedDate = new Date(loan.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          return (
              <TableRow key={loan.id}>
                <TableCell className="font-medium">{loan.id}</TableCell>
                <TableCell className="font-medium">{loan.debtor}</TableCell>
                <TableCell className="font-medium text-right">{loan.amount}</TableCell>
                <TableCell className="font-medium text-right">{loan.interestRate}</TableCell>
                <TableCell className="font-medium text-right">{loan.duration}</TableCell>
                <TableCell className="font-medium text-right">{debt || 0}</TableCell>
                <TableCell className="font-medium text-right">{loan.status}</TableCell>
                <TableCell className="font-medium text-right">{formattedDate}</TableCell>
                <TableCell className="font-medium text-right"><LoanMenu loan={loan}/></TableCell>
              </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
} 
