'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

import { cn } from '@/lib/utils';
import { register } from '@/server/actions/register';
import { RegisterSchema } from '@/schemas';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthCard } from '@/components/auth/auth-wrapper';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      // TODO: Register user
      register(values).then(res => {
        if (res.success) {
          toast.success(res.success);
          router.push('/cms');
        } else {
          toast.error(res.error);
        }
      });
    });
  };

  return (
    <AuthCard
      cardTitle='Create an account'
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account?'
      showSocials
    >
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
                    placeholder='John Doe'
                    type='text'
                    disabled={isPending}
                    autoComplete='cc-name'
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
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
                <Loader2 className='animate-spin size-4' /> Register
              </>
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};
