'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { CategorySchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createCategory = async (values: z.infer<typeof CategorySchema>, storeId: string) => {
  const validatedFields = CategorySchema.safeParse(values);

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

  const { name, billboardId } = validatedFields.data;

  try {
    await db.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });

    revalidatePath(`/${storeId}/categories`);
    redirect(`/${storeId}/categories`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED CREATING YOUR CATEGORY' };
  }
};

export const updateCategory = async (values: z.infer<typeof CategorySchema>, storeId: string, categoryId: string) => {
  const validatedFields = CategorySchema.safeParse(values);

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

  if (!categoryId) {
    return { error: 'INVALID CATEGORY ID' };
  }

  const { name, billboardId } = validatedFields.data;

  await db.category.update({
    where: {
      id: categoryId,
      storeId,
    },
    data: {
      name,
      billboardId,
    },
  });

  revalidatePath(`/${storeId}/categories`);
  redirect(`/${storeId}/categories`);
};

export const deleteCategory = async (categoryId: string, storeId: string) => {
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

  if (!categoryId) {
    return { error: 'INVALID CATEGORY ID' };
  }

  const category = await db.category.findFirst({
    where: {
      id: categoryId,
      storeId,
    },
  });

  if (!category) {
    return { error: 'INVALID CATEGORY' };
  }

  await db.category.delete({
    where: {
      id: categoryId,
      storeId,
    },
  });

  revalidatePath(`/${storeId}/categories`);
  redirect(`/${storeId}/categories`);
};