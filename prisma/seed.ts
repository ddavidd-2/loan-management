import { PrismaClient, Prisma, LoanStatus } from '@/app/generated/prisma';
import { generateFakeLoans } from '@/lib/utils';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'jdoe',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe', 
    loans: {
      create: generateFakeLoans(45),
    }
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();