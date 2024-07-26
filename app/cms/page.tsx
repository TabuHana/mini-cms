import { NewStoreBtn } from '@/components/new-store-btn';
import { StoreCard } from '@/components/store-card';

export default function CMSPage() {
  return (
    <div className='max-w-screen-xl mx-auto p-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:px-4'>
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <NewStoreBtn />
      </div>
    </div>
  );
}
