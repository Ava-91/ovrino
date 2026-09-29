import { describe, expect, it } from 'vitest';
import { normalizeSpeechText, splitIntoSentences, wordCount } from './text-utils';

describe('text-utils', () => {
  it('normalizes whitespace without changing paragraph boundaries', () => {
    expect(normalizeSpeechText('  Hello   world.\n\n  Next line!  ')).toBe('Hello world.\nNext line!');
  });

  it('splits English and Persian sentence punctuation', () => {
    expect(splitIntoSentences('Hello world. How are you? خوب هستی!')).toEqual([
      'Hello world.',
      'How are you?',
      'خوب هستی!',
    ]);
  });

  it('returns no sentences for empty input', () => {
    expect(splitIntoSentences('   ')).toEqual([]);
  });

  it('counts normalized words', () => {
    expect(wordCount('  one   two\nthree ')).toBe(3);
  });
});
