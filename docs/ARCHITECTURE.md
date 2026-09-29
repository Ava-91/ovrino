# Ovrino Architecture

## Current stack

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript
- expo-speech for native device TTS
- Vazirmatn and Young Serif

## Current architecture

```text
Mobile UI
  ├── Text input
  ├── Voice picker
  ├── Voice controls
  └── Reading Mode
        ↓
  DeviceTtsProvider
        ↓
  expo-speech
        ↓
  Installed native TTS voices

Local file storage
  ├── history.json
  ├── favorites.json
  └── settings.json
```

## Principles

1. Keep the first release small and reliable.
2. Treat installed device voices as the source of truth.
3. Keep device TTS behind a provider boundary.
4. Do not require network services for the core reading flow.
5. Keep history, favorites, and settings local.
6. Do not pretend device TTS is a generated audio file.
7. Add cloud infrastructure only when a concrete product requirement justifies it.

If Ovrino eventually needs downloadable audio or capabilities unavailable from native TTS, a remote provider can be added behind the existing TTS interface. Provider secrets must remain server-side.
