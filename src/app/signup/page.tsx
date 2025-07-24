import { AuthForm } from '@/components/auth-form';

export default function Page() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm formType="signup" />
      </div>
    </main>
  );
}
