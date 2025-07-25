'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  formType: 'login' | 'signup';
}

export function AuthForm({ formType }: AuthFormProps) {
  const router = useRouter();

  const isSignup = formType === 'signup';

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoLoading, setIsInfoLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInfoLoading(true);

    if (isSignup) {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (data) toast.success('User signed up. Verify your email to log in.');

      if (error) toast.error(error.message || 'Internal server error');
    } else {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (data) toast.success('User signed in');

      if (error) {
        if (error.code === 'EMAIL_NOT_VERIFIED') {
          toast.error('Verify your email to sign in');
        } else {
          toast.error(error.message || 'Internal server error');
        }
      }
    }

    setIsInfoLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: 'google',
    });

    if (error) toast.error(error.message || 'Internal server error');

    setIsGoogleLoading(false);
  };

  const title = isSignup ? 'Get started' : 'Welcome back';
  const description = isSignup
    ? 'Create your account to continue'
    : 'Login to your account';
  const submitButtonText = isSignup ? 'Sign up' : 'Login';
  const linkText = isSignup ? 'Login' : 'Sign up';
  const linkHref = isSignup ? '/login' : '/signup';
  const bottomText = isSignup
    ? 'Already have an account?'
    : "Don't have an account?";

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {isSignup && (
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="me@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isSignup && (
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                disabled={isInfoLoading || isGoogleLoading}
              >
                {isInfoLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  submitButtonText
                )}
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isInfoLoading || isGoogleLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          {bottomText}{' '}
          <Link href={linkHref} className="underline">
            {linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
