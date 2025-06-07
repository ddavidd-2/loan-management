'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { createLoan, CreateLoanState } from '@/lib/actions';

const formattedTitle: Record<string, string> = {
  'debtor': 'Debtor',
  'amount': 'Principal',
  'interestRate': 'Interest Rate',
  'duration': 'Duration (months)',
  'amountPaid': 'Amount Paid',
};

export function CreateLoan() {
  const initState: CreateLoanState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createLoan, initState);

  return (
    <Card className="ml-auto mr-auto w-full max-w-sm">
      <form action={formAction} className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle>Create a Loan</CardTitle>
          <CardDescription>Fill out the loan information below</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {['debtor', 'amount', 'interestRate', 'duration', 'amountPaid'].map((field) => (
            <div key={field} className="grid gap-1">
              <Label htmlFor={field}>{formattedTitle[field] || field}</Label>
              <Input
                id={field}
                name={field}
                type={field === 'debtor' ? 'text' : 'number'}
                step={field === 'amountPaid' || 'interestRate' ? '0.01' : undefined}
              />
              {state.errors?.[field as keyof typeof state.errors] && (
                <p className="text-red-500 text-sm">
                  {state.errors[field as keyof typeof state.errors]?.[0]}
                </p>
              )}
            </div>
          ))}
          <div className="grid gap-1">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              className="border border-gray-300 rounded px-2 py-1"
              defaultValue="PENDING"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="PAID">Paid</option>
            </select>
            {state.errors?.status && (
              <p className="text-red-500 text-sm">{state.errors.status[0]}</p>
            )}
          </div>
          {state.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
