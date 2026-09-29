import { useCallback, useRef } from 'react';

export function useSpeechSession() {
  const sessionRef = useRef(0);

  const begin = useCallback(() => {
    sessionRef.current += 1;
    return sessionRef.current;
  }, []);

  const cancel = useCallback(() => {
    sessionRef.current += 1;
  }, []);

  const isCurrent = useCallback((session: number) => session === sessionRef.current, []);

  return { begin, cancel, isCurrent };
}
