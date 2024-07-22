'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { BillboardSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createBillboard = async (values: z.infer<typeof BillboardSchema>, storeId: string) => {};

export const updateBillboard = async (
  values: z.infer<typeof BillboardSchema>,
  storeId: string,
  billboardId: string
) => {};

export const deleteBillboard = async (billboardId: string, storeId: string) => {};
