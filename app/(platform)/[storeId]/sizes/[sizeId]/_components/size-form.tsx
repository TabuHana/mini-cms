'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Size } from '@prisma/client';

import { createSize, updateSize,deleteSize } from '@/server/size';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SizeSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alert-modal';


type SizeFormProps = {
    initialData: Size | null;
};

export const SizeForm = ({ initialData }: SizeFormProps) => {
    const params = useParams<{ storeId: string }>();

    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const title = initialData ? 'Edit size' : 'Create size';
    const description = initialData ? 'Edit your size' : 'Create a new size';
    const action = initialData ? 'Save' : 'Create';

    const form = useForm<z.infer<typeof SizeSchema>>({
        resolver: zodResolver(SizeSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof SizeSchema>) => {
        startTransition(() => {
            if (initialData) {
                updateSize(values, params.storeId, initialData.id);
            } else {
                createSize(values, params.storeId);
            }
        });
    };

    const onDelete = async () => {
        if (!initialData) {
            return;
        }
        startTransition(() => {
            deleteSize(initialData.id, params.storeId).then(() => setOpen(false));
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
                                        placeholder='Size name'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='value'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder='Size value'
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
