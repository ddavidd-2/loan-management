'use client';
import { useState } from 'react';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { DeleteLoanState, deleteLoan } from '@/lib/actions';

export function LoanDelete({ loanId }: { loanId: number }) {
  const initState: DeleteLoanState = { message: null, error: '' };
  const [state, formAction] = useActionState(deleteLoan, initState);
  const [open, setOpen] = useState(false);

  return (
    <form
      action={formAction}
    >
      {state?.message && (
        <p className="text-sm text-red-500 mb-2" role="alert">
          {state.message}
        </p>
      )}
        <input type="hidden" id="loanId" name="loanId" value={loanId} />
        <button type="submit" className='text-red-500'>
          Delete
        </button>
    </form>
  );
}