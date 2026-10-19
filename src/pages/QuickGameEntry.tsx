import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as z from 'zod';

import { Loading } from '@/components/loading';
import api from '@/services/api';
import { usePlayerStore } from '@/stores/player-store';

interface QuickGameStartResponse {
  session_id: string;
  players_ids: string[];
}

const formSchema = z.object({
  username: z
    .string()
    .min(6, 'Username must be at least 6 characters.')
    .max(20, 'Username must be at most 20 characters.')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores.',
    ),
});

export default function QuickGameEntry() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const setUsername = usePlayerStore((state) => state.setUsername);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post<QuickGameStartResponse>(
        '/game/quick-start',
        {
          variant: 'SINGLE',
        },
      );

      setUsername(data.username);

      const gameId = response.data.session_id;
      const playerId = response.data.players_ids[0];

      await navigate(`/game/${gameId}/${playerId}`);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <Loading
          header="Preparing your songs..."
          subheader="Please wait while we set up your game."
        />
      )}
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="w-full sm:max-w-md">
              <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          id="form-rhf-input-username"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your username"
                          autoComplete="username"
                          disabled={isLoading}
                        />
                        <div>
                          This is your public display name. Must be between 6
                          and 20 characters. Must only contain letters, numbers,
                          and underscores.
                        </div>
                      </div>
                    )}
                  />
              </form>
              <div className="flex flex-row justify-between">
                <Link
                  to="/login"
                  aria-disabled={isLoading}
                  tabIndex={isLoading ? -1 : 0}
                >
                  Back to Login
                </Link>
                <button
                  type="submit"
                  form="form-rhf-input"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'CONNECTING...' : 'PLAY!'}
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
