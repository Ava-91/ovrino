import { BookOpen, ChevronLeft, ChevronRight, Square } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';

type Props = {
  sentences: string[];
  currentIndex: number;
  active: boolean;
  onStart: () => void;
  onStop: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectSentence: (index: number) => void;
  paragraphIndex: number;
  paragraphCount: number;
  onPreviousParagraph: () => void;
  onNextParagraph: () => void;
  onRepeat: () => void;
  readingRate: number;
  onReadingRateChange: (rate: number) => void;
};

export function ReadingMode({ sentences, currentIndex, active, onStart, onStop, onPrevious, onNext, onSelectSentence, paragraphIndex, paragraphCount, onPreviousParagraph, onNextParagraph, onRepeat, readingRate, onReadingRateChange }: Props) {
  if (!sentences.length) return null;
  const listRef = useRef<FlatList<string>>(null);
  useEffect(() => { if (currentIndex >= 0 && currentIndex < sentences.length) listRef.current?.scrollToIndex({ index: currentIndex, animated: true, viewPosition: 0.35 }); }, [currentIndex, sentences.length]);
  const current = sentences[currentIndex] ?? sentences[0];

  return <View style={styles.card}>
    <View style={styles.header}><View style={styles.titleRow}><BookOpen size={15} color="#A9B3FF" /><Text style={styles.title}>READING MODE</Text></View><Text style={styles.count}>Sentence {currentIndex + 1}/{sentences.length}</Text></View>
<FlatList ref={listRef} data={sentences} keyExtractor={(sentence, index) => `${index}-${sentence}`} style={styles.sentenceList} nestedScrollEnabled onScrollToIndexFailed={({ index }) => setTimeout(() => listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.35 }), 50)} renderItem={({ item: sentence, index }) => <Pressable accessibilityRole="button" accessibilityState={{ selected: index === currentIndex }} onPress={() => onSelectSentence(index)} style={[styles.sentence, index === currentIndex && styles.sentenceSelected]}><Text style={[styles.sentenceText, index === currentIndex && styles.sentenceTextSelected]}>{sentence}</Text></Pressable>} />
    <View style={styles.paragraphRow}><Pressable accessibilityLabel="Previous paragraph" disabled={paragraphIndex === 0} onPress={onPreviousParagraph} style={styles.paragraphButton}><ChevronLeft size={15} color="#A9B3FF" /></Pressable><Text style={styles.paragraphLabel}>Paragraph {paragraphIndex + 1}/{paragraphCount}</Text><Pressable accessibilityLabel="Next paragraph" disabled={paragraphIndex >= paragraphCount - 1} onPress={onNextParagraph} style={styles.paragraphButton}><ChevronRight size={15} color="#A9B3FF" /></Pressable></View>
    <View style={styles.rateRow}><Text style={styles.rateLabel}>Reading speed</Text>{[0.75, 1, 1.25].map((value) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: readingRate === value }} onPress={() => onReadingRateChange(value)} style={[styles.rateButton, readingRate === value && styles.rateButtonActive]}><Text style={[styles.rateText, readingRate === value && styles.rateTextActive]}>{value}×</Text></Pressable>)}</View>
    <Text style={styles.currentLabel}>Selected sentence {currentIndex + 1}</Text>
    <Text style={styles.current}>{current}</Text>
    <View style={styles.controls}>
      <Pressable accessibilityLabel="Previous sentence" disabled={currentIndex === 0} onPress={onPrevious} style={styles.secondary}><ChevronLeft size={18} color="#A9B3FF" /></Pressable>
      <Pressable accessibilityLabel="Repeat current sentence" onPress={onRepeat} style={styles.secondary}><Text style={styles.repeatText}>↶</Text></Pressable><Pressable accessibilityLabel={active ? 'Stop reading' : 'Start reading'} onPress={active ? onStop : onStart} style={styles.primary}>{active ? <Square size={14} color="#0B0D12" fill="#0B0D12" /> : <BookOpen size={15} color="#0B0D12" />}<Text style={styles.primaryText}>{active ? 'Stop' : 'Read'}</Text></Pressable>
      <Pressable accessibilityLabel="Next sentence" disabled={currentIndex >= sentences.length - 1} onPress={onNext} style={styles.secondary}><ChevronRight size={18} color="#A9B3FF" /></Pressable>
    </View>
  </View>;
}

const styles = StyleSheet.create({ card: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, marginBottom: 24, padding: 17 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, titleRow: { alignItems: 'center', flexDirection: 'row', gap: 7 }, title: { color: '#858D9D', fontFamily: 'Vazirmatn_700Bold', fontSize: 10, letterSpacing: 1.5 }, count: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 10 }, paragraphRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }, paragraphButton: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 9, height: 30, justifyContent: 'center', width: 34 }, paragraphLabel: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 10 }, rateRow: { alignItems: 'center', flexDirection: 'row', gap: 6, marginTop: 10 }, rateLabel: { color: '#626978', flex: 1, fontFamily: 'Vazirmatn_500Medium', fontSize: 10 }, rateButton: { borderColor: '#252A35', borderRadius: 9, borderWidth: 1, paddingHorizontal: 9, paddingVertical: 6 }, rateButtonActive: { backgroundColor: '#A9B3FF', borderColor: '#A9B3FF' }, rateText: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 10 }, rateTextActive: { color: '#0B0D12' }, sentenceList: { maxHeight: 180, marginTop: 12 }, sentence: { borderRadius: 10, padding: 9 }, sentenceSelected: { backgroundColor: '#202532' }, sentenceText: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, lineHeight: 19 }, sentenceTextSelected: { color: '#DCE0E8' }, currentLabel: { color: '#626978', fontFamily: 'Vazirmatn_500Medium', fontSize: 10, marginTop: 10 }, current: { color: '#DCE0E8', fontFamily: 'Vazirmatn_400Regular', fontSize: 14, lineHeight: 23, marginTop: 15 }, controls: { alignItems: 'center', flexDirection: 'row', gap: 8, marginTop: 15 }, secondary: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 12, height: 42, justifyContent: 'center', width: 46 }, primary: { alignItems: 'center', backgroundColor: '#A9B3FF', borderRadius: 12, flex: 1, flexDirection: 'row', gap: 7, height: 42, justifyContent: 'center' }, repeatText: { color: '#A9B3FF', fontFamily: 'Vazirmatn_700Bold', fontSize: 18 }, primaryText: { color: '#0B0D12', fontFamily: 'Vazirmatn_700Bold', fontSize: 12 } });
