import { DndContext } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';

import AudioComponent from '@/components/game/AudioComponent/AudioComponent';
import CardRowComponent from '@/components/game/CardRowComponent/CardRowComponent';
import DrawnCardComponent from '@/components/game/DrawnCardComponent/DrawnCardComponent';
import RejectCardComponent from '@/components/game/RejectCardComponent/RejectCardComponent';
import ScoreComponent from '@/components/game/ScoreComponent/ScoreComponent';
import WaitingCardComponent from '@/components/game/WaitingCardComponent/WaitingCardComponent';
import { useGameStore } from '@/stores/game-store';

function getClientX(event: Event): number {
  if (event instanceof MouseEvent) return event.clientX;
  if (event instanceof PointerEvent) return event.clientX;
  if (event instanceof TouchEvent && event.touches.length > 0) {
    return event.touches[0].clientX;
  }
  return 0;
}

export default function Game() {
  const { gameId, playerId } = useParams();
  const [searchParams] = useSearchParams();
  const [dragX, setDragX] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [cardAnimation, setCardAnimation] = useState<
    'waiting' | 'rejected' | null
  >(null);
  const [cardPosition, setCardPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [drawnCard, setDrawnCard] = useState(false);
  const navigate = useNavigate();

  const {
    connect,
    disconnect,
    playersData,
    currentAudioUrl,
    previousAnswer,
    isFinished,
    submitAnswer,
    revealedTracksMap,
    matchedTracks,
    scores,
  } = useGameStore();

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    if (gameId && playerId) connect(gameId, playerId, access_token!);
    return () => disconnect();
  }, [gameId, playerId, connect, disconnect]);

  useEffect(() => {
    if (isFinished) {
      setDrawnCard(false);

      setCardAnimation(null);
      setCardPosition({ x: 0, y: 0 });
      setHoverIndex(null);
    }
  }, [isFinished]);

  useEffect(() => {
    if (currentAudioUrl) {
      setDrawnCard(true);
    }
    if (previousAnswer === 'incorrect') {
      setCardAnimation('rejected');
      setHoverIndex(null);

      const timeout = setTimeout(() => {
        setCardAnimation(null);
        setCardPosition({ x: 0, y: 0 });
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      setCardAnimation(null);
      setCardPosition({ x: 0, y: 0 });
    }
    setHoverIndex(null);
  }, [currentAudioUrl]);

  const opponentPlayerId = Object.keys(matchedTracks).find(
    (id) => String(id) !== String(playerId),
  );

  const myData = playerId ? playersData[playerId] : undefined;

  const handleDropAnswer = (index = 0) => {
    if (!playerId || drawnCard === false) return;
    console.log(opponentPlayerId);
    setDrawnCard(false);
    submitAnswer(playerId, index);
  };

  const handlePlayAgain = () => {
    void navigate('/registered-game');
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-8 py-8">
      <div className="w-full">
        <div className="absolute top-[30px] left-1/2 z-10 -translate-x-1/2">
          <ScoreComponent
            playerScore={playerId ? (scores[playerId] ?? 0) : 0}
            opponentScore={
              opponentPlayerId ? (scores[opponentPlayerId] ?? 0) : 0
            }
          />
        </div>

        <div className="pointer-events-none absolute top-[-30px] w-full scale-75 rotate-180">
          <CardRowComponent
            matchedTracks={matchedTracks[opponentPlayerId!] ?? []}
            revealedTracksMap={revealedTracksMap}
            dragX={null}
            hoverIndex={null}
            setHoverIndex={function () {
              return;
            }}
          />
        </div>

        <DndContext
          onDragMove={(event) => {
            setDragX(event.delta.x + getClientX(event.activatorEvent));
          }}
          onDragEnd={(event) => {
            if (hoverIndex === null || drawnCard === false) return;

            setCardPosition({
              x: event.delta.x,
              y: event.delta.y,
            });
            setCardAnimation('waiting');

            handleDropAnswer(hoverIndex);
            //setHoverIndex(null);
            setDragX(null);
          }}
        >
          <div className="absolute top-1/2 w-full -translate-y-1/2">
            <div className="border-secondary/30 absolute top-1/2 right-0 left-0 z-0 -translate-y-1/2 border-t-2 border-dashed" />

            <CardRowComponent
              matchedTracks={myData?.matchedTracks ?? []}
              revealedTracksMap={revealedTracksMap}
              dragX={dragX}
              hoverIndex={hoverIndex}
              setHoverIndex={setHoverIndex}
              animateDiscards
            />
          </div>

          {drawnCard && (
            <div className="flex justify-center">
              <DrawnCardComponent>
                <AudioComponent audioUrl={currentAudioUrl} />
              </DrawnCardComponent>
            </div>
          )}
          {cardAnimation === 'waiting' && (
            <WaitingCardComponent position={cardPosition} />
          )}
          {cardAnimation === 'rejected' && (
            <RejectCardComponent position={cardPosition} />
          )}
        </DndContext>
      </div>
      {isFinished && (
        <div className="absolute bottom-[100px] flex w-full flex-col items-center gap-3 sm:w-auto">
          <button
            className="bg-surface hover:bg-surface-mid text-primary w-full sm:w-auto"
            onClick={handlePlayAgain}
          >
            Play Again!
          </button>
          <button
            className="bg-surface hover:bg-surface-mid text-primary w-full sm:w-auto"
            onClick={() => void navigate('/')}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
