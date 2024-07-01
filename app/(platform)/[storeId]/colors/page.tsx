import { format } from 'date-fns';

import { db } from '@/lib/db';

import { ColorColumn } from './_components/columns';
import { ColorClient } from './_components/client';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import { ApiList } from '@/components/api-list';

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex-1 space-y-4'>
        <ColorClient data={formattedColors} />
      </div>
      <div className='space-y-4'>
        <Heading
          title='API'
          description='API Calls for Billboards'
        />
        <Separator />
        <ApiList
          entityName='colors'
          entityIdName='colorId'
        />
      </div>
    </div>
  );
};

export default ColorsPage;
