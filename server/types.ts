export type SpeechSettings = {
  rate?: number;
  pitch?: number;
  style?: string;
};

export type SpeechRequest = {
  text: string;
  voiceId: string;
  settings?: SpeechSettings;
};

export type SpeechResponse = {
  audioUrl: string;
  provider: string;
  voiceId: string;
};

export type ProviderSpeechRequest = {
  text: string;
  voiceId: string;
  settings: SpeechSettings;
};

export interface SpeechProvider {
  readonly name: string;
  synthesize(request: ProviderSpeechRequest): Promise<SpeechResponse>;
}
