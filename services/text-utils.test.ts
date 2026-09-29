import { describe, expect, it } from 'vitest';
import { chunkSpeechText, normalizeSpeechText, splitIntoSentences, wordCount } from './text-utils';

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


describe('chunkSpeechText', () => {
  it('keeps short text in one chunk', () => expect(chunkSpeechText('Hello world.')).toEqual(['Hello world.']));
  it('splits long text without exceeding the requested size', () => {
    const chunks = chunkSpeechText('one two three four five six seven eight nine ten', 20);
    expect(chunks.every((chunk) => chunk.length <= 20)).toBe(true);
    expect(chunks.join(' ')).toBe('one two three four five six seven eight nine ten');
  });
});
