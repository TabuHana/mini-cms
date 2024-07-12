import { Navbar } from '@/components/nav/navbar';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';


export default async function SetupLayout ({ children }: { children: React.ReactNode }) {

  const user = await currentUser();

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};