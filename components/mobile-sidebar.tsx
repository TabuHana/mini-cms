'use client';

import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/components/sidebar';
import { useParams, usePathname } from 'next/navigation';
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
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export const MobileSidebar = () => {
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
    <Sheet>
      <SheetTrigger>
        <Menu className='size-5' />
      </SheetTrigger>
      <SheetContent side='left'>
        <div className='flex flex-col mt-14 gap-4'>
          {routes.map(route => (
            <Button
              key={route.href}
              variant='ghost'
              className={cn(route.active && 'bg-indigo-100 text-indigo-800')}
              asChild
            >
              <Link
                href={route.href}
                className='flex gap-5'
              >
                {route.icon}
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
