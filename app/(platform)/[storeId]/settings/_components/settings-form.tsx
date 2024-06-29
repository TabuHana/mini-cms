'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';

import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SettingsSchema } from '@/schemas';
import { toast } from 'sonner';
import { deleteStore, updateStore } from '@/server/store';

type SettingsFormProps = {
  initialData: Store;
};

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const params = useParams<{ storeId: string }>();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    try {
      startTransition(() => {
        const storeName = updateStore(values, params.storeId);
        toast(`Successfuly updated to ${storeName}`);
      });
    } catch (error: any) {
      toast(error);
    }
  };

  const onDelete = async () => {
    try {
      startTransition(() => {
        deleteStore(params.storeId);
        toast('Store Deleted');
        window.location.assign('/cms');
      });
    } catch (error: any) {
      toast(error);
    }
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
          title='Settings'
          description='Manage store preferences'
        />
        <Button
          variant='destructive'
          size='icon'
          disabled={form.formState.isSubmitting}
          onClick={() => setOpen(true)}
        >
          <Trash className='size-5' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Store name'
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={form.formState.isSubmitting}
            className='ml-auto'
            type='submit'
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};
