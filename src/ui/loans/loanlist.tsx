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

export default async function LoanList({ user } : { user : User }) {
  const loans: Loan[] = await prisma.loan.findMany({
    where: {
      userId: user.id,
    }
  });

  return (
    <Table>
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => {
          const debtDetails: LoanDetails = { 
            principal: loan.amount, 
            interestRate: loan.interestRate, 
            durationMonths: loan.duration, 
            amountPaid: loan.amountPaid,
          }
          const debt = debtRemaining(debtDetails);
          return (
            <TableRow key={loan.id}>
              <TableCell className="font-medium">{loan.id}</TableCell>
              <TableCell className="font-medium">{loan.debtor}</TableCell>
              <TableCell className="font-medium text-right">{loan.amount}</TableCell>
              <TableCell className="font-medium text-right">{loan.interestRate}</TableCell>
              <TableCell className="font-medium text-right">{loan.duration}</TableCell>
              <TableCell className="font-medium text-right">{debt || 0}</TableCell>
              <TableCell className="font-medium text-right">{loan.status}</TableCell>
              <TableCell className="font-medium text-right">{loan.createdAt.toDateString()}</TableCell>
              <TableCell className="font-medium text-right"><LoanMenu loan={loan}/></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>Total</TableCell>
          <TableCell className="text-right">$1000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
} 
