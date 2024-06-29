'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';

import { columns, BillboardColumn } from './columns';

interface BillboardClientProps {
    data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
                <div className='flex items-center justify-between'>
                    <Heading
                        title={`Total Billboards - ${data.length}`}
                        description='Manage your billboards for your shop'
                    />
                    <Button onClick={() => router.push(`/${params.shopId}/billboards/new`)}>
                        <Plus className='mr-2 h-4 w-4' /> Add New
                    </Button>
                </div>
                <Separator />
                <DataTable
                    searchKey='label'
                    columns={columns}
                    data={data}
                />

        </>
    );
};
