import styles from './RejectCardComponent.module.css';
import CardComponent from '../CardComponent/CardComponent';

import type { RejectCardProps } from '@/types/game';

const RejectCardComponent = ({ position }: RejectCardProps) => {
  return (
    <div
      className={`fixed bottom-[-70px] left-1/2 cursor-grab`}
      style={{
        transform: `translateX(-50%) translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className={styles.animation}>
        <CardComponent>
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-accent text-9xl font-extrabold">X</div>
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

export default RejectCardComponent;
