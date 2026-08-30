# Voice System

Ovrino is designed around a broad voice system rather than a single default narrator.

## Voice dimensions

A voice may have metadata such as:

- Accent/language
- Gender
- Age or character category
- Style
- Expressiveness
- Supported controls

The exact available values will depend on the selected TTS provider.

## Provider abstraction

The UI should consume a normalized voice model rather than provider-specific fields. This keeps the app portable if Ovrino changes or adds TTS providers.

Conceptually:

```text
Provider voice
      ↓
Normalizer
      ↓
Ovrino voice model
      ↓
Voice picker
```

## Important product rule

Accent labels must describe the actual supported voice/accent. Ovrino should not claim a voice is a particular accent merely because it is marketed that way.

## Future capabilities

- Voice previews
- Speed
- Pitch
- Style/emotion
- Pronunciation
- SSML
- Learning presets
- Narration presets

Features are added only when the selected provider can support them reliably.
