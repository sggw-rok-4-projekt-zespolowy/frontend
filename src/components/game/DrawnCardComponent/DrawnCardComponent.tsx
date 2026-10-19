import { useDraggable } from '@dnd-kit/core';

import CardComponent from '../CardComponent/CardComponent';

import type { DrawnCardProps } from '@/types/game';

const DrawnCardComponent = ({ children }: DrawnCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `drawn-card`,
  });

  const style = {
    transform: transform
      ? `translateX(-50%) translate(${transform.x}px, ${transform.y}px)`
      : 'translateX(-50%)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="fixed bottom-[-70px] left-1/2 cursor-grab"
    >
      <div className="transition-all duration-200 hover:scale-105">
        <CardComponent>
          <div className="pt-[60px]">{children}</div>
        </CardComponent>
      </div>
    </div>
  );
};

export default DrawnCardComponent;
