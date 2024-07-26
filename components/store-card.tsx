import { Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export const StoreCard = () => {
  return (
    <Card className='aspect-video h-full w-full'>
      <div className='bg-blue-300 h-14 rounded-t-lg overflow-hidden relative'>
        <Package className='absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 size-16' />
      </div>
      <CardContent className='p-2'>
        <div>
          <p className='text-xl font-semibold'>Store Name</p>
          <p className='text-sm text-muted-foreground'>Store URL</p>
        </div>
      </CardContent>
    </Card>
  );
};
