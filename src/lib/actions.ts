'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is requried'),
});


export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  }
  message?: string | null;
}

const Login = FormSchema.omit({});

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

  redirect('/dashboard'); // Redirect after login
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', { path: '/', maxAge: 0 });
  redirect('/');
}