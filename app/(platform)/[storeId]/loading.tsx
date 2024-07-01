import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='h-full grid place-items-center'>
      <Loader2 className='size-10 animate-spin' />
    </div>
  );
}
