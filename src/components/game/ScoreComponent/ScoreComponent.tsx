import type { ScoreProps } from '@/types/game';

export default function CardComponent({
  playerScore,
  opponentScore,
}: ScoreProps) {
  return (
    <div className="border-game-ui-accent from-game-ui-bg to-game-ui-bg-mid flex h-[60px] w-[180px] flex-row items-center justify-center rounded-full border-3 bg-linear-to-t shadow-lg/50">
      <div className="font-game-ui text-game-ui-secondary w-1/2 text-center text-3xl">
        {playerScore}
      </div>
      {opponentScore ? (
        <div className="font-game-ui text-game-ui-secondary border-l-game-ui-accent w-1/2 border-l-3 text-center text-3xl">
          {opponentScore}
        </div>
      ) : null}
    </div>
  );
}
