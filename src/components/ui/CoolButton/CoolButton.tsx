import styles from './CoolButton.module.css';

interface CoolButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | null;
}

export default function CoolButton({ children, ...props }: CoolButtonProps) {
  return (
    <div className="group relative h-full w-full">
      <div
        className={`${styles.gradient} absolute h-full w-full rounded-full opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100`}
      />
      <button
        className="font-impact bg-surface-mid group-hover:bg-surface-highlight border-accent text-secondary relative z-3 h-full w-full rounded-full border-2 p-3 text-3xl transition-all duration-300" {...props}
      >
        {children}
      </button>
    </div>
  );
}
