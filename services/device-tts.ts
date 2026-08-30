import * as Speech from 'expo-speech';
import type { SpeechRequest, SpeechResult, TtsProvider } from './tts';

export class DeviceTtsProvider implements TtsProvider {
  async speak(request: SpeechRequest): Promise<SpeechResult> {
    await Speech.stop();

    const voices = await Speech.getAvailableVoicesAsync();
    const matchingVoice = voices.find((candidate) =>
      candidate.identifier.toLowerCase().includes(request.voice.language.toLowerCase()),
    );

    Speech.speak(request.text, {
      voice: matchingVoice?.identifier,
      rate: request.settings.rate,
      pitch: request.settings.pitch,
      onError: (error) => {
        throw error;
      },
    });

    return {
      mode: 'device',
      voice: request.voice,
    };
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}
