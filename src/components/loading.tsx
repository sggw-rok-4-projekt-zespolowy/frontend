import Loader from "./ui/Loader/Loader";

export function Loading({
  header = 'Loading...',
  subheader = 'Please wait',
}: {
  header?: string;
  subheader?: string;
}) {
  return (
    <div className="bg-background/80 fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300">
      <div className="text-primary h-16 w-16"><Loader size={150}/></div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight">{header}</h2>
      <p className="text-muted mt-2">{subheader}</p>
    </div>
  );
}
