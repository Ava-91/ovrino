# Voice System Test Plan

This is the manual/device test matrix for Voice System v2. Native voice availability varies by Android TTS engine, installed language packs, and iOS configuration, so these cases must be verified on a real device.

## Voice matrix

| Voice profile | Expected behavior |
| --- | --- |
| American | Prefer an `en-US` native voice; otherwise use language fallback. |
| British | Prefer an `en-GB` native voice; otherwise use language fallback. |
| Indian | Prefer an `en-IN` native voice; otherwise use language fallback. |
| Australian | Prefer an `en-AU` native voice; otherwise use language fallback. |
| Canadian | Prefer an `en-CA` native voice; otherwise use language fallback. |
| Russian English | Prefer a Russian native voice only when the device exposes one; otherwise fall back safely. |

For every profile:

1. Open the voice picker.
2. Select its accent tab.
3. Confirm the filter layout remains the same height.
4. Tap Preview.
5. Confirm speech starts and stops cleanly.
6. Select another voice while speech is active.
7. Confirm the old speech stops before the new voice is used.
8. Generate normal text and confirm there is no crash when a matching voice is missing.

## Preset matrix

| Preset | Rate | Pitch |
| --- | ---: | ---: |
| Casual | 1.00 | 1.00 |
| Learning | 0.72 | 1.00 |
| Narration | 0.90 | 0.98 |
| Story | 0.86 | 1.05 |

For every preset:

1. Tap the preset.
2. Confirm its card becomes selected.
3. Confirm Speed and Pitch values change immediately.
4. Generate speech.
5. Confirm the new settings are used.
6. Manually adjust a control and confirm the preset selection clears unless the values return exactly to that preset.

## Native voice limitations

Ovrino cannot infer a person's gender or age reliably from a native TTS voice identifier. The picker therefore avoids presenting those fields as facts when the metadata is unknown.

Pitch is also engine-dependent. A small audible difference is not necessarily an application bug; some device TTS engines expose limited pitch variation. Production provider voices can later provide stronger style controls.
