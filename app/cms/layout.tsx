import { Navbar } from '@/components/nav/navbar';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
