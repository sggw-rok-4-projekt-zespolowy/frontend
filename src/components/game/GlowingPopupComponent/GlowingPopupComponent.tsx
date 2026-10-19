import PopupComponent from '@/components/game/PopupComponent/PopupComponent';

import styles from './GlowingPopupComponent.module.css';

import type { GlowingPopupComponentProps } from '@/types/game';

export default function GlowingPopupComponent({
  title,
  children,
}: GlowingPopupComponentProps) {
  return (
    <div className="group relative w-full">
      <div
        className={`${styles.gradient} absolute h-full w-full rounded-[2rem] blur-sm`}
      />
      <div className="relative z-5 w-full">
        <PopupComponent title={title}>{children}</PopupComponent>
      </div>
    </div>
  );
}
