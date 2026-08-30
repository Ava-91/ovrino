# Ovrino Architecture

## Current stack

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript
- Expo Go for development
- Vazirmatn and Young Serif for typography

## Planned architecture

```text
Mobile app
   |
   | HTTPS
   v
Ovrino backend
   |
   +--> TTS provider
   |
   +--> Audio storage (when needed)
   |
   +--> Database/auth (when needed)
```

The mobile app should never contain a production TTS secret. Provider credentials belong on the backend.

## Principles

1. Keep the first release small and reliable.
2. Keep provider-specific code behind a service boundary.
3. Do not commit API keys or generated secrets.
4. Prefer platform-native audio playback and caching where practical.
5. Make voice metadata independent from the UI so providers can be changed later.
