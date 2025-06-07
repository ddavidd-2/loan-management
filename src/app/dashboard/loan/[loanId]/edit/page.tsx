import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EditLoan } from '@/ui/loans/editloan';

type PageProps = {
  params: {
    loanId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) redirect('/auth/signin');
  
  const p = await params;

  const userId = Number(session.value);
  const loanId = Number(p.loanId);

  if (isNaN(loanId)) notFound();

  const loan = await prisma.loan.findUnique({
    where: { id: loanId },
    select: {
      id: true,
      debtor: true,
      amount: true,
      interestRate: true,
      duration: true,
      amountPaid: true,
      userId: true,
      status: true,
    },
  });

  if (!loan || loan.userId !== userId) {
    notFound();
  }

  return (
    <EditLoan
      loanId={loan.id}
      initialData={{
        debtor: loan.debtor,
        amount: loan.amount,
        interestRate: loan.interestRate,
        duration: loan.duration,
        amountPaid: loan.amountPaid,
        status: loan.status,
      }}
    />
  );
}