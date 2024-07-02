'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { BillboardSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createBillboard = async (values: z.infer<typeof BillboardSchema>, storeId: string) => {
  const validatedFields = BillboardSchema.safeParse(values);

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

  const { label, imageUrl } = validatedFields.data;

  try {
    await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    revalidatePath(`/${storeId}/billboards`);
    redirect(`/${storeId}/billboards`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED CREATING YOUR BILLBOARD' };
  }
};

export const updateBillboard = async (
  values: z.infer<typeof BillboardSchema>,
  storeId: string,
  billboardId: string
) => {
  const validatedFields = BillboardSchema.safeParse(values);

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

  if (!billboardId) {
    return { error: 'INVALID BILLBOARD ID' };
  }

  const { label, imageUrl } = validatedFields.data;

  await db.billboard.update({
    where: {
      id: billboardId,
      storeId,
    },
    data: {
      label,
      imageUrl,
    },
  });

  revalidatePath(`/${storeId}/billboards`);
  redirect(`/${storeId}/billboards`);
};

export const deleteBillboard = async (billboardId: string, storeId: string) => {
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

  if (!billboardId) {
    return { error: 'INVALID BILLBOARD ID' };
  }

  const billboard = await db.billboard.findFirst({
    where: {
      id: billboardId,
      storeId,
    },
  });

  if (!billboard) {
    return { error: 'INVALID BILLBOARD' };
  }

  await db.billboard.delete({
    where: {
      id: billboardId,
      storeId,
    },
  });

  revalidatePath(`/${storeId}/billboards`);
  redirect(`/${storeId}/billboards`);
};
