# Ovrino server boundary

The server directory contains provider-neutral speech infrastructure.

## Environment

```text
TTS_PROVIDER_ENDPOINT=
TTS_PROVIDER_API_KEY=
```

These values must exist only in the deployment environment. They must never be placed in the Expo client, committed to Git, or exposed through `EXPO_PUBLIC_*` variables.

## Request

`POST /api/speech`

```json
{
  "text": "Hello from Ovrino.",
  "voiceId": "american-female",
  "settings": {
    "rate": 1,
    "pitch": 1
  }
}
```

The endpoint validates input before calling the provider. Provider-specific response handling remains behind `SpeechProvider`.

## Current limitation

The adapter is intentionally provider-neutral. A concrete production provider should be selected and mapped to this interface in a later integration change rather than pretending that arbitrary provider APIs share the same payload.
