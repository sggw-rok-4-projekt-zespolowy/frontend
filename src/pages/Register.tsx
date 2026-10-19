import { useState } from 'react';
import { useNavigate } from 'react-router';

import AuthBg from '@/assets/auth-bg.jpg';
import {
  RegisterForm,
  type RegisterFormData,
} from '@/components/register-form';
import { authService } from '@/services/auth';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: RegisterFormData) {
    setError(null);
    setIsSubmitting(true);

    try {
      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      void navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          Music Game?
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm
              onSubmit={handleSubmit}
              error={error}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={AuthBg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  );
}
