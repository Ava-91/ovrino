import { useCallback, useEffect, useState } from 'react';
import { buildVoiceOptions, getNativeVoices, type VoiceOption } from '../services/native-voices';

export function useDeviceVoices() {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setVoices(buildVoiceOptions(await getNativeVoices()));
    } catch {
      setVoices([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void reload(); }, [reload]);

  return { voices, loading, error, reload };
}
