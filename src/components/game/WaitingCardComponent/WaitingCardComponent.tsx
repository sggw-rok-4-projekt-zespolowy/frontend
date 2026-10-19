import CardComponent from '../CardComponent/CardComponent';

import type { WaitingCardProps } from '@/types/game';

const WaitingCardComponent = ({ position }: WaitingCardProps) => {
  return (
    <div
      className={`fixed bottom-[-70px] left-1/2 cursor-grab`}
      style={{
        transform: `translateX(-50%) translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <CardComponent>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="text-game-ui-secondary h-30 w-30 animate-spin">C</div>
        </div>
      </CardComponent>
    </div>
  );
};

export default WaitingCardComponent;
