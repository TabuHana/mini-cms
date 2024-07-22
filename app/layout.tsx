import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { ModalProvider } from '@/providers/modal-provider';
import { extractRouterConfig } from 'uploadthing/server';

import { cn } from '@/lib/utils';

import { ourFileRouter } from './api/uploadthing/core';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={cn('min-h-screen bg-background font-nunito antialiased', inter.variable)}>
          <Toaster />
          <ModalProvider />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
