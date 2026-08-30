# Sharing

Ovrino exposes a native share action for the generated transcript today.

## Why text first?

The current device TTS adapter speaks directly through the operating system and does not return an audio file. Sharing a fake or inaccessible audio path would be misleading.

The sharing service therefore has two boundaries:

- `shareSpeechText()` — available now
- `ShareableAudio` — the contract for future provider-generated audio

When the production TTS provider returns an audio URI, the same share surface can be extended to share the actual file.
