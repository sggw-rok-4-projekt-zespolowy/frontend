import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z
      .string()
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores.',
      ),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof formSchema>;

interface RegisterFormProps {
  className?: string;
  error?: string | null;
  isSubmitting?: boolean;
  onSubmit: (data: RegisterFormData) => void | Promise<void>;
}

export function RegisterForm({
  className,
  error,
  isSubmitting,
  onSubmit,
}: RegisterFormProps) {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={form.handleSubmit(onSubmit)}
    >
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Join the rhythm
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
            {error}
          </div>
        )}

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="username">Username</label>
              <input
                {...field}
                id="username"
                type="text"
                placeholder="Enter your username"
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <p className="text-destructive mt-1 text-sm">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...field}
                id="email"
                type="text"
                placeholder="m@example.com"
                autoComplete="email"
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <p className="text-destructive mt-1 text-sm">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...field}
                id="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <p className="text-destructive mt-1 text-sm">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <p className="text-destructive mt-1 text-sm">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        <button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </button>

        <div>Already have an account?</div>

        <div>
          <Link
            to="/login"
          >
            Login
          </Link>
        </div>
    </form>
  );
}
