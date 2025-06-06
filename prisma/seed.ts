import { PrismaClient, Prisma, LoanStatus } from '../app/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'jdoe',
    firstName: 'John',
    lastName: 'Doe', 
    loans: {
      create: [
        {
          debtor: 'Jane Smith',
          amount: 1000,
          interestRate: 2.5,
          duration: 24,
          amountPaid: 500,
          status: LoanStatus.APPROVED,
        },
        {
          debtor: 'Adam Apple',
          amount: 3200,
          interestRate: 2.2,
          duration: 18,
          amountPaid: 0,
          status: LoanStatus.PENDING,
        },
        {
          debtor: 'Jane Smith',
          amount: 2500,
          interestRate: 3.3,
          duration: 12,
          amountPaid: 900,
          status: LoanStatus.APPROVED,
        },
      ]
    }
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();