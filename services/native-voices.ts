import * as Speech from 'expo-speech';

export type NativeVoice = {
  identifier: string;
  name: string;
  language: string;
  quality?: string;
  requiresNetwork?: boolean;
};

export type VoiceOption = {
  id: string;
  name: string;
  accent: string;
  language: string;
  gender: 'Female' | 'Male' | 'Neutral' | 'Unknown';
  age: 'Young' | 'Adult' | 'Mature' | 'Unknown';
  description: string;
  nativeVoiceId: string;
  nativeLanguage: string;
  available: true;
};

export type VoiceAvailability = {
  voiceId: string;
  nativeVoiceId?: string;
  available: boolean;
  language: string;
  displayName: string;
};

export async function getNativeVoices(): Promise<NativeVoice[]> {
  const voices = await Speech.getAvailableVoicesAsync();
  return voices.map((voice) => ({
    identifier: voice.identifier,
    name: voice.name,
    language: voice.language,
    quality: voice.quality,
    requiresNetwork: voice.requiresNetwork,
  }));
}

export function buildVoiceOptions(voices: NativeVoice[]): VoiceOption[] {
  return voices.map((voice) => {
    const language = normalizeLanguage(voice.language);
    const [base, region] = language.split('-');
    const accent = region ? `${base.toUpperCase()} (${region.toUpperCase()})` : base.toUpperCase();
    return { id: voice.identifier, name: voice.name, accent, language: voice.language, gender: 'Unknown', age: 'Unknown', description: `${voice.language}${voice.quality ? ` · ${voice.quality}` : ''}${voice.requiresNetwork ? ' · may require network' : ' · device voice'}`, nativeVoiceId: voice.identifier, nativeLanguage: voice.language, requiresNetwork: Boolean(voice.requiresNetwork), quality: voice.quality, available: true };
  });
}

export function normalizeLanguage(language: string): string {
  return language.trim().toLowerCase().replace('_', '-');
}

export function languageMatches(nativeLanguage: string, requestedLanguage: string): boolean {
  const native = normalizeLanguage(nativeLanguage);
  const requested = normalizeLanguage(requestedLanguage);
  return native === requested || native.startsWith(`${requested}-`) || requested.startsWith(`${native}-`);
}

export function chooseNativeVoice(
  voices: NativeVoice[],
  requestedLanguage: string,
  preferredIdentifier?: string,
): NativeVoice | undefined {
  if (preferredIdentifier) {
    const exact = voices.find((voice) => voice.identifier === preferredIdentifier);
    if (exact) return exact;
  }

  const languageMatchesList = voices.filter((voice) => languageMatches(voice.language, requestedLanguage));
  return languageMatchesList.find((voice) => voice.quality === 'Enhanced') ?? languageMatchesList[0];
}

export function buildAvailability(
  voiceId: string,
  displayName: string,
  requestedLanguage: string,
  nativeVoice?: NativeVoice,
): VoiceAvailability {
  return {
    voiceId,
    nativeVoiceId: nativeVoice?.identifier,
    available: Boolean(nativeVoice),
    language: nativeVoice?.language ?? requestedLanguage,
    displayName: nativeVoice?.name ?? displayName,
  };
}
