'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from './ui/button';
import { ReactNode } from 'react';

export const GoogleSignInButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      onClick={async () => {
        const data = await authClient.signIn.social({
          provider: 'google',
        });

        console.log(data);
      }}
    >
      {children}
    </Button>
  );
};
