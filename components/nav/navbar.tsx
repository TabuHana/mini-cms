import { SignedIn, UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { Logo } from '../logo';

export const Navbar = async () => {
  return (
    <nav className='h-16 border-b p-4'>
      <div className='flex items-center justify-between max-w-screen-xl mx-auto'>
        <SignedIn>
          <Logo />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
