'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';
import { signOut } from 'next-auth/react';

export default function SetupPage() {
  return <div onClick={() => signOut()}>CMs page</div>;
}
