import { MAX_REQUESTS_PER_WINDOW, MAX_TEXT_LENGTH, WINDOW_MS, type UsageSnapshot } from '../services/usage-limits';

export type GuardResult = { ok: true; snapshot: UsageSnapshot } | { ok: false; status: 400 | 429; code: 'INVALID_TEXT' | 'TEXT_TOO_LONG' | 'RATE_LIMITED'; retryAfterMs?: number; snapshot: UsageSnapshot };

/**
 * Provider-facing guard. Store the returned snapshot in a durable per-user or
 * per-IP store in the real backend; never rely on this in-memory shape as a
 * multi-instance rate limiter by itself.
 */
export function guardSpeechRequest(text: string, now: number, snapshot: UsageSnapshot): GuardResult {
  const normalized = text.trim();
  if (!normalized) return { ok: false, status: 400, code: 'INVALID_TEXT', snapshot };
  if (normalized.length > MAX_TEXT_LENGTH) return { ok: false, status: 400, code: 'TEXT_TOO_LONG', snapshot };
  const recent = snapshot.requestTimestamps.filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return { ok: false, status: 429, code: 'RATE_LIMITED', retryAfterMs: WINDOW_MS - (now - recent[0]), snapshot: { requestTimestamps: recent } };
  return { ok: true, snapshot: { requestTimestamps: [...recent, now] } };
}
