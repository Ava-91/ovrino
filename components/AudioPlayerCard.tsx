import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Play, Share2, Square } from 'lucide-react-native';
import { shareSpeechText } from '../services/sharing';

type AudioPlayerCardProps = { text: string; voiceName: string; playing: boolean; onPlay: () => void; onStop: () => void };

export function AudioPlayerCard({ text, voiceName, playing, onPlay, onStop }: AudioPlayerCardProps) {
  const share = async () => { await shareSpeechText(text, voiceName); };

  return <View style={styles.card}>
    <View style={styles.header}><View><Text style={styles.eyebrow}>{playing ? 'NOW SPEAKING' : 'READY TO SPEAK'}</Text><Text style={styles.voice}>{voiceName}</Text></View><View style={[styles.dot, playing && styles.dotActive]} /></View>
    <Text style={styles.note}>Playback is handled by your device's TTS engine. Ovrino does not create or pretend to seek through an audio file.</Text>
    <View style={styles.controls}>
      <Pressable accessibilityRole="button" accessibilityLabel={playing ? 'Stop speech' : 'Speak text'} onPress={playing ? onStop : onPlay} style={styles.playButton}>{playing ? <Square size={18} color="#0B0D12" fill="#0B0D12" /> : <Play size={18} color="#0B0D12" fill="#0B0D12" />}<Text style={styles.playText}>{playing ? 'Stop' : 'Speak'}</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Share transcript" onPress={share} style={styles.shareButton}><Share2 size={15} color="#858D9D" /><Text style={styles.shareText}>Share Text</Text></Pressable>
    </View>
  </View>;
}

const styles = StyleSheet.create({ card: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, marginBottom: 24, padding: 17 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, eyebrow: { color: '#626978', fontFamily: 'Vazirmatn_700Bold', fontSize: 9, letterSpacing: 1.5 }, voice: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 15, marginTop: 4 }, dot: { backgroundColor: '#4A5260', borderRadius: 4, height: 8, width: 8 }, dotActive: { backgroundColor: '#A9B3FF' }, note: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, lineHeight: 17, marginTop: 16 }, controls: { flexDirection: 'row', gap: 8, marginTop: 16 }, playButton: { alignItems: 'center', backgroundColor: '#A9B3FF', borderRadius: 13, flex: 1, flexDirection: 'row', gap: 8, height: 44, justifyContent: 'center' }, playText: { color: '#0B0D12', fontFamily: 'Vazirmatn_700Bold', fontSize: 12 }, shareButton: { alignItems: 'center', borderColor: '#252A35', borderRadius: 13, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 7, justifyContent: 'center' }, shareText: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 11 } });
