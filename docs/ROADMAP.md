# Ovrino Roadmap

## Phase 0 — Foundation
- [x] Create Expo mobile app
- [x] Establish dark visual identity
- [x] Add Young Serif and Vazirmatn
- [x] Build the first text-to-voice screen
- [ ] Replace deprecated SafeAreaView usage

## Phase 1 — Voice selection
- [x] Build a dedicated voice picker
- [x] Group voices by accent
- [x] Support honest/unknown native voice metadata
- [x] Add search/filtering
- [x] Add voice preview samples
- [x] Resolve real native voice identifiers when available
- [x] Handle unavailable native voices safely
- [x] Stabilize category/tab layout

## Phase 2 — Real TTS MVP
- [ ] Select a production TTS provider
- [ ] Create a secure backend endpoint
- [ ] Send text + voice configuration to the backend
- [ ] Return generated audio
- [ ] Add loading, timeout, and error states
- [x] Never expose provider secrets in the mobile app

## Phase 3 — Audio player
- [x] Play/pause
- [x] Seek UI
- [x] Replay/stop
- [x] Playback progress UI
- [x] Generation state
- [ ] Real generated-audio playback
- [ ] Audio caching for provider audio

## Phase 4 — Voice controls
- [x] Speed
- [x] Pitch where supported
- [ ] Expressiveness/style where supported
- [ ] Pronunciation controls
- [ ] SSML exploration
- [x] Presets for learning, narration, casual use, and storytelling

## Phase 5 — Learning mode
- [ ] Dedicated learning workflow

## Phase 6 — History and saved audio
- [x] Local history
- [x] Favorites
- [x] Delete history
- [x] Share workflow
- [ ] Audio export once generated audio is available
- [ ] Cloud sync only if it becomes necessary

## Phase 7 — Future creator work
- [ ] Easy audio export for video editors
- [ ] Advanced narration controls

## Phase 8 — Production backend
- [ ] Authentication if required
- [x] Usage limits
- [x] Rate limiting foundation
- [x] Abuse/cost protection foundation
- [x] Provider abstraction/fallback boundary
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
