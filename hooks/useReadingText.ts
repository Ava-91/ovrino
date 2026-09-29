import { useMemo } from 'react';
import { normalizeSpeechText, splitIntoSentences } from '../services/text-utils';

export function useReadingText(text: string) {
  const normalized = useMemo(() => normalizeSpeechText(text), [text]);
  const sentences = useMemo(() => splitIntoSentences(normalized), [normalized]);
  const paragraphs = useMemo(() => normalized.split(/\n{2,}/).map((paragraph) => splitIntoSentences(paragraph)).filter((paragraph) => paragraph.length > 0), [normalized]);
  const paragraphStarts = useMemo(
    () => paragraphs.reduce<number[]>((starts, paragraph, index) => {
      starts.push(index === 0 ? 0 : starts[index - 1] + paragraphs[index - 1].length);
      return starts;
    }, []),
    [paragraphs],
  );

  const getParagraphIndex = (sentenceIndex: number) => Math.max(
    0,
    paragraphStarts.findIndex((start, index) => sentenceIndex < start + paragraphs[index].length),
  );

  return { sentences, paragraphs, paragraphStarts, getParagraphIndex };
}
