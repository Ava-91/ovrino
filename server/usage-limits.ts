export const MAX_TEXT_LENGTH = 5000;
export const MAX_REQUESTS_PER_WINDOW = 30;
export const WINDOW_MS = 60_000;

export type UsageSnapshot = {
  requestTimestamps: number[];
};
