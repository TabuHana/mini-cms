'use server';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { ProductSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createProduct = async (values: z.infer<typeof ProductSchema>, storeId: string) => {}

export const updateProduct = async (values: z.infer<typeof ProductSchema>, storeId: string, productId: string) => {}

export const deleteProduct = async (productId: string, storeId: string) => {}
