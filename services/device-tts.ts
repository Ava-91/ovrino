import * as Speech from 'expo-speech';
import type { SpeechRequest, SpeechResult, TtsProvider } from './tts';

export class DeviceTtsProvider implements TtsProvider {
  async speak(request: SpeechRequest): Promise<SpeechResult> {
    await Speech.stop();

    const voices = await Speech.getAvailableVoicesAsync();
    const matchingVoice = voices.find((candidate) =>
      candidate.language.toLowerCase().startsWith(request.voice.language.toLowerCase()),
    );

    return new Promise((resolve, reject) => {
      Speech.speak(request.text, {
        voice: matchingVoice?.identifier,
        language: matchingVoice ? undefined : request.voice.language,
        rate: request.settings.rate,
        pitch: request.settings.pitch,
        onDone: () => resolve({ mode: 'device', voice: request.voice }),
        onStopped: () => resolve({ mode: 'device', voice: request.voice }),
        onError: reject,
      });
    });
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}
