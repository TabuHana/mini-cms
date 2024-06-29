import { format } from 'date-fns';

import { db } from '@/lib/db';

import { ColorColumn } from './_components/columns';
import { ColorClient } from './_components/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import { ApiList } from '@/components/api-list';

const ColorsPage = async ({ params }: { params: { shopId: string } }) => {
    const colors = await db.color.findMany({
        where: {
            shopId: params.shopId,
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
        <div>
            <ScrollArea className='h-[calc(100vh-100px)]'>
                <div className='flex flex-col p-4 space-y-4'>
                    <div className='flex-1 space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
                        <ColorClient data={formattedColors} />
                    </div>
                    <div className='space-y-4 p-8 pt-6 bg-card shadow-lg rounded-2xl hover:shadow-none transition'>
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
            </ScrollArea>
        </div>
    );
};

export default ColorsPage;
