import CardComponent from '../CardComponent/CardComponent';

import type { SongCardProps } from '@/types/game';

export default function SongCardComponent({
  albumImage,
  year,
  title,
}: SongCardProps) {
  return (
    <div
      style={{
        rotate: `${([...(title ?? '')].reduce((a, b) => a * 7.5 + b.charCodeAt(0), 0) % 10) - 5}deg`,
      }}
    >
      <CardComponent>
        <div className="flex h-full flex-col items-center">
          <div className="mt-[15px] aspect-square w-4/5 overflow-hidden rounded-xl bg-slate-900">
            {albumImage ? (
              <img
                src={albumImage}
                alt={title ?? 'Album cover'}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="font-impact text-primary px-3 pt-3 text-center text-3xl leading-none">
            {year ?? '----'}
          </div>

          <div className="text-secondary px-3 pt-2 pb-3 text-center text-sm leading-tight font-bold break-words">
            {title ?? 'Unknown title'}
          </div>
        </div>
      </CardComponent>
    </div>
  );
}
