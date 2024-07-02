'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { StoreSchema } from '@/schemas';
import { createStore } from '@/server/store';
import { useStoreModal } from '@/hooks/use-store-modal';

import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof StoreSchema>) => {
    try {
      const storeId = await createStore(values);
      storeModal.onClose();
      window.location.assign(`/${storeId}`);
      toast.success('Store created!');
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <Modal
      title='Create a New Store'
      description='Give a name to your store to start managing your business'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className='py-2 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Store Name'
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
              <Button
                type='button'
                variant='outline'
                onClick={storeModal.onClose}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? <Loader2 className='animate-spin' /> : <div>Continue</div>}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
