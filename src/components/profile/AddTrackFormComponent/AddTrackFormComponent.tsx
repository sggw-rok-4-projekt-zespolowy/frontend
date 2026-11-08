import axios from 'axios';
import { useState, type SubmitEvent } from 'react';

import CoolButton from '@/components/ui/CoolButton/CoolButton';
import api from '@/services/api';
import type { TrackPublic } from '@/types/game';

interface AddTrackFormComponentProps {
  onAdded: (track: TrackPublic) => void;
}

// Accepts a bare Deezer track ID or a link such as https://www.deezer.com/pl/track/3135556
function parseDeezerTrackId(input: string): string | null {
  const value = input.trim();
  if (/^\d+$/.test(value)) return value;
  const match = /deezer\.com\/(?:[a-z]{2}\/)?track\/(\d+)/i.exec(value);
  return match ? match[1] : null;
}

export default function AddTrackFormComponent({
  onAdded,
}: AddTrackFormComponentProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const deezerTrackId = parseDeezerTrackId(value);
    if (!deezerTrackId) {
      setError('Paste a Deezer track link or a numeric track ID.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post<TrackPublic>('/track/mine', {
        deezer_track_id: deezerTrackId,
      });
      setValue('');
      onAdded(response.data);
    } catch (err) {
      const detail = axios.isAxiosError<{ detail?: string }>(err)
        ? err.response?.data?.detail
        : undefined;
      setError(detail ?? 'Could not add the song. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <label htmlFor="deezer-track" className="font-impact text-secondary text-xl">
        Add your own song
      </label>
      <div className="flex items-center gap-3">
        <input
          id="deezer-track"
          type="text"
          placeholder="https://www.deezer.com/track/3135556"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={isSubmitting}
          className="border-accent w-0 min-w-0 flex-1 rounded-full border-2 bg-transparent px-4 py-2"
        />
        <div className="h-12 w-32 shrink-0">
          <CoolButton type="submit" disabled={isSubmitting}>
            <span className="text-primary text-xl">
              {isSubmitting ? 'ADDING...' : 'ADD'}
            </span>
          </CoolButton>
        </div>
      </div>
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
          {error}
        </div>
      )}
    </form>
  );
}
