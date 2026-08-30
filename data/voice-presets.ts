export type VoicePreset = {
  id: string;
  name: string;
  description: string;
  rate: number;
  pitch: number;
};

export const VOICE_PRESETS: VoicePreset[] = [
  { id: 'casual', name: 'Casual', description: 'Natural everyday listening.', rate: 1, pitch: 1 },
  { id: 'learning', name: 'Learning', description: 'Slower and easier to follow.', rate: 0.72, pitch: 1 },
  { id: 'narration', name: 'Narration', description: 'Measured and comfortable.', rate: 0.9, pitch: 0.98 },
  { id: 'story', name: 'Story', description: 'A slightly more expressive delivery.', rate: 0.86, pitch: 1.05 },
];
