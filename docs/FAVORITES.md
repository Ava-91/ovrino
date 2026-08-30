# Favorites

Favorites are stored locally and work without an account.

## Favorite types

- Voice IDs
- Speech-history IDs

The storage layer keeps the two collections separate so future cloud sync can migrate them independently.

## Behavior

- Favorite/unfavorite is immediate in the UI.
- Removing a history item also removes its favorite marker.
- Clearing history clears history favorites but does not affect saved voices.
- Voice favorites remain available across app launches.
