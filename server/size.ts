'use server';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { SizeSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createSize = async (values: z.infer<typeof SizeSchema>, storeId: string) => {}

export const updateSize = async (values: z.infer<typeof SizeSchema>, storeId: string, sizeId: string) => {}

export const deleteSize = async (sizeId: string, storeId: string) => {}
