import { format } from 'date-fns';

import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ApiList } from '@/components/api-list';
import { SizeClient } from './_components/client';

const SizesPage = async ({ params }: { params: { shopId: string } }) => {
    const sizes = await db.size.findMany({
        where: {
            shopId: params.shopId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedSizes: any = sizes.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

    return (
        <div>
            <ScrollArea className='h-[calc(100vh-100px)]'>
                <div className='flex flex-col p-4 space-y-4'>
                    <div className='flex-1 space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
                        <SizeClient data={formattedSizes} />
                    </div>
                    <div className='space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
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
            </ScrollArea>
        </div>
    );
};
export default SizesPage;


