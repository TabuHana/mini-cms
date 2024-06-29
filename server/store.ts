'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { StoreSchema } from '@/schemas';

export const createStore = async (values: z.infer<typeof StoreSchema>) => {
  const validatedFields = StoreSchema.safeParse(values);

  const { userId } = auth();

  if (!userId) {
    return { error: 'UNAUTHORIZED' };
  }

  if (!validatedFields.success) {
    return { error: 'INVALID FIELDS' };
  }

  const { name } = validatedFields.data;

  try {
    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return store.id;
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED WHILE CREATING YOUR STORE' };
  }
};
