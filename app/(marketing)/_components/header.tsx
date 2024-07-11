import Image from 'next/image';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Logo />
        </div>
        <Button asChild>
          <Link href='/auth/login'>Login</Link>
        </Button>
      </div>
    </header>
  );
};
