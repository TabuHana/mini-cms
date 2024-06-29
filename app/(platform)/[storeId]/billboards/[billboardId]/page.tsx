import { db } from '@/lib/db';
import { BillboardForm } from './_components/billboard-form';

const BillboardIdPage = async ({ params }: { params: { shopId: string; billboard: string; billboardId: string } }) => {

    const billboard = await db.billboard.findUnique({
        where: {
            id: params.billboardId,
        },
    });

    return (
        <div className='flex-col bg-card shadow-2xl rounded-2xl hover:shadow-none transition'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};
export default BillboardIdPage;
