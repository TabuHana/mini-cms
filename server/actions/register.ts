'use server';

import { z } from 'zod';
import { toast } from 'sonner';
import bcrypt from 'bcrypt';

import db from '@/server/db';
import { RegisterSchema } from '@/schemas';
import { users } from '../db/schema';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // await db.insert(users).values({
    //   email,
    //   name,
    //   password: hashedPassword,
    // });
    console.log(email, name, hashedPassword);
  } catch (error) {
    return { error: 'Something went wrong' };
  }

  // toast.success('Account created!');
  return { success: 'Account created!'}
};
