# Ovrino

> **Give your words a voice.**

Ovrino is a voice-focused text-to-speech mobile app built with React Native and Expo. It is designed to make choosing, shaping, and listening to different voices simple enough for everyday use and flexible enough for learning, narration, accessibility, and creative projects.

## ✨ What Ovrino is for

- 🎧 Listen to text instead of reading it
- 📚 Study and self-learning
- 🗣️ English listening practice
- 🌎 Explore different accents and voices
- 🎬 Create voiceovers for videos
- 📖 Narration and storytelling
- ♿ Reading assistance and accessibility
- 💤 Casual listening

## 🚧 Current status

Ovrino is in **early development**.

The current mobile prototype contains the first interface for entering text, selecting a placeholder voice, and preparing a generation flow. Real TTS generation is intentionally not connected yet.

The first MVP target is:

**Enter text → choose a voice → generate real speech → play it.**

## 🛠️ Tech stack

- **React Native** — mobile UI
- **Expo SDK 54** — development and native tooling
- **TypeScript** — application code
- **Vazirmatn** — interface typography and Persian support
- **Young Serif** — display typography

A TTS provider and secure backend will be selected during the real-TTS phase.

## 🏗️ Planned architecture

```text
Mobile app
    │ HTTPS
    ▼
Ovrino backend
    │
    ▼
TTS provider
    │
    ▼
Generated audio
```

Provider API keys will remain server-side and will never be embedded in the mobile client.

## 🚀 Development

### Requirements

- Node.js + npm
- Android device/emulator or supported iOS development environment
- Expo Go for the current development workflow

### Install

```bash
npm install
```

### Start

```bash
npm start
```

Then scan the Expo QR code with Expo Go.

Useful commands:

```bash
npm run android
npm run ios
npm run web
npx expo-doctor
npx expo install --check
```

## 📁 Documentation

Detailed project documentation lives in [`docs/`](./docs/):

- [Product direction](./docs/PRODUCT.md)
- [Roadmap](./docs/ROADMAP.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Voice system](./docs/VOICE_SYSTEM.md)
- [API plan](./docs/API.md)
- [Security](./docs/SECURITY.md)
- [Contributing](./docs/CONTRIBUTING.md)

## 🗺️ Roadmap

### Foundation
- [x] Expo mobile project
- [x] Initial Ovrino interface
- [x] Dark visual identity
- [x] Young Serif + Vazirmatn

### Voice system
- [ ] Real voice picker
- [ ] Accent categories
- [ ] Voice previews
- [ ] Voice metadata

### TTS MVP
- [ ] Select TTS provider
- [ ] Secure backend
- [ ] Real speech generation
- [ ] Loading and error states
- [ ] Audio playback

### Beyond MVP
- [ ] Speed and voice controls
- [ ] Learning mode
- [ ] History and favorites
- [ ] Audio export/sharing
- [ ] Creator/narration features
- [ ] Production builds and store release

See the [full roadmap](./docs/ROADMAP.md).

## 🔐 Security

Never commit API keys, tokens, database credentials, or signing credentials. See [`docs/SECURITY.md`](./docs/SECURITY.md).

## 📄 License

See [LICENSE](./LICENSE).

---

Ovrino is being built one voice at a time. 🔊
