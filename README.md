# Ovrino

> **Give your words a voice.**

Ovrino is a small, local-first text-to-speech mobile app built with React Native and Expo. It makes the voices already installed on your device easier to discover, control, and use for reading.

## Current MVP

**Write or paste text → choose an installed device voice → adjust speed/pitch → speak.**

Reading Mode can split text into sentences and speak them sequentially. History, favorites, and speech settings are stored locally on the device.

The MVP uses the device's native TTS engine through expo-speech. There is no API key, backend, account, cloud voice provider, or generated-audio service required.

## Tech stack

- React Native
- Expo SDK 54
- TypeScript
- expo-speech
- Vazirmatn + Young Serif
- Vitest for pure utility tests

## Architecture

```text
Ovrino
  ├── Text input + Reading Mode
  ├── Installed device voices
  │       ↓
  │   expo-speech
  │       ↓
  │   Native device TTS engine
  └── Local file storage
          ├── history
          ├── favorites
          └── speech settings
```

A future provider/backend is optional and should only be added if device TTS cannot satisfy a concrete product requirement.

## Development

Requirements: Node.js + npm, plus an Android device/emulator or supported iOS environment.

```bash
npm install
npm start
npm test
```

## Roadmap

- [x] Local device TTS
- [x] Installed voice discovery
- [x] Voice search/filtering and previews
- [x] Speed/pitch controls and presets
- [x] Local history and favorites
- [x] Local speech settings
- [x] Sentence-by-sentence Reading Mode
- [x] Honest device-TTS playback UI
- [x] Pure utility tests
- [ ] Accessibility review
- [ ] Performance/device compatibility testing
- [ ] Production Android/iOS builds

### Future, not required for the MVP

Generated audio files, cloud TTS, backend/API, authentication, cloud sync, audio export from generated files, and advanced creator features.

Ovrino is being built one voice at a time. 🔊
