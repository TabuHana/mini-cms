import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { MobileSidebar } from './mobile-sidebar';
import { Loader } from 'lucide-react';
import { StoreSwitcher } from './store-switcher';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const Header = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }
  
  const stores = await db.store.findMany({ where: { userId } });

  return (
    <nav className='lg:ml-16 px-6 h-[50px] flex items-center border-b fixed top-0 w-full lg:max-w-[calc(100%-64px)] z-50 bg-background'>
      <div className='hidden lg:grid place-content-end w-full'>
        <StoreSwitcher items={stores} />
      </div>
      <div className='flex lg:hidden w-full justify-between '>
        <MobileSidebar />
        <div className='flex gap-4 items-center'>
          <StoreSwitcher items={stores} />
          <ClerkLoading>
            <Loader className='size-5 text-muted-foreground animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl='/' />
          </ClerkLoaded>
        </div>
      </div>
    </nav>
  );
};
