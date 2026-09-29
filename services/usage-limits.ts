export const MAX_TEXT_LENGTH = 5000;

export type UsageDecision = { allowed: boolean; reason?: 'empty-text' | 'text-too-long' };

export function validateSpeechText(text: string): UsageDecision {
  const normalized = text.trim();
  if (!normalized) return { allowed: false, reason: 'empty-text' };
  if (normalized.length > MAX_TEXT_LENGTH) return { allowed: false, reason: 'text-too-long' };
  return { allowed: true };
}
