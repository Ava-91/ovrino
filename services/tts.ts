export type VoiceProfile = {
  id: string;
  name: string;
  accent: string;
  gender: string;
  language: string;
  nativeVoiceId?: string;
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

export interface TtsProvider {
  speak(request: SpeechRequest): Promise<SpeechResult>;
  stop(): Promise<void>;
}
