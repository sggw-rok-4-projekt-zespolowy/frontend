import { useDroppable } from '@dnd-kit/core';
import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { type TrackPrivate, type TrackPublic } from '@/types/game';

import DiscardCardComponent from '../DiscardCardComponent/DiscardCardComponent';
import SongCardComponent from '../SongCardComponent/SongCardComponent';

interface CardRowComponentProps {
  matchedTracks: TrackPrivate[];
  revealedTracksMap: Record<number, TrackPublic>;
  dragX: number | null;
  hoverIndex: number | null;
  setHoverIndex: Dispatch<SetStateAction<number | null>>;
  // Animate cards that the server removed from a full board
  animateDiscards?: boolean;
}

interface DiscardedCard {
  track: TrackPublic;
  position: { left: number; top: number };
}

const CardRowComponent = ({
  matchedTracks,
  revealedTracksMap,
  dragX,
  hoverIndex,
  setHoverIndex,
  animateDiscards = false,
}: CardRowComponentProps) => {
  const { setNodeRef } = useDroppable({ id: 'card-row' });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Map keeps the track IDs as they are (they are UUID strings from the server)
  const cardRectsRef = useRef<Map<TrackPrivate['track_id'], DOMRect>>(new Map());
  const [discardedCards, setDiscardedCards] = useState<DiscardedCard[]>([]);

  // Only render tracks that are confirmed correct (present in revealedTracksMap)
  const visibleTracks = matchedTracks.filter(
    (t) => t.track_id in revealedTracksMap,
  );
  const visibleIdsKey = visibleTracks.map((t) => t.track_id).join(',');

  // Find cards that disappeared since the last board update and remember
  // where every current card is, so the next removed one can fly from there
  useLayoutEffect(() => {
    const currentIds = new Set(visibleTracks.map((t) => t.track_id));
    const previousRects = cardRectsRef.current;
    const removedIds = [...previousRects.keys()].filter(
      (id) => !currentIds.has(id),
    );

    // A cleared board (e.g. game reset) is not a discard
    if (animateDiscards && currentIds.size > 0 && removedIds.length > 0) {
      setDiscardedCards((current) => [
        ...current,
        ...removedIds
          .filter((id) => id in revealedTracksMap)
          .map((id) => ({
            track: revealedTracksMap[id],
            position: {
              left: previousRects.get(id)!.left,
              top: previousRects.get(id)!.top,
            },
          })),
      ]);
    }

    const rects = new Map<TrackPrivate['track_id'], DOMRect>();
    visibleTracks.forEach((track, index) => {
      const el = cardRefs.current[index];
      if (el) rects.set(track.track_id, el.getBoundingClientRect());
    });
    cardRectsRef.current = rects;
  }, [visibleIdsKey]);

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
      {discardedCards.map((card) => (
        <DiscardCardComponent
          key={card.track.track_id}
          track={card.track}
          position={card.position}
          onDone={() =>
            setDiscardedCards((current) =>
              current.filter((c) => c.track.track_id !== card.track.track_id),
            )
          }
        />
      ))}
    </div>
  );
};

export default CardRowComponent;
