'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import db from '@/server/db';
import { users } from '@/server/db/schema';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/server/data/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist' };
  }

  // Email Verification

  // Email 2FA

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/cms'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }

    throw error;
  }

  return { success: 'Account created!' };
};
