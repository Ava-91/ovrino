import * as Speech from 'expo-speech';
import { chooseNativeVoice, getNativeVoices } from './native-voices';
import type { SpeechRequest, SpeechResult, TtsProvider } from './tts';

export class DeviceTtsProvider implements TtsProvider {
  async speak(request: SpeechRequest): Promise<SpeechResult> {
    await Speech.stop();

    const voices = await getNativeVoices();
    const matchingVoice = chooseNativeVoice(voices, request.voice.language, request.voice.nativeVoiceId);

    return new Promise((resolve, reject) => {
      Speech.speak(request.text, {
        voice: matchingVoice?.identifier,
        language: matchingVoice ? undefined : request.voice.language,
        rate: request.settings.rate,
        pitch: request.settings.pitch,
        onDone: () => resolve({ mode: 'device', voice: { ...request.voice, nativeVoiceId: matchingVoice?.identifier } }),
        onStopped: () => resolve({ mode: 'device', voice: { ...request.voice, nativeVoiceId: matchingVoice?.identifier } }),
        onError: reject,
      });
    });
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}
