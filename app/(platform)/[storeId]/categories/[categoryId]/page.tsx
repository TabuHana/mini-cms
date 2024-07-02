import { db } from '@/lib/db';

import { CategoryForm } from './_components/category-form';

const CategoryIdPage = async ({ params }: { params: { storeId: string; category: string; categoryId: string } }) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4'>
        <CategoryForm
          initialData={category}
          billboards={billboards}
        />
      </div>
    </div>
  );
};
export default CategoryIdPage;
