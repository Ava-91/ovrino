import * as Speech from 'expo-speech';
import { chunkSpeechText } from './text-utils';
import type { SpeechRequest, SpeechResult, TtsProvider } from './tts';

function requestedLocale(request: SpeechRequest): string {
  return request.voice.language;
}


export class DeviceTtsProvider implements TtsProvider {
  async speak(request: SpeechRequest): Promise<SpeechResult> {
    await Speech.stop();
    const locale = requestedLocale(request);
    const matchingVoice = request.voice.nativeVoiceId ? { identifier: request.voice.nativeVoiceId, name: request.voice.name, language: request.voice.language } : undefined;

    const chunks = chunkSpeechText(request.text);
    let stopped = false;
    const voice = { ...request.voice, nativeVoiceId: matchingVoice?.identifier, language: matchingVoice?.language ?? locale };
    for (const chunk of chunks) {
      if (stopped) break;
      const result = await new Promise<{ stopped: boolean }>((resolve, reject) => {
        Speech.speak(chunk, {
          voice: matchingVoice?.identifier,
          language: matchingVoice ? undefined : locale,
          rate: Math.min(2, Math.max(0.25, request.settings.rate)),
          pitch: Math.min(1.5, Math.max(0.5, request.settings.pitch)),
          onDone: () => resolve({ stopped: false }),
          onStopped: () => resolve({ stopped: true }),
          onError: reject,
        });
      });
      stopped = result.stopped;
    }
    return { mode: 'device', voice, stopped };
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}
