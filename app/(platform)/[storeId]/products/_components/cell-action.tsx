'use client';

import { useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import { deleteProduct } from '@/actions/delete-product';
import { AlertModal } from '@/components/modals/alert-modal';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { ProductColumn } from './columns';

type CellActionProps = {
    data: ProductColumn;
};

export const CellAction = ({ data }: CellActionProps) => {
    const params = useParams<{ shopId: string }>();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);

    const onConfirm = async () => {
        startTransition(() => {
            deleteProduct(data.id, params.shopId).then(() => setOpen(false));
        });
    };

    const onCopy = async (id: string) => {
        navigator.clipboard.writeText(id);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={isPending}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'
                    >
                        <span className='sr-only'>Open Menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className='mr-2 h-4 w-4' /> Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.shopId}/products/${data.id}`)}>
                        <Edit className='mr-2 h-4 w-4' /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='mr-2 h-4 w-4' /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
