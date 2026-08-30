import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@expo-google-fonts/vazirmatn';
import { Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DeviceTtsProvider } from './services/device-tts';
import type { VoiceProfile } from './services/tts';
import { VOICES, type VoiceOption } from './data/voices';
import { VOICE_PRESETS, type VoicePreset } from './data/voice-presets';
import { VoicePicker } from './components/VoicePicker';
import { AudioPlayerCard } from './components/AudioPlayerCard';
import { VoiceControls } from './components/VoiceControls';

const ttsProvider = new DeviceTtsProvider();
type GenerationState = 'idle' | 'speaking' | 'error';

export default function App() {
  const [fontsLoaded] = useFonts({ Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_700Bold, YoungSerif_400Regular });
  const [text, setText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState(VOICES[0].id);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const selectedVoice = useMemo(() => VOICES.find((voice) => voice.id === selectedVoiceId) ?? VOICES[0], [selectedVoiceId]);
  useEffect(() => () => { void ttsProvider.stop(); }, []);
  if (!fontsLoaded) return null;

  const canGenerate = Boolean(text.trim());
  const isSpeaking = generationState === 'speaking';
  const toTtsVoice = (voice: VoiceOption): VoiceProfile => ({ id: voice.id, name: voice.name, gender: voice.gender, accent: voice.accent, language: 'en-US' });
  const stopSpeech = async () => { await ttsProvider.stop(); setGenerationState('idle'); };

  const previewVoice = async (voice: VoiceOption) => {
    await stopSpeech(); setGenerationState('speaking');
    try { await ttsProvider.speak({ text: `This is the ${voice.name} voice preview.`, voice: toTtsVoice(voice), settings: { rate, pitch } }); setGenerationState('idle'); }
    catch { setGenerationState('error'); }
  };

  const handleGenerate = async () => {
    if (!canGenerate) return;
    if (isSpeaking) { await stopSpeech(); return; }
    setGenerationState('speaking'); setHasGenerated(true);
    try { await ttsProvider.speak({ text: text.trim(), voice: toTtsVoice(selectedVoice), settings: { rate, pitch } }); setGenerationState('idle'); }
    catch { setGenerationState('error'); }
  };

  const applyPreset = (preset: VoicePreset) => { setRate(preset.rate); setPitch(preset.pitch); setGenerationState('idle'); };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.header}><Text style={styles.logo}>OVRINO</Text><View style={[styles.statusDot, isSpeaking && styles.statusDotActive]} /></View>
          <View style={styles.hero}><Text style={styles.title}>Give your words a voice.</Text><Text style={styles.subtitle}>Paste anything. Choose a voice. Listen.</Text></View>

          {hasGenerated && canGenerate && <AudioPlayerCard text={text} voiceName={selectedVoice.name} playing={isSpeaking} onPlayPause={handleGenerate} onStop={stopSpeech} />}

          <View style={styles.section}>
            <View style={styles.sectionHeader}><Text style={styles.label}>TEXT</Text><Text style={styles.characterCount}>{text.length}/2,000</Text></View>
            <TextInput multiline maxLength={2000} onChangeText={(value) => { setText(value); if (generationState === 'error') setGenerationState('idle'); }} placeholder="Write or paste something..." placeholderTextColor="#626978" style={styles.textInput} textAlignVertical="top" value={text} />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}><Text style={styles.label}>VOICE</Text><Text style={styles.characterCount}>{selectedVoice.accent}</Text></View>
            <Pressable accessibilityRole="button" accessibilityLabel={`Selected voice: ${selectedVoice.name}. Tap to browse voices.`} onPress={() => setPickerVisible(true)} style={({ pressed }) => [styles.voiceCard, pressed && styles.voiceCardPressed]}>
              <View style={styles.voiceIcon}><Text style={styles.voiceIconText}>{selectedVoice.name.charAt(0)}</Text></View>
              <View style={styles.voiceInfo}><Text style={styles.voiceName}>{selectedVoice.name}</Text><Text style={styles.voiceMeta}>{selectedVoice.accent} · {selectedVoice.gender} · Tap to change</Text></View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          </View>

          <VoiceControls rate={rate} pitch={pitch} presets={VOICE_PRESETS} onRateChange={setRate} onPitchChange={setPitch} onPreset={applyPreset} />

          <Pressable accessibilityRole="button" accessibilityState={{ disabled: !canGenerate, busy: isSpeaking }} accessibilityLabel={isSpeaking ? 'Stop speaking' : 'Generate voice'} disabled={!canGenerate} onPress={handleGenerate} style={({ pressed }) => [styles.generateButton, !canGenerate && styles.generateButtonDisabled, pressed && canGenerate && styles.generateButtonPressed]}>
            {isSpeaking ? <><View style={styles.stopIcon} /><Text style={styles.generateText}>Stop Speaking</Text></> : <><Text style={styles.generateIcon}>{generationState === 'error' ? '!' : '▶'}</Text><Text style={styles.generateText}>{generationState === 'error' ? 'Try Again' : 'Generate Voice'}</Text></>}
          </Pressable>
          {isSpeaking && <View style={styles.statusMessage}><ActivityIndicator size="small" /><Text style={styles.statusText}>Speaking with {selectedVoice.name}</Text></View>}
          {generationState === 'error' && <Text accessibilityRole="alert" style={styles.errorMessage}>Ovrino couldn't start speech. Check the selected device voice and try again.</Text>}
          <Text style={styles.footer}>Your words, your voice.</Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal animationType="slide" onRequestClose={() => setPickerVisible(false)} visible={pickerVisible}>
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}><Text style={styles.modalTitle}>Choose a voice</Text><Pressable accessibilityLabel="Close voice picker" onPress={() => setPickerVisible(false)} style={styles.closeButton}><Text style={styles.closeText}>×</Text></Pressable></View>
          <VoicePicker voices={VOICES} selectedVoiceId={selectedVoiceId} onPreview={previewVoice} onSelect={(voice) => { setSelectedVoiceId(voice.id); setGenerationState('idle'); setPickerVisible(false); }} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B0D12' }, modalSafeArea: { backgroundColor: '#0B0D12', flex: 1, paddingHorizontal: 20, paddingTop: 16 }, keyboardView: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 22, paddingBottom: 32 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 42 }, logo: { color: '#F4F6FA', fontFamily: 'YoungSerif_400Regular', fontSize: 22, letterSpacing: 2 }, statusDot: { backgroundColor: '#4A5260', borderRadius: 5, height: 10, width: 10 }, statusDotActive: { backgroundColor: '#A9B3FF' }, hero: { marginBottom: 32 }, title: { color: '#F4F6FA', fontFamily: 'YoungSerif_400Regular', fontSize: 32, lineHeight: 40, maxWidth: 330 }, subtitle: { color: '#858D9D', fontFamily: 'Vazirmatn_400Regular', fontSize: 14, lineHeight: 22, marginTop: 10 }, section: { marginBottom: 24 }, sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }, label: { color: '#858D9D', fontFamily: 'Vazirmatn_700Bold', fontSize: 11, letterSpacing: 1.6 }, characterCount: { color: '#555D6B', fontFamily: 'Vazirmatn_400Regular', fontSize: 11 }, textInput: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, color: '#F4F6FA', fontFamily: 'Vazirmatn_400Regular', fontSize: 16, lineHeight: 27, minHeight: 170, padding: 17 }, voiceCard: { alignItems: 'center', backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, flexDirection: 'row', minHeight: 76, paddingHorizontal: 14 }, voiceCardPressed: { opacity: 0.8 }, voiceIcon: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 14, height: 48, justifyContent: 'center', width: 48 }, voiceIconText: { color: '#A9B3FF', fontFamily: 'YoungSerif_400Regular', fontSize: 20 }, voiceInfo: { flex: 1, marginLeft: 14 }, voiceName: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 16 }, voiceMeta: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, marginTop: 4 }, chevron: { color: '#727B8C', fontSize: 27, fontWeight: '300', marginLeft: 10 }, generateButton: { alignItems: 'center', backgroundColor: '#A9B3FF', borderRadius: 17, flexDirection: 'row', height: 58, justifyContent: 'center', marginTop: 4 }, generateButtonDisabled: { backgroundColor: '#252A35' }, generateButtonPressed: { opacity: 0.82 }, generateIcon: { color: '#0B0D12', fontSize: 13, marginRight: 9 }, stopIcon: { backgroundColor: '#0B0D12', borderRadius: 2, height: 12, marginRight: 9, width: 12 }, generateText: { color: '#0B0D12', fontFamily: 'Vazirmatn_700Bold', fontSize: 15 }, statusMessage: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 14 }, statusText: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, marginLeft: 8 }, errorMessage: { color: '#B9A0A8', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, lineHeight: 19, marginTop: 12, textAlign: 'center' }, footer: { color: '#454C59', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 'auto', paddingTop: 30, textAlign: 'center' }, modalHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }, modalTitle: { color: '#F4F6FA', fontFamily: 'YoungSerif_400Regular', fontSize: 24 }, closeButton: { alignItems: 'center', backgroundColor: '#181C24', borderRadius: 20, height: 40, justifyContent: 'center', width: 40 }, closeText: { color: '#F4F6FA', fontSize: 27, lineHeight: 30 },
});
