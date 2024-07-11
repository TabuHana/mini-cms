'use server';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { ColorSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { toast } from 'sonner';

export const createColor = async (values: z.infer<typeof ColorSchema>, storeId: string) => {}

export const updateColor = async (values: z.infer<typeof ColorSchema>, storeId: string, colorId: string) => {}

export const deleteColor = async (colorId: string, storeId: string) => {}
