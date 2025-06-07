'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { editLoan, EditLoanState } from "@/lib/actions";
import Link from "next/link";

type EditLoanFormProps = {
  loanId: number;
  initialData: {
    debtor: string;
    amount: number;
    interestRate: number;
    duration: number;
    amountPaid: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  };
};

export function EditLoan({ loanId, initialData }: EditLoanFormProps) {
  const initState: EditLoanState = { message: null, errors: {} };
  const [state, formAction] = useActionState(editLoan, initState);

  return (
    <Card className="ml-auto mr-auto w-full max-w-md">
      <form action={formAction} className="flex flex-col gap-2">
        <CardHeader>
          <CardTitle>Edit Loan</CardTitle>
          <CardDescription>Modify the loan details below.</CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <input type="hidden" name="loanId" value={loanId} />
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="debtor">Debtor</Label>
              <Input
                id="debtor"
                name="debtor"
                type="text"
                defaultValue={initialData.debtor}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={initialData.amount}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                name="interestRate"
                type="number"
                step="0.01"
                defaultValue={initialData.interestRate}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (Months)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                defaultValue={initialData.duration}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amountPaid">Amount Paid</Label>
              <Input
                id="amountPaid"
                name="amountPaid"
                type="number"
                step="0.01"
                defaultValue={initialData.amountPaid}
              />
            </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Loan Status</Label>
                <Select name="status" defaultValue={initialData.status}>
                  <SelectTrigger id="status">
                    <SelectValue defaultValue={initialData.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
          <div>
            {state.message ? (
              <CardDescription className="text-red-500">
                {state.message}
              </CardDescription>
            )
            :
              <CardDescription className="text-red-500">
                <br />
              </CardDescription>
            }
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}