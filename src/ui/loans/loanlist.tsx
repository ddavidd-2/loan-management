'use client';

import { User, Loan} from "@/app/generated/prisma";
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
import { debtRemaining, LoanDetails, getFilteredLoans, LOANS_PER_PAGE } from "@/lib/utils";
import LoanMenu from "./loanmenu";
import Link from "next/link";
import Pagination from "./pagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoanList({ user, loans } : { user : User, loans: Loan[] }) {

  const totalPages = Math.ceil(loans.length / LOANS_PER_PAGE);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const currentPage = pageParam > totalPages ? totalPages : pageParam;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const filteredLoans = getFilteredLoans(loans, currentPage);

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
        {filteredLoans.sort((a,b) => a.id - b.id).map((loan) => {
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
                <TableCell className="font-medium max-w-[130px] truncate overflow-hidden whitespace-nowrap">{loan.debtor}</TableCell>
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
          <TableCell colSpan={9}>
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              createPageURL={createPageURL}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
} 

// todo: get total pages, 
// filtered loan array based on page number
