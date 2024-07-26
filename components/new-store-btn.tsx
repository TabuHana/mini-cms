import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

export const NewStoreBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='aspect-video h-full w-full border border-dashed rounded-lg flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'>
          <p className='text-sm'>Create a new store</p>
          <span className='text-xs'>2 free remaining</span>
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div>Create a new store</div>
      </DialogContent>
    </Dialog>
  );
};
