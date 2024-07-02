'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { SizeSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createSize = async (values: z.infer<typeof SizeSchema>, storeId: string) => {
  const validatedFields = SizeSchema.safeParse(values);

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
    await db.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    revalidatePath(`/${storeId}/sizes`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED CREATING YOUR SIZE' };
  }
  redirect(`/${storeId}/sizes`);
};

export const updateSize = async (values: z.infer<typeof SizeSchema>, storeId: string, sizeId: string) => {
  const validatedFields = SizeSchema.safeParse(values);

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

  if (!sizeId) {
    return { error: 'INVALID SIZE ID' };
  }

  const { name, value } = validatedFields.data;

  try {
    await db.size.update({
      where: {
        id: sizeId,
        storeId,
      },
      data: {
        name,
        value,
      },
    });

    revalidatePath(`/${storeId}/sizes`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED UPDATING YOUR SIZE' };
  }

  redirect(`/${storeId}/sizes`);
};

export const deleteSize = async (sizeId: string, storeId: string) => {
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

  if (!sizeId) {
    return { error: 'INVALID SIZE ID' };
  }

  const size = await db.size.findFirst({
    where: {
      id: sizeId,
      storeId,
    },
  });

  if (!size) {
    return { error: 'INVALID SIZE' };
  }

  try {
    await db.size.delete({
      where: {
        id: sizeId,
        storeId,
      },
    });

    revalidatePath(`/${storeId}/sizes`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED DELETING YOUR SIZE' };
  }

  redirect(`/${storeId}/sizes`);
};
