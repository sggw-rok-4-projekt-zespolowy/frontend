export interface CardComponentProps {
  children: React.ReactNode | null;
}

export interface SongCardProps {
  albumImage?: string;
  year?: string;
  title?: string;
}

export interface DrawnCardProps {
  children: React.ReactNode | null;
}

export interface RejectCardProps {
  position: {
    x: number;
    y: number;
  };
}

export interface WaitingCardProps {
  position: {
    x: number;
    y: number;
  };
}

export interface AudioProps {
  audioUrl: string | null;
}

export interface CardRowProps {
  cardOrder: number[];
  dragX: number | null;
  hoverIndex: number | null;
  setHoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface GameSessionMetadata {
  session_id: string;
  variant: 'SINGLE' | 'DUEL';
  status: 'WAITING' | 'PLAYING' | 'FINISHED';
  players_ids: string[];
  registered: boolean;
  seconds_per_round: number;
  rounds: number;
}

export interface ScoreProps {
  playerScore: number;
  opponentScore?: number;
}

export interface HowToPlayProps {
  onClick: () => void;
}

export interface TrackPrivate {
  track_id: number;
}

export interface TrackPublic {
  track_id: number;
  artist: string | null;
  album_title: string | null;
  genre: string | null;
  year: number;
  preview_url: string;
  image_url: string | null;
  title: string;
}

export interface ServerMessage {
  player_id: string;
  finished: boolean;
  current_song_audio_url: string | null;
  tracks_data: TrackPublic[] | null;
  matched_tracks: Record<string, TrackPrivate[]>;
  game_session_metadata: GameSessionMetadata;
}

export interface ErrorMessage {
  type: 'error';
  detail: string;
}

export type IncomingMessage = ServerMessage | ErrorMessage;

export interface PlayerData {
  matchedTracks: TrackPrivate[];
  finished: boolean;
}
