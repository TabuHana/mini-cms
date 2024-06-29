'use client';

import * as z from 'zod';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';

import { createCategory } from '@/actions/create-category';
import { updateCategory } from '@/actions/update-category';
import { deleteCategory } from '@/actions/delete-category';

import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CategorySchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertModal } from '@/components/modals/alert-modal';

type CategoryFormProps = {
    initialData: Category | null;
    billboards: Billboard[];
};

export const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
    const params = useParams<{ shopId: string }>();

    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const title = initialData ? 'Edit category' : 'Create category';
    const description = initialData ? 'Edit your category' : 'Create a new category';
    const action = initialData ? 'Save' : 'Create';

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: initialData || {
            name: '',
            billboardId: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        startTransition(() => {
            if (initialData) {
                updateCategory(values, params.shopId, initialData.id);
            } else {
                createCategory(values, params.shopId);
            }
        });
    };

    const onDelete = async () => {
        if (!initialData) {
            return;
        }
        startTransition(() => {
            deleteCategory(initialData.id, params.shopId).then(() => setOpen(false));
        });
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={isPending}
            />
            <div className='flex items-center justify-between'>
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={isPending}
                        variant='destructive'
                        size='sm'
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='h-4 w-4' />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder='Category name'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='billboardId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select
                                    disabled={isPending}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder='Select a billboard'
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map(billboard => (
                                            <SelectItem
                                                key={billboard.id}
                                                value={billboard.id}
                                            >
                                                {billboard.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button
                        className='ml-auto'
                        type='submit'
                        disabled={isPending}
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
