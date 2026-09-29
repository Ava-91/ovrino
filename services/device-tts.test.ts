import { beforeEach, describe, expect, it, vi } from 'vitest';

const speech = {
  stop: vi.fn().mockResolvedValue(undefined),
  speak: vi.fn((_text: string, options: { onDone?: () => void; onStopped?: () => void }) => options.onDone?.()),
};

vi.mock('expo-speech', () => speech);

import { DeviceTtsProvider } from './device-tts';

describe('DeviceTtsProvider', () => {
  beforeEach(() => { speech.stop.mockClear(); speech.speak.mockClear(); });

  it('uses the selected native voice without rediscovering voices', async () => {
    const provider = new DeviceTtsProvider();
    const result = await provider.speak({ text: 'Hello.', voice: { id: 'v', name: 'Voice', accent: 'EN (US)', language: 'en-US', nativeVoiceId: 'native-1' }, settings: { rate: 1, pitch: 1 } });
    expect(result.voice.nativeVoiceId).toBe('native-1');
    expect(speech.speak).toHaveBeenCalledWith('Hello.', expect.objectContaining({ voice: 'native-1' }));
  });

  it('reports an interrupted native speech result', async () => {
    speech.speak.mockImplementationOnce((_text: string, options: { onStopped?: () => void }) => options.onStopped?.());
    const provider = new DeviceTtsProvider();
    const result = await provider.speak({ text: 'Hello.', voice: { id: 'v', name: 'Voice', accent: 'EN (US)', language: 'en-US', nativeVoiceId: 'native-1' }, settings: { rate: 1, pitch: 1 } });
    expect(result.stopped).toBe(true);
  });
});
