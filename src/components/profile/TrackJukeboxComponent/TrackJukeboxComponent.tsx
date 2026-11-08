import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

import SongCardComponent from '@/components/game/SongCardComponent/SongCardComponent';
import CoolButton from '@/components/ui/CoolButton/CoolButton';
import type { TrackPublic } from '@/types/game';

// Horizontal distance between neighbouring cards (px)
const CARD_SPACING = 170;
// How many cards are visible on each side of the selected one
const VISIBLE_SIDE_CARDS = 3;

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.79-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

interface TrackJukeboxComponentProps {
  tracks: TrackPublic[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

export default function TrackJukeboxComponent({
  tracks,
  selectedIndex,
  setSelectedIndex,
}: TrackJukeboxComponentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop the music when the selected song changes or the page is left
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      setIsPlaying(false);
    };
  }, [selectedIndex]);

  const togglePlay = (track: TrackPublic) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(track.preview_url);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    const audio = audioRef.current;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const previous = useCallback(
    () => setSelectedIndex((i) => Math.max(i - 1, 0)),
    [setSelectedIndex],
  );
  const next = useCallback(
    () => setSelectedIndex((i) => Math.min(i + 1, tracks.length - 1)),
    [setSelectedIndex, tracks.length],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Don't scroll the jukebox while the user is typing in a text field
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previous, next]);

  if (tracks.length === 0) {
    return <div className="text-primary text-xl">No songs in the database.</div>;
  }

  const selected = tracks[selectedIndex];

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="h-16 w-16 shrink-0">
          <CoolButton
            onClick={previous}
            disabled={selectedIndex === 0}
            aria-label="Previous song"
          >
            <span className="text-primary">‹</span>
          </CoolButton>
        </div>

        <div className="relative h-[340px] flex-1 overflow-hidden">
          {tracks.map((track, index) => {
            const offset = index - selectedIndex;
            const distance = Math.abs(offset);
            if (distance > VISIBLE_SIDE_CARDS) return null;

            return (
              <div
                key={track.track_id}
                onClick={() =>
                  offset === 0 ? togglePlay(track) : setSelectedIndex(index)
                }
                className="absolute top-1/2 left-1/2 cursor-pointer transition-all duration-500 ease-out"
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * CARD_SPACING}px) scale(${1 - distance * 0.15})`,
                  opacity: 1 - distance * 0.25,
                  zIndex: VISIBLE_SIDE_CARDS - distance,
                }}
              >
                <SongCardComponent
                  albumImage={track.image_url ?? undefined}
                  year={String(track.year)}
                  title={track.title}
                  overlay={
                    offset === 0 ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-white shadow-md">
                        {isPlaying ? <PlayIcon /> : <PauseIcon />}
                      </div>
                    ) : null
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="h-16 w-16 shrink-0">
          <CoolButton
            onClick={next}
            disabled={selectedIndex === tracks.length - 1}
            aria-label="Next song"
          >
            <span className="text-primary">›</span>
          </CoolButton>
        </div>
      </div>

      <div className="text-center">
        <div className="font-impact text-secondary text-2xl">
          {selected.artist ?? 'Unknown artist'}
        </div>
        <div className="text-primary text-sm">
          {selected.owner_id != null ? 'YOUR SONG · ' : ''}
          {selectedIndex + 1} / {tracks.length}
        </div>
      </div>
    </div>
  );
}
