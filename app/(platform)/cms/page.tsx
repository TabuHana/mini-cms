'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { StoreSchema } from '@/schemas';
import { Loader2 } from 'lucide-react';
import { createStore } from '@/server/store';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof StoreSchema>) => {
    try {
      const store = await createStore(values);
      router.push(`/${store}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className='shadow-xl w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='text-2xl'>Create your store</CardTitle>
        <CardDescription>Enter your information to create your store</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-full'
            >
              {form.formState.isSubmitting ? <Loader2 className='animate-spin' /> : <div>Continue</div>}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
