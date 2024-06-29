import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { SettingsForm } from './_components/settings-form';
import { auth } from '@clerk/nextjs/server';

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='space-y-4 '>
      <SettingsForm initialData={store} />
    </div>
  );
};
export default SettingsPage;
