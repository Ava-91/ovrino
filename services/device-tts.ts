import * as Speech from 'expo-speech';
import { chooseNativeVoice, getNativeVoices } from './native-voices';
import type { SpeechRequest, SpeechResult, TtsProvider } from './tts';

const PRODUCT_LOCALE: Record<string, string> = {
  American: 'en-US',
  British: 'en-GB',
  Indian: 'en-IN',
  Australian: 'en-AU',
  Canadian: 'en-CA',
  Russian: 'en',
};

function requestedLocale(request: SpeechRequest): string {
  return PRODUCT_LOCALE[request.voice.accent] ?? request.voice.language;
}

export class DeviceTtsProvider implements TtsProvider {
  async speak(request: SpeechRequest): Promise<SpeechResult> {
    await Speech.stop();
    const voices = await getNativeVoices();
    const locale = requestedLocale(request);
    const matchingVoice = chooseNativeVoice(voices, locale, request.voice.nativeVoiceId);

    return new Promise((resolve, reject) => {
      Speech.speak(request.text, {
        voice: matchingVoice?.identifier,
        language: matchingVoice ? undefined : locale,
        rate: Math.min(2, Math.max(0.25, request.settings.rate)),
        pitch: Math.min(1.5, Math.max(0.5, request.settings.pitch)),
        onDone: () => resolve({ mode: 'device', voice: { ...request.voice, nativeVoiceId: matchingVoice?.identifier, language: matchingVoice?.language ?? locale } }),
        onStopped: () => resolve({ mode: 'device', voice: { ...request.voice, nativeVoiceId: matchingVoice?.identifier, language: matchingVoice?.language ?? locale } }),
        onError: reject,
      });
    });
  }

  async stop(): Promise<void> {
    await Speech.stop();
  }
}
