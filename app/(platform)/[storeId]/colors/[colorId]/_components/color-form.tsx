'use client';

import * as z from 'zod';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Trash } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';

import { createColor, updateColor, deleteColor } from '@/server/color';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { ColorSchema } from '@/schemas';
import { toast } from 'sonner';

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm = ({ initialData }: ColorFormProps) => {
  const params = useParams<{ storeId: string }>();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const title = initialData ? 'Edit color' : 'Create color';
  const description = initialData ? 'Edit a color.' : 'Add a new color';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ColorSchema>) => {
    startTransition(() => {
      if (initialData) {
        updateColor(values, params.storeId, initialData.id);
        toast.success('Color updated!');
      } else {
        createColor(values, params.storeId);
        toast.success('Color created!');
      }
    });
  };

  const onDelete = async () => {
    if (!initialData) {
      return;
    }
    startTransition(() => {
      deleteColor(initialData.id, params.storeId).then(() => setOpen(false));
      toast.success('Color deleted');
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
          className='space-y-8 w-full'
        >
          <div className='md:grid md:grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='Color name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <div className='flex items-center gap-x-4'>
                      <Input
                        disabled={isPending}
                        placeholder='Color value'
                        {...field}
                      />
                      <div
                        className='border p-4 rounded-full'
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            className='ml-auto'
            type='submit'
          >
            {isPending ? <Loader2 className='animate-spin' /> : action}
          </Button>
        </form>
      </Form>
    </>
  );
};
