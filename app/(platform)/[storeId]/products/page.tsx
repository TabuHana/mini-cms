import { format } from 'date-fns';

import { db } from '@/lib/db';
import { formatter } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/api-list';
import { ProductClient } from './_components/client';

const ProductsPage = async ({ params }: { params: { shopId: string } }) => {
    const products = await db.product.findMany({
        where: {
            shopId: params.shopId,
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
        <div>
            <ScrollArea className='h-[calc(100vh-100px)]'>
                <div className='flex flex-col p-4 space-y-4'>
                    <div className='flex-1 space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
                        <ProductClient data={formattedProducts} />
                    </div>
                    <div className='space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
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
            </ScrollArea>
        </div>
    );
};

export default ProductsPage;
