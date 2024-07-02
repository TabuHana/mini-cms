import { format } from 'date-fns';

import { db } from '@/lib/db';
import { formatter } from '@/lib/utils';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/api-list';
import { ProductClient } from './_components/client';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: any = products.map(item => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex-1 space-y-4'>
        <ProductClient data={formattedProducts} />
      </div>
      <div className='space-y-4'>
        <Heading
          title='API'
          description='API Calls for Billboards'
        />
        <Separator />
        <ApiList
          entityName='products'
          entityIdName='productId'
        />
      </div>
    </div>
  );
};

export default ProductsPage;
