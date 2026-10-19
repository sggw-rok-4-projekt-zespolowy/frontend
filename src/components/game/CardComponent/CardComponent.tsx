import type { CardComponentProps } from '@/types/game';

export default function CardComponent({ children }: CardComponentProps) {
  return (
    <div className="group from-game-ui-bg to-game-ui-bg-mid flex items-center justify-center rounded-2xl bg-linear-to-t p-1 shadow-lg/30">
      <div className="from-game-ui-bg-mid to-game-ui-bg-highlight absolute z-2 h-full w-full rounded-2xl bg-linear-to-t opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg/20" />
      <div className="border-game-ui-accent relative z-3 h-[260px] w-[180px] overflow-hidden rounded-xl border-3 bg-transparent">
        {children}
      </div>
    </div>
  );
}
