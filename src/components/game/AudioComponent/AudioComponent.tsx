import { useRef, useState, useEffect } from 'react';

import styles from './AudioComponent.module.css';

import type { AudioProps } from '@/types/game';

const AudioComponent = ({ audioUrl }: AudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <audio
        ref={audioRef}
        key={audioUrl && audioUrl.length > 0 ? audioUrl : 'no-audio'}
        src={audioUrl && audioUrl.length > 0 ? audioUrl : undefined}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex items-center justify-center">
        {isPlaying ? (
          <div className="flex items-center gap-3">
            <span className={styles.bar} />
            <span className={styles.bar} style={{ animationDelay: '0.2s' }} />
            <span className={styles.bar} style={{ animationDelay: '0.4s' }} />
            <span className={styles.bar} style={{ animationDelay: '0.6s' }} />
            <span className={styles.bar} style={{ animationDelay: '0.8s' }} />
          </div>
        ) : (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toggleAudio();
            }}
          >
            <div className="border-l-secondary h-0 w-0 cursor-pointer border-y-[40px] border-l-[70px] border-y-transparent" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioComponent;
