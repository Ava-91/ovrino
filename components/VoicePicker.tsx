import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { VoiceOption } from '../data/voices';

type VoicePickerProps = {
  voices: VoiceOption[];
  selectedVoiceId: string;
  onSelect: (voice: VoiceOption) => void;
  onPreview: (voice: VoiceOption) => void;
};

export function VoicePicker({ voices, selectedVoiceId, onSelect, onPreview }: VoicePickerProps) {
  const [query, setQuery] = useState('');
  const [accent, setAccent] = useState('All');

  const accents = useMemo(
    () => ['All', ...Array.from(new Set(voices.map((voice) => voice.accent)))],
    [voices],
  );

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
      <TextInput
        accessibilityLabel="Search voices"
        onChangeText={setQuery}
        placeholder="Search voices..."
        placeholderTextColor="#626978"
        style={styles.search}
        value={query}
      />

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
            <Text style={[styles.filterText, accent === item && styles.filterTextActive]}>{item}</Text>
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

          return (
            <View style={[styles.card, selected && styles.cardSelected]}>
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                accessibilityLabel={`${item.name}, ${item.accent}, ${item.gender}, ${item.age}`}
                onPress={() => onSelect(item)}
                style={styles.selectArea}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>{item.accent} · {item.gender} · {item.age}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Preview ${item.name} voice`}
                onPress={() => onPreview(item)}
                style={styles.preview}
              >
                <Text style={styles.previewText}>Preview</Text>
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
  filters: { marginVertical: 12 },
  filter: { borderColor: '#252A35', borderRadius: 12, borderWidth: 1, marginRight: 8, paddingHorizontal: 12, paddingVertical: 8 },
  filterActive: { backgroundColor: '#A9B3FF', borderColor: '#A9B3FF' },
  filterText: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 12 },
  filterTextActive: { color: '#0B0D12' },
  card: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 16, borderWidth: 1, marginBottom: 10, padding: 12 },
  cardSelected: { borderColor: '#59638C' },
  selectArea: { alignItems: 'center', flexDirection: 'row' },
  avatar: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 13, height: 46, justifyContent: 'center', width: 46 },
  avatarText: { color: '#A9B3FF', fontFamily: 'YoungSerif_400Regular', fontSize: 20 },
  info: { flex: 1, marginHorizontal: 12 },
  name: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 15 },
  meta: { color: '#8A93A3', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 2 },
  description: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 4 },
  radio: { alignItems: 'center', borderColor: '#4B5362', borderRadius: 10, borderWidth: 1, height: 20, justifyContent: 'center', width: 20 },
  radioSelected: { borderColor: '#A9B3FF' },
  radioDot: { backgroundColor: '#A9B3FF', borderRadius: 5, height: 10, width: 10 },
  preview: { alignSelf: 'flex-start', marginLeft: 58, marginTop: 8 },
  previewText: { color: '#A9B3FF', fontFamily: 'Vazirmatn_500Medium', fontSize: 11 },
  empty: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', paddingVertical: 20, textAlign: 'center' },
});
