import { Outlet } from 'react-router';

import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/providers/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
