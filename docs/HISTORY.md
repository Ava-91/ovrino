# Local Speech History

Ovrino keeps recent speech requests on the device without requiring an account.

## Stored data

Each entry contains:

- Generated text
- Voice ID and display name
- Generation timestamp
- Rate
- Pitch

The current implementation keeps the newest 50 entries.

## Privacy

History is local to the app's document storage. It is not uploaded by this feature.

## Cleanup

Users can delete individual entries or clear the complete history. A future cloud-sync feature should use a separate storage layer rather than silently changing the meaning of local history.
