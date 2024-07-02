'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';

import { columns, ProductColumn } from './columns';

interface ProductClientProps {
    data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Total Products - ${data.length}`}
                    description='Manage your products'
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className='mr-2 h-4 w-4' /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey='name'
                columns={columns}
                data={data}
            />
        </>
    );
};
