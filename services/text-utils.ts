export function normalizeSpeechText(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]+([,.;:!?؟،؛])/g, '$1')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{2,}/g, '\n\n')
    .trim();
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
