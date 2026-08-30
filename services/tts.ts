export type VoiceProfile = {
  id: string;
  name: string;
  accent: string;
  gender: string;
  language: string;
};

export type SpeechSettings = {
  rate: number;
  pitch: number;
};

export type SpeechRequest = {
  text: string;
  voice: VoiceProfile;
  settings: SpeechSettings;
};

export type SpeechResult = {
  mode: 'device';
  voice: VoiceProfile;
};

/**
 * Device TTS is the first provider adapter. Keeping it behind this interface
 * means the UI does not need to know whether speech comes from the phone or
 * from Ovrino's future server-side provider.
 */
export interface TtsProvider {
  speak(request: SpeechRequest): Promise<SpeechResult>;
  stop(): Promise<void>;
}
