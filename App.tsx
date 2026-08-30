import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@expo-google-fonts/vazirmatn';
import { Vazirmatn_400Regular, Vazirmatn_500Medium, Vazirmatn_700Bold } from '@expo-google-fonts/vazirmatn';
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif';
import { useState } from 'react';
import {
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

const voices = [
  { name: 'American', gender: 'Female' },
  { name: 'British', gender: 'Male' },
  { name: 'Indian', gender: 'Female' },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Vazirmatn_400Regular,
    Vazirmatn_500Medium,
    Vazirmatn_700Bold,
    YoungSerif_400Regular,
  });
  const [text, setText] = useState('');
  const [voiceIndex, setVoiceIndex] = useState(0);

  if (!fontsLoaded) {
    return null;
  }

  const voice = voices[voiceIndex];

  const nextVoice = () => {
    setVoiceIndex((current) => (current + 1) % voices.length);
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
            <View>
              <Text style={styles.logo}>OVRINO</Text>
              <Text style={styles.persianLogo}>اُورینو</Text>
            </View>
            <View style={styles.statusDot} />
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
              onChangeText={setText}
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
            <Pressable onPress={nextVoice} style={styles.voiceCard}>
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
            disabled={!text.trim()}
            style={({ pressed }) => [
              styles.generateButton,
              !text.trim() && styles.generateButtonDisabled,
              pressed && text.trim() && styles.generateButtonPressed,
            ]}
          >
            <Text style={styles.generateIcon}>▶</Text>
            <Text style={styles.generateText}>Generate Voice</Text>
          </Pressable>

          <Text style={styles.footer}>اُورینو · Your words, your voice.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0D12',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42,
  },
  logo: {
    color: '#F4F6FA',
    fontFamily: 'YoungSerif_400Regular',
    fontSize: 22,
    letterSpacing: 2,
  },
  persianLogo: {
    color: '#A9B3FF',
    fontFamily: 'Vazirmatn_500Medium',
    fontSize: 13,
    marginTop: 2,
  },
  statusDot: {
    backgroundColor: '#8B9CFF',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  hero: {
    marginBottom: 32,
  },
  title: {
    color: '#F4F6FA',
    fontFamily: 'YoungSerif_400Regular',
    fontSize: 32,
    lineHeight: 40,
    maxWidth: 330,
  },
  subtitle: {
    color: '#858D9D',
    fontFamily: 'Vazirmatn_400Regular',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#858D9D',
    fontFamily: 'Vazirmatn_700Bold',
    fontSize: 11,
    letterSpacing: 1.6,
  },
  characterCount: {
    color: '#555D6B',
    fontFamily: 'Vazirmatn_400Regular',
    fontSize: 11,
  },
  textInput: {
    backgroundColor: '#13161D',
    borderColor: '#252A35',
    borderRadius: 18,
    borderWidth: 1,
    color: '#F4F6FA',
    fontFamily: 'Vazirmatn_400Regular',
    fontSize: 16,
    lineHeight: 27,
    minHeight: 170,
    padding: 17,
  },
  voiceCard: {
    alignItems: 'center',
    backgroundColor: '#13161D',
    borderColor: '#252A35',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 76,
    paddingHorizontal: 14,
  },
  voiceIcon: {
    alignItems: 'center',
    backgroundColor: '#202532',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  voiceIconText: {
    color: '#A9B3FF',
    fontSize: 20,
  },
  voiceInfo: {
    flex: 1,
    marginLeft: 14,
  },
  voiceName: {
    color: '#F4F6FA',
    fontFamily: 'Vazirmatn_500Medium',
    fontSize: 16,
  },
  voiceMeta: {
    color: '#727B8C',
    fontFamily: 'Vazirmatn_400Regular',
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    color: '#727B8C',
    fontSize: 27,
    fontWeight: '300',
    marginLeft: 10,
  },
  generateButton: {
    alignItems: 'center',
    backgroundColor: '#A9B3FF',
    borderRadius: 17,
    flexDirection: 'row',
    height: 58,
    justifyContent: 'center',
    marginTop: 4,
  },
  generateButtonDisabled: {
    backgroundColor: '#252A35',
  },
  generateButtonPressed: {
    opacity: 0.82,
  },
  generateIcon: {
    color: '#0B0D12',
    fontSize: 13,
    marginRight: 9,
  },
  generateText: {
    color: '#0B0D12',
    fontFamily: 'Vazirmatn_700Bold',
    fontSize: 15,
  },
  footer: {
    color: '#454C59',
    fontFamily: 'Vazirmatn_400Regular',
    fontSize: 11,
    marginTop: 'auto',
    paddingTop: 30,
    textAlign: 'center',
  },
});
