import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { SettingsForm } from './_components/settings-form';

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {


  return (
    <div className='space-y-4 '>
      {/* <SettingsForm initialData={store} /> */}
    </div>
  );
};
export default SettingsPage;
