interface PopupProps {
  title?: string;
  children: React.ReactNode | null;
}

export default function Popup({
  title,
  children,
}: PopupProps) {
  return (
    <div className="from-surface to-surface-mid border-accent w-full overflow-hidden rounded-[2rem] border-3 bg-linear-to-t">
      {title && (
        <div className="border-b-accent flex h-[80px] w-full flex-row items-center justify-center border-b-2">
          <div className="font-impact text-primary text-secondary px-[15px] text-center text-4xl">
            {title}
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
