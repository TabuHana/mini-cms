'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Billboard } from '@prisma/client';

import { createBillboard, updateBillboard, deleteBillboard } from '@/server/billboard';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BillboardSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { ImageUpload } from '@/components/image-upload';
import { useParams } from 'next/navigation';
import { Trash } from 'lucide-react';
import { AlertModal } from '@/components/modals/alert-modal';

type BillboardFormProps = {
    initialData: Billboard | null;
};

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
    const params = useParams<{ storeId: string }>();

    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const title = initialData ? 'Edit Billboard' : 'Create Billboard';
    const description = initialData ? 'Edit your Billboard' : 'Create a new Billboard';
    const action = initialData ? 'Save' : 'Create';

    const form = useForm<z.infer<typeof BillboardSchema>>({
        resolver: zodResolver(BillboardSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof BillboardSchema>) => {
        startTransition(() => {
            if (initialData) {
                updateBillboard(values, params.storeId, initialData.id);
            } else {
                createBillboard(values, params.storeId);
            }
        });
    };

    const onDelete = async () => {
        if (!initialData) {
            return;
        }

        startTransition(() => {
            deleteBillboard(initialData.id, params.storeId);
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
                        name='imageUrl'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={isPending}
                                        onChange={url => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='label'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Billboard label...'
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
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
