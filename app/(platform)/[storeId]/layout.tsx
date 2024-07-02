import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/cms');
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className='lg:pl-16 h-full pt-[50px]'>
        <div className='max-w-[calc(100%-50px)] mx-auto pt-6 h-full'>{children}</div>
      </main>
    </>
  );
}
