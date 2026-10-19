import { useNavigate } from 'react-router';

import CoolButtonComponent from '@/components/game/CoolButtonComponent/CoolButtonComponent';
import PopupComponent from '@/components/game/PopupComponent/PopupComponent';
import { useAuth } from '@/hooks/use-auth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-3/5 w-1/2 min-w-[600px]">
        <PopupComponent title="Dashboard">
          <div className="flex flex-col items-center gap-5 p-15 pt-7 pb-10">
            <div className="w-full">
              <p className="text-game-ui-primary text-xl">Welcome back,</p>
              <p className="text-game-ui-secondary text-2xl">
                {user?.username ?? 'User'}
              </p>
              <p className="text-game-ui-primary text-xl">{user?.email}</p>
            </div>
            <div className="w-4/5 pt-5">
              <CoolButtonComponent
                onClick={function () {
                  void navigate('/registered-game');
                }}
              >
                {' '}
                Registered game{' '}
              </CoolButtonComponent>
            </div>
            <div className="w-4/5">
              <CoolButtonComponent onClick={logout}>
                {' '}
                Sign out{' '}
              </CoolButtonComponent>
            </div>
          </div>
        </PopupComponent>
      </div>
    </div>
  );
}
