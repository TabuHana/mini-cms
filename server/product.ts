'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { ProductSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createProduct = async (values: z.infer<typeof ProductSchema>, storeId: string) => {
  const validatedFields = ProductSchema.safeParse(values);

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

  const { name, images, price, categoryId, sizeId, colorId, isFeatured, isArchived } = validatedFields.data;

  if (!images.length) {
    return { error: '1 OR MORE IMAGES ARE REQUIRED' };
  }

  try {
    await db.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    revalidatePath(`/${storeId}/products`);
    redirect(`/${storeId}/products`);
  } catch (error) {
    return { error: 'AN ERROR HAS OCCURED CREATING YOUR PRODUCT' };
  }
};

export const updateProduct = async (values: z.infer<typeof ProductSchema>, storeId: string, productId: string) => {
  const validatedFields = ProductSchema.safeParse(values);

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

  if (!productId) {
    return { error: 'INVALID PRODUCT ID' };
  }

  const { name, images, price, categoryId, sizeId, colorId, isFeatured, isArchived } = validatedFields.data;

  const updatedProduct = await db.product.update({
    where: {
      id: productId,
      storeId,
    },
    data: {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      images: {
        deleteMany: {},
      },
    },
  });

  await db.product.update({
    where: {
      id: updatedProduct.id,
    },
    data: {
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
    },
  });

  revalidatePath(`/${storeId}/products`);
  redirect(`/${storeId}/products`);
};

export const deleteProduct = async (productId: string, storeId: string) => {
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

  if (!productId) {
    return { error: 'INVALID PRODUCT ID' };
  }

  const product = await db.product.findFirst({
    where: {
      id: productId,
      storeId,
    },
  });

  if (!product) {
    return { error: 'INVALID PRODUCT' };
  }

  await db.product.delete({
    where: {
      id: productId,
      storeId,
    },
  });

  revalidatePath(`/${storeId}/products`);
  redirect(`/${storeId}/products`);
};
