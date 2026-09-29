import { BookOpen, ChevronLeft, ChevronRight, Square } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  sentences: string[];
  currentIndex: number;
  active: boolean;
  onStart: () => void;
  onStop: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectSentence: (index: number) => void;
};

export function ReadingMode({ sentences, currentIndex, active, onStart, onStop, onPrevious, onNext, onSelectSentence }: Props) {
  if (!sentences.length) return null;
  const current = sentences[currentIndex] ?? sentences[0];

  return <View style={styles.card}>
    <View style={styles.header}><View style={styles.titleRow}><BookOpen size={15} color="#A9B3FF" /><Text style={styles.title}>READING MODE</Text></View><Text style={styles.count}>{currentIndex + 1}/{sentences.length}</Text></View>
<ScrollView style={styles.sentenceList} nestedScrollEnabled>{sentences.map((sentence, index) => <Pressable key={`${index}-${sentence}`} accessibilityRole="button" accessibilityState={{ selected: index === currentIndex }} onPress={() => onSelectSentence(index)} style={[styles.sentence, index === currentIndex && styles.sentenceSelected]}><Text style={[styles.sentenceText, index === currentIndex && styles.sentenceTextSelected]}>{sentence}</Text></Pressable>)}</ScrollView>
    <Text style={styles.currentLabel}>Selected sentence {currentIndex + 1}</Text>
    <Text style={styles.current}>{current}</Text>
    <View style={styles.controls}>
      <Pressable accessibilityLabel="Previous sentence" disabled={currentIndex === 0} onPress={onPrevious} style={styles.secondary}><ChevronLeft size={18} color="#A9B3FF" /></Pressable>
      <Pressable accessibilityLabel={active ? 'Stop reading' : 'Start reading'} onPress={active ? onStop : onStart} style={styles.primary}>{active ? <Square size={14} color="#0B0D12" fill="#0B0D12" /> : <BookOpen size={15} color="#0B0D12" />}<Text style={styles.primaryText}>{active ? 'Stop' : 'Read'}</Text></Pressable>
      <Pressable accessibilityLabel="Next sentence" disabled={currentIndex >= sentences.length - 1} onPress={onNext} style={styles.secondary}><ChevronRight size={18} color="#A9B3FF" /></Pressable>
    </View>
  </View>;
}

const styles = StyleSheet.create({ card: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, marginBottom: 24, padding: 17 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, titleRow: { alignItems: 'center', flexDirection: 'row', gap: 7 }, title: { color: '#858D9D', fontFamily: 'Vazirmatn_700Bold', fontSize: 10, letterSpacing: 1.5 }, count: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 10 }, sentenceList: { maxHeight: 180, marginTop: 12 }, sentence: { borderRadius: 10, padding: 9 }, sentenceSelected: { backgroundColor: '#202532' }, sentenceText: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, lineHeight: 19 }, sentenceTextSelected: { color: '#DCE0E8' }, currentLabel: { color: '#626978', fontFamily: 'Vazirmatn_500Medium', fontSize: 10, marginTop: 10 }, current: { color: '#DCE0E8', fontFamily: 'Vazirmatn_400Regular', fontSize: 14, lineHeight: 23, marginTop: 15 }, controls: { alignItems: 'center', flexDirection: 'row', gap: 8, marginTop: 15 }, secondary: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 12, height: 42, justifyContent: 'center', width: 46 }, primary: { alignItems: 'center', backgroundColor: '#A9B3FF', borderRadius: 12, flex: 1, flexDirection: 'row', gap: 7, height: 42, justifyContent: 'center' }, primaryText: { color: '#0B0D12', fontFamily: 'Vazirmatn_700Bold', fontSize: 12 } });
