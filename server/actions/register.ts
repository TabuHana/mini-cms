'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import db from '@/server/db';
import { users } from '@/server/db/schema';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/server/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use' };
  }

  try {
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });
  } catch (error) {
    return { error: 'Something went wrong' };
  }

  // Email Verification

  try {
    await signIn('credentials', {
      email,
      password,
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
