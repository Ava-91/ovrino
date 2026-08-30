# Ovrino Roadmap

## Phase 0 — Foundation
- [x] Create Expo mobile app
- [x] Establish dark visual identity
- [x] Add Young Serif and Vazirmatn
- [x] Build the first text-to-voice screen
- [ ] Replace deprecated SafeAreaView usage

## Phase 1 — Voice selection
- [ ] Build a dedicated voice picker
- [ ] Group voices by accent
- [ ] Support gender and age/character metadata where available
- [ ] Add search/filtering
- [ ] Add voice preview samples

## Phase 2 — Real TTS MVP
- [ ] Select a TTS provider
- [ ] Create a secure backend endpoint
- [ ] Send text + voice configuration to the backend
- [ ] Return generated audio
- [ ] Add loading, timeout, and error states
- [ ] Never expose provider secrets in the mobile app

## Phase 3 — Audio player
- [ ] Play/pause
- [ ] Seek
- [ ] Replay
- [ ] Playback progress
- [ ] Generation state
- [ ] Audio caching where appropriate

## Phase 4 — Voice controls
- [ ] Speed
- [ ] Pitch where supported
- [ ] Expressiveness/style where supported
- [ ] Pronunciation controls
- [ ] SSML exploration
- [ ] Presets for learning, narration, casual use, and storytelling

## Phase 5 — Learning mode
- [ ] Slower playback
- [ ] Sentence-by-sentence playback
- [ ] Repeat sentence
- [ ] Accent-focused practice
- [ ] Pronunciation practice research

## Phase 6 — History and saved audio
- [ ] Local history
- [ ] Favorites
- [ ] Rename/delete generated items
- [ ] Export/share audio
- [ ] Cloud sync only if it becomes necessary

## Phase 7 — Creator features
- [ ] Easy audio export for video editors
- [ ] Creator-oriented presets
- [ ] Better narration controls
- [ ] Sharing workflow

## Phase 8 — Production backend
- [ ] Authentication if required
- [ ] Usage limits
- [ ] Rate limiting
- [ ] Abuse prevention
- [ ] Provider abstraction/fallbacks
- [ ] Monitoring and cost controls

## Phase 9 — Release
- [ ] Accessibility review
- [ ] Performance testing
- [ ] Android production build
- [ ] iOS production build
- [ ] Privacy documentation
- [ ] App icon and store assets
- [ ] Store listing
- [ ] Final QA

## MVP definition

The first useful Ovrino release is intentionally narrow:

**Enter text → choose a voice → generate real speech → play it.**

Everything else should support that core experience instead of delaying it.
