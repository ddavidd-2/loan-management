"use client"

import { ExampleLoanChart } from "./loanchart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaPhone } from 'react-icons/fa';
import { BsArrowReturnLeft } from "react-icons/bs"
import { Button } from "@/components/ui/button";

type DetailedLoanProps = {
  id: number;
  debtor: string;
  amount: number;
  interestRate: number;
  duration: number;
  amountPaid: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  createdAt: Date;
};

export function DetailedLoan({ loanData } : { loanData: DetailedLoanProps }) {

  const { id, debtor, amount, interestRate, duration, amountPaid, status, createdAt } = loanData;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='flex flex-row w-full p-3 gap-2'>
      <Card className="flex-1">
        <div className="hover:underline ml-auto mr-2 flex gap-1 items-center">
          <Link href='/dashboard'>
          Back to Dashboard
          </Link>
          <BsArrowReturnLeft />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Loan to <strong>{debtor}</strong></CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <div><strong>Principal Amount:</strong> ${amount.toFixed(2)}</div>
          <div><strong>Interest Rate:</strong> {interestRate}%</div>
          <div><strong>Loan Duration:</strong> {duration} months</div>
          <div><strong>Amount Paid:</strong> ${amountPaid.toFixed(2)}</div>
          <div><strong>Loan Status:</strong> {status}</div>
          <div><strong>Loan Signed:</strong> {formattedDate}</div>
          <hr />
          <div><strong>{debtor}'s Contact Info</strong></div>
          <div className='flex gap-2 items-center'><FaPhone />&#40;123&#41;-456-7890</div>
          <hr />
          <Button asChild>
            <Link href={`/dashboard/loan/${id}/edit`}>Edit Loan</Link>
          </Button>
        </CardContent>
      </Card>
      <div className="flex-3">
        <ExampleLoanChart />
      </div>
    </div>
  )
}