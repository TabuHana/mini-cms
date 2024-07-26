import { Package } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Button
      variant='ghost'
      size='sm'
      asChild
    >
      <Link href='/' className='gap-x-2'>
        <Package className='size-6' />
        <h1 className='font-bold'>mini<span className='text-sky-400'>CMS</span></h1>
      </Link>
    </Button>
  );
};
