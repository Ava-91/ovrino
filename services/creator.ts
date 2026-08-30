export type CreatorTake = { id: string; index: number; text: string; status: 'pending' | 'current' | 'done' };

const MAX_TAKE_LENGTH = 420;

export function splitIntoTakes(script: string): CreatorTake[] {
  const normalized = script.trim();
  if (!normalized) return [];
  const sentences = normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [normalized];
  const chunks: string[] = [];
  let current = '';
  for (const sentence of sentences.map((value) => value.trim()).filter(Boolean)) {
    if (!current) { current = sentence; continue; }
    if (`${current} ${sentence}`.length <= MAX_TAKE_LENGTH) current += ` ${sentence}`;
    else { chunks.push(current); current = sentence; }
  }
  if (current) chunks.push(current);
  return chunks.map((text, index) => ({ id: `take-${index + 1}`, index, text, status: index === 0 ? 'current' : 'pending' }));
}
