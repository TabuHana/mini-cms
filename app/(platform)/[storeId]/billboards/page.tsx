import { format } from 'date-fns';

import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/api-list';
import { db } from '@/lib/db';

import { BillboardColumn } from './_components/columns';
import { BillboardClient } from './_components/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heading } from '@/components/heading';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(item => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex-1 space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
        <BillboardClient data={formattedBillboards} />
      </div>
      <div className='space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
        <Heading
          title='API'
          description='API Calls for Billboards'
        />
        <Separator />
        <ApiList
          entityName='billboards'
          entityIdName='billboardId'
        />
      </div>
    </div>
  );
};
export default BillboardsPage;
