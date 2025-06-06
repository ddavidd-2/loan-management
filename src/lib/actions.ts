'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is requried'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is requried'),
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