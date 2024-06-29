'use client';

import { ApiAlert } from '@/components/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${params.shopId}`;

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <ApiAlert
                title='GET'
                url={`${baseUrl}/${entityName}`}
                description={`${entityName}`}
            />
            <ApiAlert
                title='GET'
                url={`${baseUrl}/${entityName}/{${entityIdName}}`}
                description={`${entityName}/{${entityIdName}}`}
            />
        </div>
    );
};
