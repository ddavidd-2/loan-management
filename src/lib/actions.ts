'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { LoanStatus } from '@/generated/prisma';

const FormSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is requried'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is requried'),
});

const EditLoanSchema = z.object({
  loanId: z.string().min(1),
  debtor: z.string().min(1, 'Debtor is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  interestRate: z.coerce.number().nonnegative('Interest rate must be 0 or more'),
  duration: z.coerce.number().positive('Duration must be at least 1 month'),
  amountPaid: z.coerce.number().min(0, 'Amount paid must be 0 or more'),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'PAID']),
});

const DeleteLoanSchema = z.object({
  loanId: z.coerce.number(),
});

const CreateLoanSchema = z.object({
  debtor: z.string().min(1),
  amount: z.coerce.number().positive(),
  interestRate: z.coerce.number().min(0),
  duration: z.coerce.number().int().positive(),
  amountPaid: z.coerce.number().min(0),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'PAID']),
});

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  }
  message?: string | null;
}

export type SignUpState = {
  errors?: {
    username?: string[];
    password?: string[];
    firstName?: string[],
    lastName?: string[],
  }
  message?: string | null;
}

export type EditLoanState = {
  errors?: {
    debtor?: string[];
    amount?: string[];
    interestRate?: string[];
    duration?: string[];
    amountPaid?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type DeleteLoanState = {
  error?: string;
  message?: string | null;
}

export type CreateLoanState = {
  errors?: {
    debtor?: string[];
    amount?: string[];
    interestRate?: string[];
    duration?: string[];
    amountPaid?: string[];
    status?: string[];
  };
  message?: string | null;
};


const Login = FormSchema.omit({ firstName: true, lastName: true });
const Signup = FormSchema.omit({});

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = Login.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Username or password is missing.',
    };
  }

  const { username, password } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { username } });
  /* typically password would be hashed and could compare using something like bcrypt.compare */
  if (!user || password !== user.password) {
    return {
      errors: { username: ['Invalid Username'], password: ['Invalid Password'] },
      message: 'Username or password is incorrect.',
    };

  }

  const cookieStore = await cookies();
  cookieStore.set('session', String(user.id), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  redirect('/dashboard');
}

export async function signUp(prevState: SignUpState, formData: FormData) {
  const validatedFields = Signup.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'One or more fields are missing.',
    };
  }

  const { username, password, firstName, lastName } = validatedFields.data;

  /* check to see that username does not already exist */
  const user = await prisma.user.findUnique({ where: { username } });
  if (user) {
    return {
      errors: { username: ['Already Exists'] },
      message: 'Username already exists. Please select a different username.',
    };
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password, /* normally would be hashed, but for ease of testing its not */
        firstName,
        lastName,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set('session', String(newUser.id), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  } catch (e) {
    return { error: 'Error creating user.'};
  }

  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', { path: '/', maxAge: 0 });
  redirect('/');
}

export async function editLoan(prevState: EditLoanState, formData: FormData): Promise<EditLoanState> {
  const validated = EditLoanSchema.safeParse({
    loanId: formData.get('loanId'),
    debtor: formData.get('debtor'),
    amount: formData.get('amount'),
    interestRate: formData.get('interestRate'),
    duration: formData.get('duration'),
    amountPaid: formData.get('amountPaid'),
    status: formData.get('status'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Invalid form data',
    };
  }

  const { loanId, debtor, amount, interestRate, duration, amountPaid, status } = validated.data;
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get('session')?.value);

  if (!userId) {
    return {
      message: 'Unauthorized access',
    };
  }

  const loan = await prisma.loan.findUnique({ where: { id: Number(loanId) } });

  if (!loan || loan.userId !== userId) {
    return {
      message: 'Loan not found or you do not have permission to edit it',
    };
  }

  try {
    await prisma.loan.update({
      where: { id: Number(loanId) },
      data: {
        debtor,
        amount,
        interestRate,
        duration,
        amountPaid,
        status,
      },
    });

  } catch (e) {
    return {
      message: 'Failed to update loan. Please try again.',
    };
  }
  redirect('/dashboard');
}

export async function deleteLoan(prevState: DeleteLoanState, formData: FormData): Promise<DeleteLoanState> {
  console.log('error validating');
  const validated = DeleteLoanSchema.safeParse({
    loanId: formData.get('loanId'),
  });

  if (!validated.success) {
    return {
      message: 'Invalid loan ID.',
    };
  }

  const { loanId } = validated.data;

  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) {
    return { message: 'Unauthorized request.' };
  }

  const userId = Number(session.value);

  const loan = await prisma.loan.findUnique({
    where: { 
      id: loanId,
    },
  });

  if (!loan) {
    return { message: 'Loan not found or permission denied.' };
  }

  try {
    await prisma.loan.delete({ where: { id: loanId } });
  } catch (e) {
    return { message: 'Failed to delete loan.' };
  }

  redirect('/dashboard');
}

export async function createLoan(
  prevState: CreateLoanState,
  formData: FormData
): Promise<CreateLoanState> {
  const validated = CreateLoanSchema.safeParse({
    debtor: formData.get('debtor'),
    amount: formData.get('amount'),
    interestRate: formData.get('interestRate'),
    duration: formData.get('duration'),
    amountPaid: formData.get('amountPaid'),
    status: formData.get('status'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }

  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) {
    return {
      message: 'Not authorized',
    };
  }

  const userId = parseInt(session.value);
  if (isNaN(userId)) {
    return {
      message: 'Invalid session',
    };
  }

  const { debtor, amount, interestRate, duration, amountPaid, status } = validated.data;

  try {
    await prisma.loan.create({
      data: {
        debtor,
        amount,
        interestRate,
        duration,
        amountPaid,
        userId,
        status
      },
    });

  } catch (err) {
    return {
      message: 'Error creating loan.',
    };
  }
  redirect('/dashboard');
}