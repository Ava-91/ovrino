import { describe, expect, it } from 'vitest';
import { chooseNativeVoice } from './native-voices';

describe('native voice matching', () => {
  it('prefers an exact installed identifier', () => {
    const voices = [{ identifier: 'en-us-1', name: 'US', language: 'en-US', quality: 'Default' }, { identifier: 'en-gb-1', name: 'GB', language: 'en-GB', quality: 'Enhanced' }];
    expect(chooseNativeVoice(voices, 'en-US', 'en-us-1')?.identifier).toBe('en-us-1');
  });
  it('prefers Enhanced within the requested language', () => {
    const voices = [{ identifier: 'en-us-1', name: 'US', language: 'en-US', quality: 'Default' }, { identifier: 'en-us-2', name: 'US Enhanced', language: 'en-US', quality: 'Enhanced' }];
    expect(chooseNativeVoice(voices, 'en-US')?.identifier).toBe('en-us-2');
  });
  it('does not match unrelated languages', () => {
    const voices = [{ identifier: 'fa-1', name: 'Persian', language: 'fa-IR' }];
    expect(chooseNativeVoice(voices, 'en-US')).toBeUndefined();
  });
});
