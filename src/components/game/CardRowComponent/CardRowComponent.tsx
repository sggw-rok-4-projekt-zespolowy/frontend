import { useDroppable } from '@dnd-kit/core';
import { useRef, useEffect, type Dispatch, type SetStateAction } from 'react';

import { type TrackPrivate, type TrackPublic } from '@/types/game';

import SongCardComponent from '../SongCardComponent/SongCardComponent';

interface CardRowComponentProps {
  matchedTracks: TrackPrivate[];
  revealedTracksMap: Record<number, TrackPublic>;
  dragX: number | null;
  hoverIndex: number | null;
  setHoverIndex: Dispatch<SetStateAction<number | null>>;
}

const CardRowComponent = ({
  matchedTracks,
  revealedTracksMap,
  dragX,
  hoverIndex,
  setHoverIndex,
}: CardRowComponentProps) => {
  const { setNodeRef } = useDroppable({ id: 'card-row' });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Only render tracks that are confirmed correct (present in revealedTracksMap)
  const visibleTracks = matchedTracks.filter(
    (t) => t.track_id in revealedTracksMap,
  );

  useEffect(() => {
    if (dragX === null) return;

    const positions = cardRefs.current.map((el) => el?.getBoundingClientRect());

    for (let i = 0; i < positions.length; i++) {
      const rect = positions[i];
      if (!rect) continue;

      const center = rect.left + rect.width / 2;

      if (dragX < center) {
        setHoverIndex(i);
        return;
      }
    }

    setHoverIndex(positions.length);
  }, [dragX, visibleTracks, setHoverIndex]);

  return (
    <div ref={setNodeRef} className="flex justify-center gap-[12px]">
      {visibleTracks.map((track, index) => {
        const revealed = revealedTracksMap[track.track_id];
        const shift = hoverIndex === null ? 0 : index >= hoverIndex ? 60 : -60;

        return (
          <div
            key={track.track_id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={{
              transform: `translate(${shift}px)`,
              transition: 'transform 0.15s ease',
            }}
          >
            <SongCardComponent
              albumImage={revealed.image_url ?? undefined}
              year={String(revealed.year)}
              title={revealed.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardRowComponent;
