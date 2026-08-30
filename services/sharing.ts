import { Share } from 'react-native';

export async function shareSpeechText(text: string, voiceName: string) {
  return Share.share({
    title: `Ovrino · ${voiceName}`,
    message: `${text}\n\nGenerated with Ovrino · ${voiceName}`,
  });
}

/**
 * Audio sharing is intentionally kept behind a separate boundary. The current
 * device TTS adapter speaks directly and does not provide a reusable audio
 * file URI. Once the production provider returns audio, this module can share
 * the generated file without changing the screen's public API.
 */
export type ShareableAudio = { uri: string; mimeType: string; fileName: string };
