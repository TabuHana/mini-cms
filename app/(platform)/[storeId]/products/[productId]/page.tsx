import { db } from '@/lib/db';

import { ProductForm } from './_components/product-form';

const ProductIdPage = async ({ params }: { params: { productId: string; shopId: string } }) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productId,
        },
        include: {
            images: true,
        },
    });

    const categories = await db.category.findMany({
        where: {
            shopId: params.shopId,
        },
    });

    const sizes = await db.size.findMany({
        where: {
            shopId: params.shopId,
        },
    });

    const colors = await db.color.findMany({
        where: {
            shopId: params.shopId,
        },
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                    initialData={product}
                />
            </div>
        </div>
    );
};
export default ProductIdPage;
