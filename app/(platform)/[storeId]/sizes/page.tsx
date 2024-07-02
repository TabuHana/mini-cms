import { format } from 'date-fns';

import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ApiList } from '@/components/api-list';
import { SizeClient } from './_components/client';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSizes: any = sizes.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex-1 space-y-4 '>
        <SizeClient data={formattedSizes} />
      </div>
      <div className='space-y-4'>
        <Heading
          title='API'
          description='API Calls for Billboards'
        />
        <Separator />
        <ApiList
          entityName='sizes'
          entityIdName='sizeId'
        />
      </div>
    </div>
  );
};
export default SizesPage;
