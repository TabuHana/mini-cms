'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { ColorSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createColor = async (values: z.infer<typeof ColorSchema>, storeId: string) => {
  const validatedFields = ColorSchema.safeParse(values);

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

  if (!validatedFields.success) {
    return { error: 'INVALID FIELDS' };
  }

  const { name, value } = validatedFields.data;

  try {
    await db.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    revalidatePath(`/${storeId}/colors`);
    redirect(`/${storeId}/colors`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED CREATING YOUR COLOR' };
  }
};

export const updateColor = async (values: z.infer<typeof ColorSchema>, storeId: string, colorId: string) => {
  const validatedFields = ColorSchema.safeParse(values);

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

  if (!validatedFields.success) {
    return { error: 'INVALID FIELDS' };
  }

  if (!colorId) {
    return { error: 'INVALID COLOR ID' };
  }

  const { name, value } = validatedFields.data;

  await db.color.update({
    where: {
      id: colorId,
      storeId,
    },
    data: {
      name,
      value,
    },
  });

  revalidatePath(`/${storeId}/colors`);
  redirect(`/${storeId}/colors`);
};

export const deleteColor = async (colorId: string, storeId: string) => {
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

  if (!colorId) {
    return { error: 'INVALID COLOR ID' };
  }

  const color = await db.color.findFirst({
    where: {
      id: colorId,
      storeId,
    },
  });

  if (!color) {
    return { error: 'INVALID COLOR' };
  }

  await db.color.delete({
    where: {
      id: colorId,
      storeId,
    },
  });

  revalidatePath(`/${storeId}/colors`);
  redirect(`/${storeId}/colors`);
};
