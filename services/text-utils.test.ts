import { describe, expect, it } from 'vitest';
import { chunkSpeechText, detectTextLanguage, estimatedSpeechSeconds, normalizeSpeechText, splitIntoSentences, wordCount } from './text-utils';

describe('text-utils', () => {
  it('normalizes whitespace without changing paragraph boundaries', () => {
    expect(normalizeSpeechText('  Hello   world.\n\n  Next line!  ')).toBe('Hello world.\n\nNext line!');
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

  it('cleans Unicode whitespace and spaces before punctuation', () => {
    expect(normalizeSpeechText('Hello\u00A0 world  !\n\n\n Next  line')).toBe('Hello world!\n\nNext line');
  });

  it('preserves paragraph boundaries while cleaning line whitespace', () => {
    expect(normalizeSpeechText('First\n\n\nSecond')).toBe('First\n\nSecond');
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

describe('detectTextLanguage', () => {
  it('detects Persian text', () => expect(detectTextLanguage('سلام دنیا')).toBe('fa'));
  it('detects Arabic text', () => expect(detectTextLanguage('مرحبا بالعالم')).toBe('ar'));
  it('detects English text', () => expect(detectTextLanguage('Hello world')).toBe('en'));
  it('uses mixed fallback for Persian and Latin text', () => expect(detectTextLanguage('سلام world')).toBe('mixed'));
});

describe('Persian sentence punctuation', () => {
  it('splits on Persian question marks', () => expect(splitIntoSentences('حالت چطوره؟ خوبم.')).toEqual(['حالت چطوره؟', 'خوبم.']));
  it('splits on Arabic semicolons', () => expect(splitIntoSentences('اول؛ دوم.')).toEqual(['اول؛', 'دوم.']));
});

describe('estimatedSpeechSeconds', () => {
  it('estimates from normalized word count and rate', () => expect(estimatedSpeechSeconds('one two three', 1)).toBe(1));
  it('gets shorter as speech rate increases', () => expect(estimatedSpeechSeconds('one '.repeat(150), 2)).toBe(30));
});
