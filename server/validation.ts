import type { SpeechRequest } from './types';

export const MAX_TEXT_LENGTH = 5000;
const MIN_RATE = 0.25;
const MAX_RATE = 2;
const MIN_PITCH = 0.5;
const MAX_PITCH = 2;

export function validateSpeechRequest(input: unknown): SpeechRequest {
  if (!input || typeof input !== 'object') {
    throw new Error('Request body must be a JSON object.');
  }

  const body = input as Record<string, unknown>;

  if (typeof body.text !== 'string' || !body.text.trim()) {
    throw new Error('Text is required.');
  }

  if (body.text.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text must be ${MAX_TEXT_LENGTH} characters or fewer.`);
  }

  if (typeof body.voiceId !== 'string' || !body.voiceId.trim()) {
    throw new Error('voiceId is required.');
  }

  const rawSettings = body.settings;
  const settings = rawSettings && typeof rawSettings === 'object'
    ? rawSettings as Record<string, unknown>
    : {};

  const rate = typeof settings.rate === 'number' ? settings.rate : 1;
  const pitch = typeof settings.pitch === 'number' ? settings.pitch : 1;
  const style = typeof settings.style === 'string' ? settings.style : undefined;

  if (rate < MIN_RATE || rate > MAX_RATE) {
    throw new Error(`rate must be between ${MIN_RATE} and ${MAX_RATE}.`);
  }

  if (pitch < MIN_PITCH || pitch > MAX_PITCH) {
    throw new Error(`pitch must be between ${MIN_PITCH} and ${MAX_PITCH}.`);
  }

  return {
    text: body.text.trim(),
    voiceId: body.voiceId.trim(),
    settings: { rate, pitch, ...(style ? { style } : {}) },
  };
}
