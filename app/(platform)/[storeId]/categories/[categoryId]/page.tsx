import { db } from '@/lib/db';

import { CategoryForm } from './_components/category-form';

const CategoryIdPage = async ({ params }: { params: { shopId: string; category: string; categoryId: string } }) => {

    const category = await db.category.findUnique({
        where: {
            id: params.categoryId,
        },
    });

    const billboards = await db.billboard.findMany({
        where: {
            shopId: params.shopId
        }
    })

    return (
        <div className='flex-col bg-card shadow-2xl rounded-2xl hover:shadow-none transition'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryForm initialData={category} billboards={billboards} />
            </div>
        </div>
    );
};
export default CategoryIdPage;