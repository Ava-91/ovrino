import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { VoicePreset } from '../data/voice-presets';

type VoiceControlsProps = {
  rate: number;
  pitch: number;
  presets: VoicePreset[];
  onRateChange: (rate: number) => void;
  onPitchChange: (pitch: number) => void;
  onPreset: (preset: VoicePreset) => void;
};

function Stepper({ label, value, suffix, onDecrease, onIncrease, min, max }: { label: string; value: number; suffix?: string; onDecrease: () => void; onIncrease: () => void; min: number; max: number }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowInfo}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value.toFixed(2)}{suffix ?? ''}</Text></View>
      <View style={styles.stepper}>
        <Pressable accessibilityLabel={`Decrease ${label}`} accessibilityState={{ disabled: value <= min }} disabled={value <= min} onPress={onDecrease} style={styles.stepButton}><Text style={styles.stepText}>−</Text></Pressable>
        <Pressable accessibilityLabel={`Increase ${label}`} accessibilityState={{ disabled: value >= max }} disabled={value >= max} onPress={onIncrease} style={styles.stepButton}><Text style={styles.stepText}>+</Text></Pressable>
      </View>
    </View>
  );
}

export function VoiceControls({ rate, pitch, presets, onRateChange, onPitchChange, onPreset }: VoiceControlsProps) {
  const activePreset = presets.find((preset) => Math.abs(preset.rate - rate) < 0.001 && Math.abs(preset.pitch - pitch) < 0.001)?.id;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VOICE CONTROLS</Text>
      <Text style={styles.subtitle}>Shape the delivery before you generate.</Text>
      <View style={styles.presets}>
        {presets.map((preset) => {
          const active = preset.id === activePreset;
          return <Pressable key={preset.id} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => onPreset(preset)} style={[styles.preset, active && styles.presetActive]}>
            <Text style={[styles.presetName, active && styles.presetNameActive]}>{preset.name}</Text>
            <Text style={[styles.presetDescription, active && styles.presetDescriptionActive]}>{preset.description}</Text>
          </Pressable>;
        })}
      </View>
      <Stepper label="Speed" value={rate} suffix="×" min={0.25} max={2} onDecrease={() => onRateChange(Math.max(0.25, Number((rate - 0.1).toFixed(2))))} onIncrease={() => onRateChange(Math.min(2, Number((rate + 0.1).toFixed(2))))} />
      <Stepper label="Pitch" value={pitch} min={0.5} max={1.5} onDecrease={() => onPitchChange(Math.max(0.5, Number((pitch - 0.1).toFixed(2))))} onIncrease={() => onPitchChange(Math.min(1.5, Number((pitch + 0.1).toFixed(2))))} />
      <Text style={styles.note}>Pitch response depends on the installed TTS engine. Ovrino keeps a wider usable range here; production voices may expose stronger pitch/style controls.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#13161D', borderColor: '#252A35', borderRadius: 18, borderWidth: 1, marginBottom: 24, padding: 16 },
  title: { color: '#858D9D', fontFamily: 'Vazirmatn_700Bold', fontSize: 10, letterSpacing: 1.5 },
  subtitle: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 11, marginTop: 5 },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  preset: { backgroundColor: '#1A1F29', borderColor: '#252A35', borderRadius: 12, borderWidth: 1, flexGrow: 1, minWidth: '46%', minHeight: 62, padding: 10 },
  presetActive: { backgroundColor: '#22283A', borderColor: '#A9B3FF' },
  presetName: { color: '#F4F6FA', fontFamily: 'Vazirmatn_500Medium', fontSize: 12 },
  presetNameActive: { color: '#A9B3FF' },
  presetDescription: { color: '#626978', fontFamily: 'Vazirmatn_400Regular', fontSize: 9, marginTop: 2 },
  presetDescriptionActive: { color: '#9DA6C8' },
  row: { alignItems: 'center', borderTopColor: '#252A35', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 12 },
  rowInfo: { flexDirection: 'row', gap: 10 },
  label: { color: '#858D9D', fontFamily: 'Vazirmatn_500Medium', fontSize: 12 },
  value: { color: '#A9B3FF', fontFamily: 'Vazirmatn_500Medium', fontSize: 12 },
  stepper: { flexDirection: 'row', gap: 6 },
  stepButton: { alignItems: 'center', backgroundColor: '#202532', borderRadius: 10, height: 32, justifyContent: 'center', width: 36 },
  stepText: { color: '#F4F6FA', fontSize: 18 },
  note: { color: '#555D6B', fontFamily: 'Vazirmatn_400Regular', fontSize: 9, lineHeight: 15, marginTop: 13 },
});
