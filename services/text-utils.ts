export function normalizeSpeechText(text: string): string {
  return text.replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/ *\n+ */g, '\n').trim();
}

export function splitIntoSentences(text: string): string[] {
  const normalized = normalizeSpeechText(text);
  if (!normalized) return [];

  return normalized
    .split(/(?<=[.!?。！？])\s+|\n+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function wordCount(text: string): number {
  return normalizeSpeechText(text).split(/\s+/).filter(Boolean).length;
}
