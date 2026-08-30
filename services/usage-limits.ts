export const MAX_TEXT_LENGTH = 5000;
export const MAX_REQUESTS_PER_WINDOW = 20;
export const WINDOW_MS = 60 * 60 * 1000;

export type UsageSnapshot = { requestTimestamps: number[] };
export type UsageDecision = { allowed: boolean; reason?: 'empty-text' | 'text-too-long' | 'rate-limit'; retryAfterMs?: number };

export function validateSpeechText(text: string): UsageDecision {
  const normalized = text.trim();
  if (!normalized) return { allowed: false, reason: 'empty-text' };
  if (normalized.length > MAX_TEXT_LENGTH) return { allowed: false, reason: 'text-too-long' };
  return { allowed: true };
}

export function checkUsage(now: number, snapshot: UsageSnapshot): UsageDecision {
  const recent = snapshot.requestTimestamps.filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, reason: 'rate-limit', retryAfterMs: WINDOW_MS - (now - recent[0]) };
  }
  return { allowed: true };
}

export function recordUsage(now: number, snapshot: UsageSnapshot): UsageSnapshot {
  return { requestTimestamps: [...snapshot.requestTimestamps.filter((timestamp) => now - timestamp < WINDOW_MS), now] };
}
