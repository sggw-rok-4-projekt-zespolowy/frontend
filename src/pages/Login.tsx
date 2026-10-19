import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';

import { LoginForm } from '@/components/login-form';
import { authService } from '@/services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authService.login({ email, password });
      void navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-svh flex flex-1 items-center justify-center">
      <LoginForm
        onSubmit={handleSubmit}
        error={error}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
