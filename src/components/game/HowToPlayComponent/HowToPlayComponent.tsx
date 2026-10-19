import Popup from '../../ui/Popup/Popup';

import type { HowToPlayProps } from '@/types/game';

export default function HowToPlayComponent({ onClick }: HowToPlayProps) {
  return (
    <Popup title="How to play?">
      <div className="flex w-full flex-col">
        <div className="p-[20px] pl-[35px]">
          <ul className="list-outside list-disc space-y-3">
            <li>
              A random song card will be drawn and you'll hear a 30-second clip
              of the track
            </li>
            <li>
              Listen to the track and try to guess the song's release year
            </li>
            <li>
              You'll see a timeline showing previously placed songs (one song is
              already placed at the start, with its year revealed)
            </li>
            <li>
              Drag and drop the new song card where you think it belongs on the
              timeline
            </li>
            <li>
              Correct guesses will be added to the timeline, incorrect guesses
              will be discarded
            </li>
            <li>Keep going and try to build the longest timeline!</li>
          </ul>
        </div>
        <div className="p-[10px] text-center">
          <button
            className="bg-surface-mid hover:bg-surface-highlight border-accent text-secondary w-[200px] rounded-full border-2 p-3 text-xl font-bold transition-all duration-300"
            onClick={onClick}
          >
            Play!
          </button>
        </div>
      </div>
    </Popup>
  );
}
