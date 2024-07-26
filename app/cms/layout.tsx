import { BaseNav } from '@/components/nav/base-nav';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseNav />
      {children}
    </>
  );
}
