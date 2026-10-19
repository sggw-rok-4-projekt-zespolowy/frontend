import Popup from '@/components/ui/Popup/Popup';

import styles from './PopupGlowing.module.css';

interface PopupGlowingProps {
  title?: string;
  children: React.ReactNode | null;
}

export default function PopupGlowing({
  title,
  children,
}: PopupGlowingProps) {
  return (
    <div className="group relative w-full">
      <div
        className={`${styles.gradient} absolute h-full w-full rounded-[2rem] blur-sm`}
      />
      <div className="relative z-5 w-full">
        <Popup title={title}>{children}</Popup>
      </div>
    </div>
  );
}
