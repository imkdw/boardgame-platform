import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEasterEgg } from '../hooks/use-easter-egg';

interface Props {
  onTrigger: () => void;
}

export function EasterEggArea({ onTrigger }: Props) {
  const { handleTap } = useEasterEgg(onTrigger);
  const insets = useSafeAreaInsets();

  const onPress = () => {
    Alert.alert('Tap!', 'Touch registered');
    handleTap();
  };

  return (
    <TouchableOpacity
      style={[
        styles.area,
        {
          top: insets.top || 20,
          right: insets.right || 20,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.5}
    />
  );
}

const styles = StyleSheet.create({
  area: {
    position: 'absolute',
    width: 80,
    height: 80,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: 'red',
  },
});
