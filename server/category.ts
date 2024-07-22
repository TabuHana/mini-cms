'use server';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { CategorySchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createCategory = async (values: z.infer<typeof CategorySchema>, storeId: string) => {}

export const updateCategory = async (values: z.infer<typeof CategorySchema>, storeId: string, categoryId: string) => {}

export const deleteCategory = async (categoryId: string, storeId: string) => {}