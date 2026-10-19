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
    <div className="min-h-svh flex flex-1 items-center justify-center">
      <RegisterForm
        onSubmit={handleSubmit}
        error={error}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
