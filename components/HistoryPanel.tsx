import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { SpeechHistoryItem } from '../services/history';

type Props = { items: SpeechHistoryItem[]; onSelect: (item: SpeechHistoryItem) => void; onDelete: (id: string) => void; onClear: () => void };

export function HistoryPanel({ items, onSelect, onDelete, onClear }: Props) {
  if (!items.length) return <View style={styles.empty}><Text style={styles.emptyTitle}>Nothing here yet.</Text><Text style={styles.emptyText}>Generated speech will appear here automatically.</Text></View>;
  return <View style={styles.container}>
    <View style={styles.header}><Text style={styles.title}>Recent speech</Text><Pressable onPress={onClear}><Text style={styles.clear}>Clear</Text></Pressable></View>
    {items.map((item) => <View key={item.id} style={styles.row}>
      <Pressable accessibilityRole="button" onPress={() => onSelect(item)} style={styles.item}>
        <Text numberOfLines={2} style={styles.text}>{item.text}</Text>
        <Text style={styles.meta}>{item.voiceName} · {new Date(item.createdAt).toLocaleDateString()}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Delete history item" hitSlop={10} onPress={() => onDelete(item.id)}><Text style={styles.delete}>×</Text></Pressable>
    </View>)}
  </View>;
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  title: { color: '#F4F6FA', fontFamily: 'Vazirmatn_700Bold', fontSize: 15 }, clear: { color: '#A9B3FF', fontFamily: 'Vazirmatn_500Medium', fontSize: 12 },
  row: { alignItems: 'center', backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 16, borderWidth: 1, flexDirection: 'row', marginBottom: 8, padding: 12 }, item: { flex: 1, paddingRight: 10 },
  text: { color: '#DCE0E8', fontFamily: 'Vazirmatn_400Regular', fontSize: 13, lineHeight: 20 }, meta: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 10, marginTop: 5 }, delete: { color: '#727B8C', fontSize: 24 },
  empty: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 16, borderWidth: 1, marginBottom: 24, padding: 18 }, emptyTitle: { color: '#DCE0E8', fontFamily: 'Vazirmatn_500Medium', fontSize: 14 }, emptyText: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, lineHeight: 19, marginTop: 5 },
});
