import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { Logo } from '../logo';
import { Button } from '../ui/button';
import Link from 'next/link';

export const BaseNav = async () => {
  return (
    <nav className='h-16 border-b p-4'>
      <div className='flex items-center justify-between max-w-screen-xl mx-auto lg:px-4'>
        <SignedIn>
          <Logo />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Logo />
          <Button
            variant='outline'
            size='sm'
            asChild
          >
            <Link href='/auth/sign-in'>Sign In</Link>
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
};
