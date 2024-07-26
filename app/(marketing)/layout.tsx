import { BaseNav} from '@/components/nav/base-nav';
import { Footer } from './_components/footer';
import { Header } from './_components/header';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <BaseNav />
      <main className='flex-1 flex-col items-center justify-center'>{children}</main>
      <Footer />
    </div>
  );
}
