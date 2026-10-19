import { create } from 'zustand';

import {
  type IncomingMessage,
  type GameSessionMetadata,
  type PlayerData,
  type TrackPublic,
  type TrackPrivate,
  type ServerMessage,
} from '../types/game';

const WS_BASE =
  (import.meta.env.VITE_WS_URL as string | undefined) ?? 'ws://localhost:8000';

interface GameState {
  // State
  socket: WebSocket | null;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  playersData: Record<string, PlayerData>;
  currentAudioUrl: string | null;
  previousAnswer: 'correct' | 'incorrect' | null;
  isFinished: boolean;
  errorMessage: string | null;
  revealedTracksMap: Record<number, TrackPublic>;
  matchedTracks: Record<string, TrackPrivate[]>;
  gameSessionMetadata: GameSessionMetadata | null;

  // Actions
  connect: (gameId: string, playerId: string, access_token?: string) => void;
  disconnect: () => void;
  submitAnswer: (playerId: string, index: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  socket: null,
  status: 'disconnected',

  // Dynamic data
  playersData: {},
  currentAudioUrl: null,
  previousAnswer: null,
  isFinished: false,
  errorMessage: null,
  revealed_tracks: null,
  revealedTracksMap: {},
  matchedTracks: {},
  gameSessionMetadata: null,

  // Actions
  connect: (gameId, playerId, access_token) => {
    if (get().status === 'connected' || get().status === 'connecting') return;

    set({ status: 'connecting' });

    let connect_url = `${WS_BASE}/game/${gameId}/${playerId}`;
    if (access_token) {
      connect_url += `?access_token=${access_token}`;
    }
    const ws = new WebSocket(connect_url);

    ws.onopen = () => {
      console.warn('Connected to the game server!');
      set({ status: 'connected', socket: ws });
    };

    ws.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data as string) as IncomingMessage;
        console.warn('Received message:', raw);

        if ('type' in raw && raw.type === 'error') {
          set({ errorMessage: raw.detail, status: 'error' });
          return;
        }

        const message = raw as ServerMessage;
        set((state) => {
          const tracksToAdd = Object.fromEntries(
            message.tracks_data?.map((track) => [track.track_id, track]) ?? [],
          );
          const wasLastMoveRejected =
            message.matched_tracks && state.playersData[message.player_id]
              ? JSON.stringify(
                  state.playersData[message.player_id].matchedTracks,
                ) === JSON.stringify(message.matched_tracks[message.player_id])
              : false;
          return {
            playersData: {
              ...state.playersData,
              [message.player_id]: {
                matchedTracks: message.matched_tracks[message.player_id],
                finished: message.finished,
              },
            },
            currentAudioUrl: message.current_song_audio_url,
            previousAnswer: wasLastMoveRejected ? 'incorrect' : 'correct',
            isFinished: message.finished || state.isFinished,
            revealedTracksMap: { ...state.revealedTracksMap, ...tracksToAdd },
            matchedTracks: message.matched_tracks || state.matchedTracks,
            gameSessionMetadata:
              message.game_session_metadata || state.gameSessionMetadata,
          };
        });
      } catch (error) {
        console.error('Error parsing WS message:', error);
      }
    };

    ws.onclose = () => {
      console.warn('Disconnected from the server.');
      set({ status: 'disconnected', socket: null });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      set({ status: 'error' });
    };
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
    }

    set({
      socket: null,
      status: 'disconnected',
      playersData: {},
      currentAudioUrl: null,
      previousAnswer: null,
      isFinished: false,
      errorMessage: null,
      revealedTracksMap: {},
      matchedTracks: {},
      gameSessionMetadata: null,
    });
  },

  submitAnswer: (playerId, index) => {
    const { socket, status } = get();

    if (socket && status === 'connected') {
      const message = {
        player_id: playerId,
        answer: index,
      };
      socket.send(JSON.stringify(message));
    } else {
      console.warn('Cannot send answer - no connection');
    }
  },
}));
