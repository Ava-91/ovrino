import { Pressable, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

type Props = { active: boolean; onPress: () => void; label?: string };

export function FavoriteButton({ active, onPress, label = 'Favorite' }: Props) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} accessibilityLabel={`${active ? 'Remove from' : 'Add to'} ${label}`} hitSlop={8} onPress={onPress} style={styles.button}>
    <Star size={23} color={active ? '#A9B3FF' : '#727B8C'} fill={active ? '#A9B3FF' : 'transparent'} strokeWidth={1.8} />
  </Pressable>;
}

const styles = StyleSheet.create({ button: { alignItems: 'center', justifyContent: 'center', minHeight: 40, minWidth: 40 } });
