import type { PopupComponentProps } from '@/types/game';

export default function PopupComponent({
  title,
  children,
}: PopupComponentProps) {
  return (
    <div className="from-game-ui-bg to-game-ui-bg-mid border-game-ui-accent w-full overflow-hidden rounded-[2rem] border-3 bg-linear-to-t">
      {title && (
        <div className="border-b-game-ui-accent flex h-[80px] w-full flex-row items-center justify-center border-b-2">
          <div className="font-game-ui text-game-ui-primary text-game-ui-secondary px-[15px] text-center text-4xl">
            {title}
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
