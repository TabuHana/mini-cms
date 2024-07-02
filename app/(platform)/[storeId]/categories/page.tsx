import { format } from 'date-fns';

import { Heading } from '@/components/heading';
import { ApiList } from '@/components/api-list';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';

import { CategoryClient } from './_components/client';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: any = categories.map(item => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex-1 space-y-4'>
        <CategoryClient data={formattedCategories} />
      </div>
      <div className='space-y-4'>
        <Heading
          title='API'
          description='API Calls for Billboards'
        />
        <Separator />
        <ApiList
          entityName='categories'
          entityIdName='categoryId'
        />
      </div>
    </div>
  );
};
export default CategoriesPage;
