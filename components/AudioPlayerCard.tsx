import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Pause, Play, RotateCcw, RotateCw, Share2, Square } from 'lucide-react-native';
import { shareSpeechText } from '../services/sharing';

type AudioPlayerCardProps = { text: string; voiceName: string; playing: boolean; onPlayPause: () => void; onStop: () => void };
function estimateDuration(text: string): number { const words = text.trim().split(/\s+/).filter(Boolean).length; return Math.max(3, Math.round((words / 2.4) * 10) / 10); }
function formatTime(seconds: number) { const minutes = Math.floor(seconds / 60); const remainder = Math.floor(seconds % 60).toString().padStart(2, '0'); return `${minutes}:${remainder}`; }

export function AudioPlayerCard({ text, voiceName, playing, onPlayPause, onStop }: AudioPlayerCardProps) {
  const duration = useMemo(() => estimateDuration(text), [text]); const [position, setPosition] = useState(0); const [shareState, setShareState] = useState<'idle' | 'shared' | 'error'>('idle');
  useEffect(() => { if (!playing) return; const timer = setInterval(() => setPosition((current) => current >= duration ? 0 : Math.min(duration, current + 0.25)), 250); return () => clearInterval(timer); }, [duration, playing]);
  useEffect(() => { if (!playing) setPosition(0); }, [playing]);
  const seek = (amount: number) => setPosition((current) => Math.max(0, Math.min(duration, current + amount)));
  const progress = duration ? position / duration : 0;
  const share = async () => { try { await shareSpeechText(text, voiceName); setShareState('shared'); } catch { setShareState('error'); } };

  return <View style={styles.card}>
    <View style={styles.header}><View><Text style={styles.eyebrow}>NOW PLAYING</Text><Text style={styles.voice}>{voiceName}</Text></View><View style={styles.liveDot} /></View>
    <View accessibilityLabel={`Playback progress ${Math.round(progress * 100)} percent`} style={styles.track}><View style={[styles.progress, { width: `${progress * 100}%` }]} /></View>
    <View style={styles.timeRow}><Text style={styles.time}>{formatTime(position)}</Text><Text style={styles.time}>{formatTime(duration)}</Text></View>
    <View style={styles.controls}>
      <Pressable accessibilityLabel="Back 10 seconds" onPress={() => seek(-10)} style={styles.smallButton}><RotateCcw size={18} color="#A9B3FF" strokeWidth={2} /><Text style={styles.smallText}>10</Text></Pressable>
      <Pressable accessibilityLabel={playing ? 'Pause audio' : 'Play audio'} onPress={onPlayPause} style={styles.playButton}>{playing ? <Pause size={20} color="#0B0D12" fill="#0B0D12" /> : <Play size={20} color="#0B0D12" fill="#0B0D12" />}</Pressable>
      <Pressable accessibilityLabel="Forward 10 seconds" onPress={() => seek(10)} style={styles.smallButton}><RotateCw size={18} color="#A9B3FF" strokeWidth={2} /><Text style={styles.smallText}>10</Text></Pressable>
    </View>
    <View style={styles.actions}><Pressable accessibilityRole="button" accessibilityLabel="Stop audio" onPress={onStop} style={styles.actionButton}><Square size={14} color="#858D9D" fill="#858D9D" /><Text style={styles.actionText}>Stop</Text></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Share transcript" onPress={share} style={styles.actionButton}><Share2 size={14} color="#858D9D" /><Text style={styles.actionText}>{shareState === 'shared' ? 'Shared' : shareState === 'error' ? 'Retry Share' : 'Share Text'}</Text></Pressable></View>
  </View>;
}

const styles = StyleSheet.create({ card: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, marginBottom: 24, padding: 17 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, eyebrow: { color: '#626978', fontFamily: 'Vazirmatn_700Bold', fontSize: 9, letterSpacing: 1.5 }, voice: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 15, marginTop: 4 }, liveDot: { backgroundColor: '#A9B3FF', borderRadius: 4, height: 8, width: 8 }, track: { backgroundColor: '#282E3A', borderRadius: 3, height: 5, marginTop: 18, overflow: 'hidden' }, progress: { backgroundColor: '#A9B3FF', borderRadius: 3, height: 5 }, timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }, time: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 10 }, controls: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 15 }, smallButton: { alignItems: 'center', flexDirection: 'row', gap: 4, height: 38, justifyContent: 'center', width: 60 }, smallText: { color: '#A9B3FF', fontFamily: 'Vazirmatn_500Medium', fontSize: 11 }, playButton: { alignItems: 'center', backgroundColor: '#A9B3FF', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 }, actions: { flexDirection: 'row', gap: 8, marginTop: 10 }, actionButton: { alignItems: 'center', borderColor: '#252A35', borderRadius: 12, borderWidth: 1, flex: 1, flexDirection: 'row', gap: 7, justifyContent: 'center', paddingVertical: 8 }, actionText: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 11 } });
