import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { AppText } from '../ui/app-text';

interface HeartIconProps {
  filled: boolean;
  index: number;
  size?: number;
  animate?: boolean;
  style?: ViewStyle;
}

export function HeartIcon({ filled, index, size = 18, animate = true, style }: HeartIconProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(filled ? 1 : 0.4);
  const prevFilled = React.useRef(filled);

  useEffect(() => {
    if (!animate) {
      opacity.value = filled ? 1 : 0.4;
      return;
    }

    // Heart break animation: filled -> empty
    if (prevFilled.current && !filled) {
      // Shake, shrink, then settle
      scale.value = withSequence(
        withTiming(1.3, { duration: 100 }),
        withTiming(0.6, { duration: 150, easing: Easing.out(Easing.quad) }),
        withSpring(1, { damping: 8, stiffness: 200 }),
      );
      rotation.value = withSequence(
        withTiming(15, { duration: 60 }),
        withTiming(-15, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(-10, { duration: 60 }),
        withTiming(0, { duration: 80 }),
      );
      opacity.value = withDelay(100, withTiming(0.4, { duration: 200 }));
    }

    // Heart refill animation: empty -> filled
    if (!prevFilled.current && filled) {
      scale.value = withSequence(
        withTiming(0.5, { duration: 50 }),
        withSpring(1.2, { damping: 6, stiffness: 300 }),
        withSpring(1, { damping: 12, stiffness: 200 }),
      );
      opacity.value = withTiming(1, { duration: 200 });
    }

    prevFilled.current = filled;
  }, [filled, animate, scale, rotation, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, animatedStyle, style]}>
      <AppText style={[styles.emoji, { fontSize: size - 2 }]}>
        {filled ? '\u2764\uFE0F' : '\uD83E\uDD0D'}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    textAlign: 'center',
  },
});
