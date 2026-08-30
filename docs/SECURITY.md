# Security

## Secrets

Never commit:

- TTS provider API keys
- Authentication secrets
- Database credentials
- Production signing credentials
- Personal access tokens

Use environment variables and a server-side secret store for production credentials.

## Client/server boundary

The mobile app is an untrusted client. Any provider requiring a secret must be called from a controlled backend.

## User text

Text sent for speech generation may be sensitive. Ovrino should minimize retention and clearly document whether text or generated audio is stored or sent to third parties.

## Dependencies

Review dependency warnings before upgrades. Avoid forced automated upgrades when they can introduce breaking changes.
