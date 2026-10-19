import type { ScoreProps } from '@/types/game';

export default function CardComponent({
  playerScore,
  opponentScore,
}: ScoreProps) {
  return (
    <div className="border-accent from-surface to-surface-mid flex h-[60px] w-[180px] flex-row items-center justify-center rounded-full border-3 bg-linear-to-t shadow-lg/50">
      <div className="font-impact text-secondary w-1/2 text-center text-3xl">
        {playerScore}
      </div>
      {opponentScore ? (
        <div className="font-impact text-secondary border-l-accent w-1/2 border-l-3 text-center text-3xl">
          {opponentScore}
        </div>
      ) : null}
    </div>
  );
}
