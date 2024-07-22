'use client';

import { Socials } from '@/components/auth/socials';
import { BackButton } from '@/components/auth/back-button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type CardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocials?: boolean;
};

export const AuthCard = ({ children, cardTitle, backButtonHref, backButtonLabel, showSocials }: CardWrapperProps) => {
  return (
    <Card className='shadow-lg'>
      <CardHeader>
        <CardTitle className='mx-auto'>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='flex flex-col gap-2'>
        {showSocials && <Socials />}
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
