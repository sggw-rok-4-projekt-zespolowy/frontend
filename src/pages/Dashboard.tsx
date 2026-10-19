import { useNavigate } from 'react-router';

import CoolButton from '@/components/ui/CoolButton/CoolButton';
import Popup from '@/components/ui/Popup/Popup';
import { useAuth } from '@/hooks/use-auth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-3/5 w-1/2 min-w-[600px]">
        <Popup title="Dashboard">
          <div className="flex flex-col items-center gap-5 p-15 pt-7 pb-10">
            <div className="w-full">
              <p className="text-primary text-xl">Welcome back,</p>
              <p className="text-secondary text-2xl">
                {user?.username ?? 'User'}
              </p>
              <p className="text-primary text-xl">{user?.email}</p>
            </div>
            <div className="w-4/5 pt-5">
              <CoolButton
                onClick={function () {
                  void navigate('/registered-game');
                }}
              >
                {' '}
                Registered game{' '}
              </CoolButton>
            </div>
            <div className="w-4/5">
              <CoolButton onClick={logout}>
                {' '}
                Sign out{' '}
              </CoolButton>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
