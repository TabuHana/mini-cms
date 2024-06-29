'use client';

import {
  Folder,
  GalleryVerticalEnd,
  Home,
  Loader,
  PackageSearch,
  Palette,
  Ruler,
  Settings,
  ShoppingCart,
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}`,
      icon: <Home />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
      icon: <GalleryVerticalEnd />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`,
      icon: <ShoppingCart />,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`,
      icon: <PackageSearch />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
      icon: <Folder />,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
      icon: <Ruler />,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`,
      icon: <Palette />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
      icon: <Settings />,
    },
  ];

  return (
    <div className='h-full w-16 hidden lg:flex flex-col justify-between fixed left-0 top-0 border-r shadow-sm'>
      <div className='flex flex-col p-4 items-center'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='Logo'
            height={25}
            width={25}
          />
        </Link>
        <div className='flex flex-col mt-10'>
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'relative flex items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors group'
              )}
            >
              <div className={cn('text-gray-600', route.active && 'text-blue-500')}>{route.icon}</div>
              <div className='absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='mb-5 p-4'>
        <ClerkLoading>
          <Loader className='size-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl='/' />
        </ClerkLoaded>
      </div>
    </div>
  );
};
