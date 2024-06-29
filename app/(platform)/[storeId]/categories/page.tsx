import { format } from 'date-fns';

import { Heading } from '@/components/heading';
import { ApiList } from '@/components/api-list';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';

import { CategoryClient } from './_components/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const CategoriesPage = async ({ params }: { params: { shopId: string } }) => {
    const categories = await db.category.findMany({
        where: {
            shopId: params.shopId,
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
        <div>
            <ScrollArea className='h-[calc(100vh-100px)]'>
                <div className='flex flex-col p-4 space-y-4'>
                    <div className='flex-1 space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
                        <CategoryClient data={formattedCategories} />
                    </div>
                    <div className='space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
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
            </ScrollArea>
        </div>
    );
};
export default CategoriesPage;
