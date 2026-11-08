import { useNavigate } from 'react-router';

import CoolButton from '@/components/ui/CoolButton/CoolButton';

interface LoginFormProps extends React.ComponentProps<'form'> {
  error?: string | null;
  isSubmitting?: boolean;
}

export function LoginForm({
  className,
  error,
  isSubmitting,
  ...props
}: LoginFormProps) {
  const navigate = useNavigate();

  return (
    <form className='flex flex-col gap-6' {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-impact text-5xl text-secondary">Login to your account</h1>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
            {error}
          </div>
        )}

          <div className="flex items-center gap-3">
            <label htmlFor="email" className="font-impact text-secondary w-20 shrink-0">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="m@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              required
              className="w-0 min-w-0 flex-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <label htmlFor="password" className="font-impact text-secondary w-20 shrink-0">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting}
                required
                className="w-0 min-w-0 flex-1"
              />
            </div>
            <a
              href="#"
              className="font-impact text-secondary ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>

        <CoolButton type="submit" disabled={isSubmitting}>
          <span className="text-primary">
            {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
          </span>
        </CoolButton>

        <div className="font-impact text-secondary text-center">Don&apos;t have an account?</div>

        <CoolButton
          type="button"
          onClick={function () {
            void navigate('/register');
          }}
        >
          <span className="text-primary">
            SIGN UP
          </span>
        </CoolButton>

        <div className="font-impact text-secondary text-center">OR</div>

        <CoolButton
          type="button"
          onClick={function () {
            void navigate('/quick-game');
          }}
        >
          <span className="text-primary">
            QUICK GAME
          </span>
        </CoolButton>
    </form>
  );
}
