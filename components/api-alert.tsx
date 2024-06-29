import { Copy, Server } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ApiAlertProps {
    title: string;
    url: string;
    description: string;
}

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, url, description }) => {
    const onCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        // toast.success('API Route copied to clipboard.');
    };

    return (
        <Alert>
            <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                    <Server className='h-4 w-4' />
                    <AlertTitle className='flex items-center gap-x-2'>
                        {title}
                        <Badge variant='secondary'>Public</Badge>
                    </AlertTitle>
                </div>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => onCopy(url)}
                >
                    <Copy className='h-4 w-4' />
                </Button>
            </div>
            <AlertDescription className='mt-4 flex items-center gap-x-2'>
                Get by
                <code className='text-ellipsis relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                    {description}
                </code>
            </AlertDescription>
        </Alert>
    );
};
