'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { StoreSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createStore = async (values: z.infer<typeof StoreSchema>) => {}

export const updateStore = async (values: z.infer<typeof StoreSchema>, storeId: string) => {}

export const deleteStore = async (storeId: string) => {}
