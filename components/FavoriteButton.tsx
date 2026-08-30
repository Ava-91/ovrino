import { Pressable, StyleSheet, Text } from 'react-native';

type Props = { active: boolean; onPress: () => void; label?: string };

export function FavoriteButton({ active, onPress, label = 'Favorite' }: Props) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} accessibilityLabel={`${active ? 'Remove from' : 'Add to'} ${label}`} hitSlop={8} onPress={onPress} style={styles.button}>
    <Text style={[styles.icon, active && styles.active]}>{active ? '★' : '☆'}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({ button: { alignItems: 'center', justifyContent: 'center', minHeight: 40, minWidth: 40 }, icon: { color: '#727B8C', fontSize: 23 }, active: { color: '#A9B3FF' } });
