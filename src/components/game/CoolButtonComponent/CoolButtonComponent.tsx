import type { CoolButtonComponentProps } from '@/types/game';
import styles from './CoolButtonComponent.module.css';

export default function CoolButtonComponent({ children, ...props }: CoolButtonComponentProps) {
  return (
    <div className="group relative h-full w-full">
      <div
        className={`${styles.gradient} absolute h-full w-full rounded-full opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100`}
      />
      <button
        className="font-game-ui bg-game-ui-bg-mid group-hover:bg-game-ui-bg-highlight border-game-ui-accent text-game-ui-secondary relative z-3 h-full w-full rounded-full border-2 p-3 text-3xl transition-all duration-300" {...props}
      >
        {children}
      </button>
    </div>
  );
}
