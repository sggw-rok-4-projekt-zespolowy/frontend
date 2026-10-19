import { Link } from 'react-router';

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
  return (
    <form className='flex flex-col gap-6' {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Feel the beat and sort it out!
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
            {error}
          </div>
        )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="m@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            required
          />

          <div className="flex items-center">
            <label htmlFor="password">Password</label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={isSubmitting}
            required
          />

        <button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div>Don&apos;t have an account?</div>

        <div>
          <Link
            to="/register"
          >
            Sign up
          </Link>
        </div>

        <div>OR</div>

        <div>
          <Link
            to="/quick-game"
          >
            Quick Game
          </Link>
        </div>
    </form>
  );
}
