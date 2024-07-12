import { currentUser } from '@/lib/auth';
import { Logo } from '../logo';
import { UserButton } from './user-button';
import { Button } from '../ui/button';
import Link from 'next/link';

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className='h-[50px] border-b flex items-center justify-between px-6'>
      <Logo />
      {user && <UserButton />}
    </nav>
  );
};
