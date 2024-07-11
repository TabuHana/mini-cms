import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const StoreSchema = z.object({
  name: z.string().min(1, {
    message: 'Store name is required',
  }),
});

export const BillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const SettingsSchema = z.object({
  name: z.string().min(1, {
    message: 'Store name is required',
  }),
});

export const ColorSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: 'String must be a valid hex code',
  }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: 'Category name is required',
  }),
  billboardId: z.string().min(1),
});

export const SizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
