import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { VoiceOption } from '../data/voices';
import { FavoriteButton } from './FavoriteButton';

type VoicePickerProps = {
  voices: VoiceOption[];
  selectedVoiceId: string;
  favoriteVoiceIds?: string[];
  onToggleFavorite?: (voiceId: string) => void;
  onSelect: (voice: VoiceOption) => void;
  onPreview: (voice: VoiceOption) => void;
};

export function VoicePicker({ voices, selectedVoiceId, favoriteVoiceIds = [], onToggleFavorite, onSelect, onPreview }: VoicePickerProps) {
  const [query, setQuery] = useState('');
  const [accent, setAccent] = useState('All');
  const accents = useMemo(() => ['All', ...Array.from(new Set(voices.map((voice) => voice.accent)))], [voices]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return voices.filter((voice) => {
      const matchesAccent = accent === 'All' || voice.accent === accent;
      const haystack = `${voice.name} ${voice.accent} ${voice.gender} ${voice.age}`.toLowerCase();
      return matchesAccent && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [accent, query, voices]);

  return (
    <View style={styles.container}>
      <TextInput accessibilityLabel="Search voices" onChangeText={setQuery} placeholder="Search voices..." placeholderTextColor="#626978" style={styles.search} value={query} />
      <FlatList
        data={accents}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: accent === item }}
            onPress={() => setAccent(item)}
            style={[styles.filter, accent === item && styles.filterActive]}
          >
            <Text numberOfLines={1} style={[styles.filterText, accent === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No voices match that search.</Text>}
        renderItem={({ item }) => {
          const selected = item.id === selectedVoiceId;
          const favorite = favoriteVoiceIds.includes(item.id);
          const available = item.available !== false;
          const metadata = [item.accent, item.gender !== 'Unknown' ? item.gender : 'Voice details unavailable', item.age !== 'Unknown' ? item.age : null].filter(Boolean).join(' · ');
          return (
            <View style={[styles.card, selected && styles.cardSelected, !available && styles.cardUnavailable]}>
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: selected, disabled: !available }}
                accessibilityLabel={`${item.name}. ${metadata}. ${available ? 'Available' : 'Unavailable on this device'}`}
                disabled={!available}
                onPress={() => onSelect(item)}
                style={styles.selectArea}
              >
                <View style={styles.avatar}><Text style={styles.avatarText}>{item.name.charAt(0)}</Text></View>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>{metadata}</Text>
                  <Text style={styles.description}>{available ? item.description : 'Not available in the installed device TTS voices.'}</Text>
                </View>
                <View style={styles.actions}>
                  <FavoriteButton active={favorite} label={`${item.name} voice`} onPress={() => onToggleFavorite?.(item.id)} />
                  <View style={[styles.radio, selected && styles.radioSelected, !available && styles.radioUnavailable]}>{selected && available && <View style={styles.radioDot} />}</View>
                </View>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Preview ${item.name} voice`}
                disabled={!available}
                onPress={() => onPreview(item)}
                style={[styles.preview, !available && styles.previewDisabled]}
              >
                <Text style={[styles.previewText, !available && styles.previewTextDisabled]}>{available ? 'Preview' : 'Unavailable'}</Text>
              </Pressable>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 14, borderWidth: 1, color: '#F4F6FA', fontFamily: 'Vazirmatn_400Regular', fontSize: 14, paddingHorizontal: 14, paddingVertical: 12 },
  filters: { flexGrow: 0, marginVertical: 12, minHeight: 38 },
  filter: { alignItems: 'center', borderColor: '#252A35', borderRadius: 12, borderWidth: 1, height: 38, justifyContent: 'center', marginRight: 8, minWidth: 58, paddingHorizontal: 12 },
  filterActive: { backgroundColor: '#A9B3FF', borderColor: '#A9B3FF' },
  filterText: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 12 },
  filterTextActive: { color: '#0B0D12' },
  card: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 16, borderWidth: 1, marginBottom: 10, padding: 12 },
  cardSelected: { borderColor: '#59638C' },
  cardUnavailable: { opacity: 0.55 },
  selectArea: { alignItems: 'center', flexDirection: 'row', minHeight: 52 },
  avatar: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 13, height: 46, justifyContent: 'center', width: 46 },
  avatarText: { color: '#A9B3FF', fontFamily: 'YoungSerif_400Regular', fontSize: 20 },
  info: { flex: 1, marginHorizontal: 12 },
  name: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 15 },
  meta: { color: '#8A93A3', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 2 },
  description: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 4 },
  actions: { alignItems: 'center', gap: 2 },
  radio: { alignItems: 'center', borderColor: '#4B5362', borderRadius: 10, borderWidth: 1, height: 20, justifyContent: 'center', width: 20 },
  radioSelected: { borderColor: '#A9B3FF' },
  radioUnavailable: { borderColor: '#353B48' },
  radioDot: { backgroundColor: '#A9B3FF', borderRadius: 5, height: 10, width: 10 },
  preview: { alignSelf: 'flex-start', marginLeft: 58, marginTop: 8, minHeight: 28, justifyContent: 'center' },
  previewDisabled: { opacity: 0.8 },
  previewText: { color: '#A9B3FF', fontFamily: 'Vazirmatn_500Medium', fontSize: 11 },
  previewTextDisabled: { color: '#555D6B' },
  empty: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', paddingVertical: 20, textAlign: 'center' },
});
