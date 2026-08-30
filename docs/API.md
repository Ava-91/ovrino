# API Plan

This document describes the planned API boundary. It is not a production API yet.

## Generate speech

Conceptual request:

```http
POST /api/speech
Content-Type: application/json
```

```json
{
  "text": "Hello from Ovrino.",
  "voiceId": "provider-neutral-voice-id",
  "settings": {
    "speed": 1
  }
}
```

Conceptual response:

```json
{
  "audioUrl": "...",
  "durationMs": 3200
}
```

The production implementation may use a different response shape.

## Security

The mobile client must not receive a provider API key. The backend owns provider credentials and performs the provider request.

## Future endpoints

- `GET /api/voices`
- `POST /api/speech`
- `GET /api/history` (only if cloud history is introduced)
- `DELETE /api/history/:id` (only if cloud history is introduced)

The API should remain small until there is a concrete product requirement for additional endpoints.
