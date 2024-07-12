
import { MobileSidebar } from './mobile-sidebar';
import { Loader } from 'lucide-react';
import { StoreSwitcher } from './store-switcher';
import { redirect } from 'next/navigation';

export const Navbar = async () => {

  return (
    <nav className='lg:ml-16 px-6 h-[50px] flex items-center border-b fixed top-0 w-full lg:max-w-[calc(100%-64px)] z-50 bg-background'>
      <div className='hidden lg:grid place-content-end w-full'>
        {/* <StoreSwitcher items={stores} /> */}
      </div>
      <div className='flex lg:hidden w-full justify-between '>
        <MobileSidebar />
        <div className='flex gap-4 items-center'>
          {/* <StoreSwitcher items={stores} /> */}
          user btn
        </div>
      </div>
    </nav>
  );
};
