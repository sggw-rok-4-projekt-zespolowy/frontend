import { createBrowserRouter } from 'react-router';

import App from '@/App.tsx';
import { ProtectedAuthRoute } from '@/components/protected-auth-route';
import Dashboard from '@/pages/Dashboard';
import Game from '@/pages/Game.tsx';
import RegisteredGame from '@/pages/RegisteredGame.tsx';
import RegisteredGameEntry from '@/pages/RegisteredGameEntry.tsx';
import Login from '@/pages/Login';
import QuickGameEntry from '@/pages/QuickGameEntry.tsx';
import Register from '@/pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Protected routes
      {
        index: true,
        element: (
          <ProtectedAuthRoute>
            <Dashboard />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: 'registered-game',
        children: [
          {
            path: '',
            element: (
              <ProtectedAuthRoute>
                <RegisteredGameEntry/>
              </ProtectedAuthRoute>
            )
          },
          {
            path: ':gameId/:playerId',
            element: (<RegisteredGame/>)
          },
        ]
      },
      {
        path: 'quick-game',
        children: [
          {
            index: true,
            element: <QuickGameEntry />,
          },
        ],
      },
      {
        path: 'game',
        children: [
          {
            path: ':gameId/:playerId',
            element: <Game />,
          },
        ],
      },
      // Public routes
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

export default router;
