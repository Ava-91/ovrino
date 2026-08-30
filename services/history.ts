import * as FileSystem from 'expo-file-system/legacy';

export type SpeechHistoryItem = {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  createdAt: string;
  rate: number;
  pitch: number;
};

const directory = `${FileSystem.documentDirectory}ovrino/`;
const file = `${directory}history.json`;
const MAX_HISTORY_ITEMS = 50;

async function ensureStorage() {
  const info = await FileSystem.getInfoAsync(directory);
  if (!info.exists) await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
}

export async function readHistory(): Promise<SpeechHistoryItem[]> {
  try {
    await ensureStorage();
    const info = await FileSystem.getInfoAsync(file);
    if (!info.exists) return [];
    const parsed: unknown = JSON.parse(await FileSystem.readAsStringAsync(file));
    return Array.isArray(parsed) ? (parsed as SpeechHistoryItem[]) : [];
  } catch {
    return [];
  }
}

export async function saveHistoryItem(item: SpeechHistoryItem) {
  const current = await readHistory();
  const next = [item, ...current.filter((entry) => entry.id !== item.id)].slice(0, MAX_HISTORY_ITEMS);
  await ensureStorage();
  await FileSystem.writeAsStringAsync(file, JSON.stringify(next));
  return next;
}

export async function deleteHistoryItem(id: string) {
  const current = await readHistory();
  const next = current.filter((entry) => entry.id !== id);
  await ensureStorage();
  await FileSystem.writeAsStringAsync(file, JSON.stringify(next));
  return next;
}

export async function clearHistory() {
  await ensureStorage();
  await FileSystem.writeAsStringAsync(file, '[]');
}
