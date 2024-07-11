'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

export const Socials = () => {
  return (
    <div className='flex flex-col items-center w-full gap-4'>
      <Button
        variant='outline'
        className='flex gap-4 w-full'
        onClick={() =>
          signIn('google', {
            redirect: false,
            callbackUrl: '/',
          })
        }
      >
        <FcGoogle className='size-5' />
        <p>Sign in with Google</p>
      </Button>
    </div>
  );
};
