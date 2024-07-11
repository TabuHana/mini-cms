'use client';

import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

import { cn } from '@/lib/utils';
import { LoginSchema } from '@/schemas';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthCard } from '@/components/auth/auth-wrapper';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      // TODO: Register user
      console.log(values);
    });
  };

  return (
    <AuthCard
      cardTitle='Welcome back'
      backButtonHref='/auth/register'
      backButtonLabel="Don't have an account?"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='johndoe@gmail.com'
                    type='email'
                    disabled={isPending}
                    autoComplete='email'
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='*********'
                    type='password'
                    disabled={isPending}
                    autoComplete='current-password'
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className={cn('mt-6 flex gap-4 w-full', isPending ? 'animate-pulse' : '')}
          >
            {isPending ? (
              <>
                <Loader2 className='animate-spin size-4' /> Login
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
