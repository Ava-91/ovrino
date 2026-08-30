import * as FileSystem from 'expo-file-system/legacy';

export type FavoriteState = { voices: string[]; history: string[] };
const directory = `${FileSystem.documentDirectory}ovrino/`;
const file = `${directory}favorites.json`;
const EMPTY: FavoriteState = { voices: [], history: [] };

async function ensureStorage() {
  const info = await FileSystem.getInfoAsync(directory);
  if (!info.exists) await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
}

export async function readFavorites(): Promise<FavoriteState> {
  try {
    await ensureStorage();
    const info = await FileSystem.getInfoAsync(file);
    if (!info.exists) return EMPTY;
    const value: unknown = JSON.parse(await FileSystem.readAsStringAsync(file));
    if (!value || typeof value !== 'object') return EMPTY;
    const state = value as Partial<FavoriteState>;
    return { voices: Array.isArray(state.voices) ? state.voices : [], history: Array.isArray(state.history) ? state.history : [] };
  } catch { return EMPTY; }
}

export async function setFavorite(kind: keyof FavoriteState, id: string, favorite: boolean) {
  const current = await readFavorites();
  const values = new Set(current[kind]);
  favorite ? values.add(id) : values.delete(id);
  const next = { ...current, [kind]: [...values] };
  await ensureStorage();
  await FileSystem.writeAsStringAsync(file, JSON.stringify(next));
  return next;
}
