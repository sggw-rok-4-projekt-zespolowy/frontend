import { useId, useState } from 'react';
import { useNavigate } from 'react-router';

import CoolButtonComponent from '@/components/game/CoolButtonComponent/CoolButtonComponent';
import GlowingPopupComponent from '@/components/game/GlowingPopupComponent/GlowingPopupComponent';
import PopupComponent from '@/components/game/PopupComponent/PopupComponent';
import { useAuth } from '@/hooks/use-auth';
import api from '@/services/api';

export default function RegisteredGameEntry() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { user, accessToken } = useAuth();
  const secondsSelectId = useId();
  const roundsSelectId = useId();

  async function onSubmit(formData: FormData) {
    try {
      const choices = {
        variant: 'DUEL',
        ...(formData.get('seconds_per_round') &&
        formData.get('seconds_per_round') !== 'any'
          ? { seconds_per_round: formData.get('seconds_per_round') }
          : {}),
        ...(formData.get('rounds') && formData.get('rounds') !== 'any'
          ? { rounds: formData.get('rounds') }
          : {}),
      };
      const response = await api.post('/game/registered-start', choices);
      if (response.status === 202) {
        setMessage('Waiting for another player. Please wait...');
        setTimeout(onSubmit, 5000);
      } else if (response.status === 200) {
        const gameId = response.data.session_id;

        await navigate(
          `/registered-game/${gameId}/${user!.id}?access_token=${accessToken}`,
        );
      }
    } catch {
      setMessage('Something went wrong :( Try again later');
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-3/5 w-1/2 min-w-[600px]">
        <PopupComponent title="CHOOSE YOUR SETTINGS">
          <form
            className="flex w-full flex-col items-center gap-7 p-15 pt-10 pb-10"
            action={onSubmit}
          >
            <div className="flex w-full flex-row items-center gap-10">
              <label
                className="text-game-ui-primary text-2xl"
                htmlFor={secondsSelectId}
              >
                seconds per round:
              </label>
              <select
                className="bg-game-ui-bg-mid hover:bg-game-ui-bg-highlight border-game-ui-accent flex-1 appearance-none rounded-full border-2 p-3 text-center text-2xl font-bold transition-all duration-300"
                id={secondsSelectId}
                name="seconds_per_round"
              >
                <option className="bg-game-ui-bg-mid" value="any">
                  ANY
                </option>
                <option className="bg-game-ui-bg-mid" value={15}>
                  15
                </option>
                <option className="bg-game-ui-bg-mid" value={30}>
                  30
                </option>
                <option className="bg-game-ui-bg-mid" value={35}>
                  35
                </option>
              </select>
            </div>

            <div className="flex w-full flex-row items-center gap-10">
              <label
                className="text-game-ui-primary text-2xl"
                htmlFor={roundsSelectId}
              >
                number of rounds:
              </label>
              <select
                className="bg-game-ui-bg-mid hover:bg-game-ui-bg-highlight border-game-ui-accent flex-1 appearance-none rounded-full border-2 p-3 text-center text-2xl font-bold transition-all duration-300"
                id={roundsSelectId}
                name="rounds"
              >
                <option className="bg-game-ui-bg-mid" value="any">
                  ANY
                </option>
                <option className="bg-game-ui-bg-mid" value={3}>
                  3
                </option>
                <option className="bg-game-ui-bg-mid" value={5}>
                  5
                </option>
                <option className="bg-game-ui-bg-mid" value={7}>
                  7
                </option>
              </select>
            </div>
            <div className="w-3/5 pt-7">
              <CoolButtonComponent type="submit">PLAY</CoolButtonComponent>
            </div>
          </form>
        </PopupComponent>
      </div>
      {message && (
        <div className="bg-background/30 absolute z-50 h-screen w-screen backdrop-blur-[2px]">
          <div className="absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 transform">
            <GlowingPopupComponent>
              <div className="p-10 pr-15 pl-15 text-lg">{message}</div>
            </GlowingPopupComponent>
          </div>
        </div>
      )}
    </div>
  );
}
