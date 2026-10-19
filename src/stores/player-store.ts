import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PlayerState {
  username: string | null;
  setUsername: (username: string) => void;
  clearUser: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      username: null,

      setUsername: (username) => set({ username }),
      clearUser: () => set({ username: null }),
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
