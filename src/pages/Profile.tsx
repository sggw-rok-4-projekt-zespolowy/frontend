import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import AddTrackFormComponent from '@/components/profile/AddTrackFormComponent/AddTrackFormComponent';
import TrackJukeboxComponent from '@/components/profile/TrackJukeboxComponent/TrackJukeboxComponent';
import CoolButton from '@/components/ui/CoolButton/CoolButton';
import api from '@/services/api';
import type { TrackPublic } from '@/types/game';

export default function Profile() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<TrackPublic[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  // Shared songs first, then the songs added by this user
  useEffect(() => {
    Promise.all([
      api.get<TrackPublic[]>('/track'),
      api.get<TrackPublic[]>('/track/mine'),
    ])
      .then(([shared, mine]) => {
        setTracks([...shared.data, ...mine.data]);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  function handleAdded(track: TrackPublic) {
    setTracks((current) => [...current, track]);
    setSelectedIndex(tracks.length);
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="flex w-full max-w-5xl justify-center">
        {status === 'loading' && (
          <div className="text-primary text-xl">Loading songs...</div>
        )}
        {status === 'error' && (
          <div className="text-destructive text-xl">Could not load songs.</div>
        )}
        {status === 'ready' && (
          <TrackJukeboxComponent
            tracks={tracks}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </div>
      <div className="w-150 max-w-full">
        <AddTrackFormComponent onAdded={handleAdded} />
      </div>
      <div className="flex flex-col items-center w-150 max-w-full gap-5 p-15 pt-0 pb-10">
        <CoolButton
          onClick={function () {
            void navigate('/');
          }}
        >
          <span className="text-primary">
            BACK
          </span>
        </CoolButton>
      </div>
    </div>
  );
}
