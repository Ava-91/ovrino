export type VoiceOption = {
  id: string;
  name: string;
  accent: string;
  language: string;
  gender: 'Female' | 'Male' | 'Neutral' | 'Unknown';
  age: 'Young' | 'Adult' | 'Mature' | 'Unknown';
  description: string;
  nativeVoiceId?: string;
  nativeLanguage?: string;
  available?: boolean;
};

// These are product profiles, not promises about what a device can synthesize.
// Native identifiers are discovered at runtime and attached to these profiles.
export const VOICES: VoiceOption[] = [
  { id: 'american', name: 'American', accent: 'American', language: 'English', gender: 'Unknown', age: 'Unknown', description: 'English voice matched to an available American English locale.', nativeLanguage: 'en-US' },
  { id: 'british', name: 'British', accent: 'British', language: 'English', gender: 'Unknown', age: 'Unknown', description: 'English voice matched to an available British English locale.', nativeLanguage: 'en-GB' },
  { id: 'indian', name: 'Indian', accent: 'Indian', language: 'English', gender: 'Unknown', age: 'Unknown', description: 'English voice matched to an available Indian English locale.', nativeLanguage: 'en-IN' },
  { id: 'australian', name: 'Australian', accent: 'Australian', language: 'English', gender: 'Unknown', age: 'Unknown', description: 'English voice matched to an available Australian English locale.', nativeLanguage: 'en-AU' },
  { id: 'canadian', name: 'Canadian', accent: 'Canadian', language: 'English', gender: 'Unknown', age: 'Unknown', description: 'English voice matched to an available Canadian English locale.', nativeLanguage: 'en-CA' },
  { id: 'russian-accent', name: 'Russian English', accent: 'Russian', language: 'English', gender: 'Unknown', age: 'Unknown', description: 'An English voice with Russian accent is only shown when a compatible provider exposes one.', nativeLanguage: 'en' },
];
