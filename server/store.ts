'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { StoreSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

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

  let store;

  try {
    store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return store.id;
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED CREATING YOUR STORE' };
  }
};

export const updateStore = async (values: z.infer<typeof StoreSchema>, storeId: string) => {
  const validatedFields = StoreSchema.safeParse(values);

  const { userId } = auth();

  if (!userId) {
    return { error: 'UNAUTHORIZED' };
  }

  if (!validatedFields.success) {
    return { error: 'INVALID FIELDS' };
  }

  if (!storeId) {
    return { error: 'INVALID STORE ID' };
  }

  const { name } = validatedFields.data;

  const store = await db.store.update({
    where: {
      id: storeId,
      userId,
    },
    data: {
      name,
    },
  });

  revalidatePath(`/${store.id}`);
  return store.name;
};

export const deleteStore = async (storeId: string) => {
  const { userId } = auth();

  if (!userId) {
    return { error: 'UNAUTHORIZED' };
  }

  if (!storeId) {
    return { error: 'INVALID STORE ID' };
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    return { error: 'INVALID STORE' };
  }

  await db.store.delete({
    where: {
      id: storeId,
    },
  });

  revalidatePath(`${store.id}`);
  redirect('/cms');
};
