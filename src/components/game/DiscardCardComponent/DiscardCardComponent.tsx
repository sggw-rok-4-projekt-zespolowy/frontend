import { createPortal } from 'react-dom';

import styles from './DiscardCardComponent.module.css';
import SongCardComponent from '../SongCardComponent/SongCardComponent';

import type { TrackPublic } from '@/types/game';

interface DiscardCardProps {
  track: TrackPublic;
  // Where the card was on the screen before it was removed from the board
  position: { left: number; top: number };
  onDone: () => void;
}

const DiscardCardComponent = ({ track, position, onDone }: DiscardCardProps) => {
  // Rendered into <body> so transformed parents don't break `position: fixed`
  return createPortal(
    <div
      className={styles.container}
      style={{ left: position.left, top: position.top }}
    >
      <div className={styles.animation} onAnimationEnd={onDone}>
        <SongCardComponent
          albumImage={track.image_url ?? undefined}
          year={String(track.year)}
          title={track.title}
        />
      </div>
    </div>,
    document.body,
  );
};

export default DiscardCardComponent;
