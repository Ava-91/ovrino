export function normalizeSpeechText(text: string): string {
  const normalized = text
    .replace(/\r\n?/g, '\n')
    .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    .replace(/\n{3,}/g, '\n\n');

  return normalized
    .split('\n\n')
    .map((paragraph) =>
      paragraph
        .replace(/\n/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/[ \t]+([,.;:!?؟،؛])/g, '$1')
        .trim(),
    )
    .filter(Boolean)
    .join('\n\n');
}

export function splitIntoSentences(text: string): string[] {
  const normalized = normalizeSpeechText(text);
  if (!normalized) return [];

  return normalized
    .split(/(?<=[.!?؟؛。！？])\s+|\n{2,}/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function wordCount(text: string): number {
  return normalizeSpeechText(text).split(/\s+/).filter(Boolean).length;
}

export function chunkSpeechText(text: string, maxLength = 900): string[] {
  const normalized = normalizeSpeechText(text);
  if (!normalized) return [];
  const chunks: string[] = [];
  let current = '';
  const pieces = splitIntoSentences(normalized);
  for (const piece of pieces) {
    if (piece.length <= maxLength && (!current || current.length + 1 + piece.length <= maxLength)) {
      current = current ? `${current} ${piece}` : piece;
      continue;
    }
    if (current) { chunks.push(current); current = ''; }
    if (piece.length <= maxLength) { current = piece; continue; }
    let remainder = piece;
    while (remainder.length > maxLength) {
      let cut = remainder.lastIndexOf(' ', maxLength);
      if (cut < Math.floor(maxLength * 0.5)) cut = maxLength;
      chunks.push(remainder.slice(0, cut).trim());
      remainder = remainder.slice(cut).trim();
    }
    current = remainder;
  }
  if (current) chunks.push(current);
  return chunks.filter(Boolean);
}

export type DetectedTextLanguage = 'fa' | 'ar' | 'en' | 'mixed' | 'unknown';

export function detectTextLanguage(text: string): DetectedTextLanguage {
  const faSpecific = (text.match(/[پچژگک‌ی]/g) ?? []).length;
  const arabic = (text.match(/[ء-ي]/g) ?? []).length;
  const latin = (text.match(/[A-Za-z]/g) ?? []).length;
  if (faSpecific > 0) return latin > 0 ? 'mixed' : 'fa';
  if (arabic > 0) return latin > 0 ? 'mixed' : 'ar';
  if (latin > 0) return 'en';
  return 'unknown';
}

export function estimatedSpeechSeconds(text: string, rate = 1): number {
  const words = wordCount(text);
  return Math.round((words / 150) * 60 / Math.max(0.25, rate));
}
