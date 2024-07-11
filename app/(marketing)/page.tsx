import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className='max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2'>
      <div className='flex flex-col items-center gap-y-8'>
        <h2 className='text-xl lg:text-3xl font-bold text-neutral-600 text-center hover:cursor-default'>
          Enhance the speed and efficiency of your business for{' '}
          <span className='font-extrabold text-blue-700/80'>free.</span>
        </h2>
        <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
          
        </div>
      </div>
      <div className='relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0'>Image goes here</div>
    </div>
  );
}
