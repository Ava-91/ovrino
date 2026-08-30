export type VoiceOption = {
  id: string;
  name: string;
  accent: string;
  language: string;
  gender: 'Female' | 'Male' | 'Neutral';
  age: 'Young' | 'Adult' | 'Mature';
  description: string;
};

export const VOICES: VoiceOption[] = [
  {
    id: 'american-female',
    name: 'American',
    accent: 'American',
    language: 'English',
    gender: 'Female',
    age: 'Adult',
    description: 'Clear everyday American English.',
  },
  {
    id: 'british-male',
    name: 'British',
    accent: 'British',
    language: 'English',
    gender: 'Male',
    age: 'Adult',
    description: 'Crisp British English with a calm tone.',
  },
  {
    id: 'indian-female',
    name: 'Indian',
    accent: 'Indian',
    language: 'English',
    gender: 'Female',
    age: 'Young',
    description: 'Natural Indian English pronunciation.',
  },
  {
    id: 'australian-male',
    name: 'Australian',
    accent: 'Australian',
    language: 'English',
    gender: 'Male',
    age: 'Adult',
    description: 'Relaxed Australian English.',
  },
  {
    id: 'canadian-female',
    name: 'Canadian',
    accent: 'Canadian',
    language: 'English',
    gender: 'Female',
    age: 'Adult',
    description: 'Neutral Canadian English.',
  },
  {
    id: 'russian-male',
    name: 'Russian',
    accent: 'Russian',
    language: 'English',
    gender: 'Male',
    age: 'Mature',
    description: 'English spoken with a Russian accent.',
  },
];
