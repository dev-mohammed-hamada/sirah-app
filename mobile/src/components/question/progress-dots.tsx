import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing } from '../../theme';

interface ProgressDotsProps {
  total: number;
  current: number; // 0-indexed
  answered: number; // how many answered so far
}

export function ProgressDots({ total, current, answered }: ProgressDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} status={i < answered ? 'completed' : i === current ? 'current' : 'upcoming'} />
      ))}
    </View>
  );
}

function Dot({ status }: { status: 'completed' | 'current' | 'upcoming' }) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (status === 'current') {
      glowOpacity.value = withRepeat(
        withSequence(withTiming(1, { duration: 800 }), withTiming(0.3, { duration: 800 })),
        -1,
        true,
      );
    }
    if (status === 'completed') {
      // Pop animation when completing
      scale.value = withSequence(
        withSpring(1.3, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 150 }),
      );
    }
  }, [status]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const size = status === 'current' ? 10 : 8;

  return (
    <View style={styles.dotWrapper}>
      {status === 'current' && (
        <Animated.View
          style={[
            styles.glow,
            { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2 },
            glowStyle,
          ]}
        />
      )}
      <Animated.View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          status === 'completed' && styles.dotCompleted,
          status === 'current' && styles.dotCurrent,
          status === 'upcoming' && styles.dotUpcoming,
          dotStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dotWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
  },
  dotCompleted: {
    backgroundColor: colors.desertGold,
  },
  dotCurrent: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.desertGold,
  },
  dotUpcoming: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.starlightWhiteDim,
  },
  glow: {
    position: 'absolute',
    backgroundColor: colors.desertGoldGlow,
  },
});
