import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@expo-google-fonts/vazirmatn';
import { Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { DeviceTtsProvider } from './services/device-tts';
import type { VoiceProfile } from './services/tts';

const voices: VoiceProfile[] = [
  { id: 'american-female', name: 'American', gender: 'Female', accent: 'American', language: 'en-US' },
  { id: 'british-male', name: 'British', gender: 'Male', accent: 'British', language: 'en-GB' },
  { id: 'indian-female', name: 'Indian', gender: 'Female', accent: 'Indian', language: 'en-IN' },
];

const ttsProvider = new DeviceTtsProvider();

type GenerationState = 'idle' | 'speaking' | 'error';

export default function App() {
  const [fontsLoaded] = useFonts({
    Vazirmatn_400Regular,
    Vazirmatn_500Medium,
    Vazirmatn_700Bold,
    YoungSerif_400Regular,
  });
  const [text, setText] = useState('');
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [generationState, setGenerationState] = useState<GenerationState>('idle');

  useEffect(() => () => {
    void ttsProvider.stop();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const voice = voices[voiceIndex];
  const canGenerate = Boolean(text.trim());
  const isSpeaking = generationState === 'speaking';

  const nextVoice = () => {
    setVoiceIndex((current) => (current + 1) % voices.length);
    setGenerationState('idle');
  };

  const handleGenerate = async () => {
    if (!canGenerate) return;

    if (isSpeaking) {
      await ttsProvider.stop();
      setGenerationState('idle');
      return;
    }

    setGenerationState('speaking');

    try {
      await ttsProvider.speak({
        text: text.trim(),
        voice,
        settings: { rate: 1, pitch: 1 },
      });
    } catch {
      setGenerationState('error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.logo}>OVRINO</Text>
            <View style={[styles.statusDot, isSpeaking && styles.statusDotActive]} />
          </View>

          <View style={styles.hero}>
            <Text style={styles.title}>Give your words a voice.</Text>
            <Text style={styles.subtitle}>
              Paste anything. Choose a voice. Listen.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>TEXT</Text>
              <Text style={styles.characterCount}>{text.length}/2,000</Text>
            </View>

            <TextInput
              multiline
              maxLength={2000}
              onChangeText={(value) => {
                setText(value);
                if (generationState === 'error') setGenerationState('idle');
              }}
              placeholder="Write or paste something..."
              placeholderTextColor="#626978"
              scrollEnabled
              style={styles.textInput}
              textAlignVertical="top"
              value={text}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>VOICE</Text>
            <Pressable
              accessibilityHint="Changes the selected voice"
              accessibilityRole="button"
              accessibilityLabel={`Selected voice: ${voice.name}, ${voice.gender}. Tap to change.`}
              onPress={nextVoice}
              style={({ pressed }) => [styles.voiceCard, pressed && styles.voiceCardPressed]}
            >
              <View style={styles.voiceIcon}>
                <Text style={styles.voiceIconText}>◉</Text>
              </View>
              <View style={styles.voiceInfo}>
                <Text style={styles.voiceName}>{voice.name}</Text>
                <Text style={styles.voiceMeta}>{voice.gender} · Tap to change</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canGenerate, busy: isSpeaking }}
            accessibilityLabel={isSpeaking ? 'Stop speaking' : 'Generate voice'}
            disabled={!canGenerate}
            onPress={handleGenerate}
            style={({ pressed }) => [
              styles.generateButton,
              !canGenerate && styles.generateButtonDisabled,
              pressed && canGenerate && styles.generateButtonPressed,
            ]}
          >
            {isSpeaking ? (
              <>
                <View style={styles.stopIcon} />
                <Text style={styles.generateText}>Stop Speaking</Text>
              </>
            ) : (
              <>
                {generationState === 'error' ? (
                  <Text style={styles.errorIcon}>!</Text>
                ) : (
                  <Text style={styles.generateIcon}>▶</Text>
                )}
                <Text style={styles.generateText}>
                  {generationState === 'error' ? 'Try Again' : 'Generate Voice'}
                </Text>
              </>
            )}
          </Pressable>

          {isSpeaking && (
            <View style={styles.statusMessage}>
              <ActivityIndicator size="small" />
              <Text style={styles.statusText}>Speaking with {voice.name}</Text>
            </View>
          )}

          {generationState === 'error' && (
            <Text accessibilityRole="alert" style={styles.errorMessage}>
              Ovrino couldn't start speech. Check the selected device voice and try again.
            </Text>
          )}

          <Text style={styles.footer}>Your words, your voice.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B0D12' },
  keyboardView: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 22, paddingBottom: 32 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 42 },
  logo: { color: '#F4F6FA', fontFamily: 'YoungSerif_400Regular', fontSize: 22, letterSpacing: 2 },
  statusDot: { backgroundColor: '#4A5260', borderRadius: 5, height: 10, width: 10 },
  statusDotActive: { backgroundColor: '#A9B3FF' },
  hero: { marginBottom: 32 },
  title: { color: '#F4F6FA', fontFamily: 'YoungSerif_400Regular', fontSize: 32, lineHeight: 40, maxWidth: 330 },
  subtitle: { color: '#858D9D', fontFamily: 'Vazirmatn_400Regular', fontSize: 14, lineHeight: 22, marginTop: 10 },
  section: { marginBottom: 24 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: '#858D9D', fontFamily: 'Vazirmatn_700Bold', fontSize: 11, letterSpacing: 1.6 },
  characterCount: { color: '#555D6B', fontFamily: 'Vazirmatn_400Regular', fontSize: 11 },
  textInput: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, color: '#F4F6FA', fontFamily: 'Vazirmatn_400Regular', fontSize: 16, lineHeight: 27, minHeight: 170, padding: 17 },
  voiceCard: { alignItems: 'center', backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, flexDirection: 'row', minHeight: 76, paddingHorizontal: 14 },
  voiceCardPressed: { opacity: 0.8 },
  voiceIcon: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 14, height: 48, justifyContent: 'center', width: 48 },
  voiceIconText: { color: '#A9B3FF', fontSize: 20 },
  voiceInfo: { flex: 1, marginLeft: 14 },
  voiceName: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 16 },
  voiceMeta: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, marginTop: 4 },
  chevron: { color: '#727B8C', fontSize: 27, fontWeight: '300', marginLeft: 10 },
  generateButton: { alignItems: 'center', backgroundColor: '#A9B3FF', borderRadius: 17, flexDirection: 'row', height: 58, justifyContent: 'center', marginTop: 4 },
  generateButtonDisabled: { backgroundColor: '#252A35' },
  generateButtonPressed: { opacity: 0.82 },
  generateIcon: { color: '#0B0D12', fontSize: 13, marginRight: 9 },
  stopIcon: { backgroundColor: '#0B0D12', borderRadius: 2, height: 12, marginRight: 9, width: 12 },
  errorIcon: { alignItems: 'center', color: '#0B0D12', fontFamily: 'Vazirmatn_700Bold', fontSize: 15, marginRight: 9 },
  generateText: { color: '#0B0D12', fontFamily: 'Vazirmatn_700Bold', fontSize: 15 },
  statusMessage: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  statusText: { color: '#727B8C', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, marginLeft: 8 },
  errorMessage: { color: '#B9A0A8', fontFamily: 'Vazirmatn_400Regular', fontSize: 12, lineHeight: 19, marginTop: 12, textAlign: 'center' },
  footer: { color: '#454C59', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 'auto', paddingTop: 30, textAlign: 'center' },
});
