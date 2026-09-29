import * as FileSystem from 'expo-file-system/legacy';

export type SpeechSettings = { voiceId: string; rate: number; pitch: number };
const directory = `${FileSystem.documentDirectory}ovrino/`;
const file = `${directory}settings.json`;
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueueWrite<T>(operation: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.then(() => undefined, () => undefined);
  return next;
}

async function ensureStorage() {
  const info = await FileSystem.getInfoAsync(directory);
  if (!info.exists) await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
}

export async function readSpeechSettings(): Promise<Partial<SpeechSettings>> {
  try {
    await ensureStorage();
    const info = await FileSystem.getInfoAsync(file);
    if (!info.exists) return {};
    const value: unknown = JSON.parse(await FileSystem.readAsStringAsync(file));
    if (!value || typeof value !== 'object') return {};
    const state = value as Partial<SpeechSettings>;
    return {
      ...(typeof state.voiceId === 'string' ? { voiceId: state.voiceId } : {}),
      ...(typeof state.rate === 'number' ? { rate: state.rate } : {}),
      ...(typeof state.pitch === 'number' ? { pitch: state.pitch } : {}),
    };
  } catch { return {}; }
}

export function saveSpeechSettings(settings: SpeechSettings): Promise<void> {
  return enqueueWrite(async () => {
    await ensureStorage();
    await FileSystem.writeAsStringAsync(file, JSON.stringify(settings));
  });
}
