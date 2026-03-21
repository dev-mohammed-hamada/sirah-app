import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { colors } from '../../theme';

interface SpeedTimerProps {
  durationMs: number; // total time for the timer
  running: boolean;
  onExpire?: () => void;
}

const RING_SIZE = 36;
const RING_THICKNESS = 3;

export function SpeedTimer({ durationMs, running }: SpeedTimerProps) {
  const progress = useSharedValue(1); // 1 = full, 0 = empty
  const pulseScale = useSharedValue(1);
  const isWarning = useSharedValue(0); // 0 or 1

  useEffect(() => {
    if (running) {
      progress.value = 1;
      progress.value = withTiming(0, {
        duration: durationMs,
        easing: Easing.linear,
      });
    } else {
      cancelAnimation(progress);
    }
  }, [running, durationMs]);

  // Warning pulse when time is low
  useEffect(() => {
    if (running) {
      const warningTimeout = setTimeout(
        () => {
          isWarning.value = 1;
          pulseScale.value = withRepeat(
            withSequence(withTiming(1.15, { duration: 500 }), withTiming(1, { duration: 500 })),
            -1,
            true,
          );
        },
        Math.max(0, durationMs - 3000),
      );

      return () => {
        clearTimeout(warningTimeout);
        isWarning.value = 0;
        cancelAnimation(pulseScale);
        pulseScale.value = 1;
      };
    }
  }, [running, durationMs]);

  // The ring is built with 4 quarter-circle segments that clip based on progress
  // For simplicity, we use a rotating mask approach with opacity
  const ringStyle = useAnimatedStyle(() => ({
    opacity: progress.value > 0 ? 1 : 0.3,
    transform: [{ scale: pulseScale.value }],
  }));

  const fillStyle = useAnimatedStyle(() => {
    const color = isWarning.value ? colors.sunsetOrange : colors.desertGold;
    return {
      borderColor: color,
      // Simulate depletion by changing the border from full to partial
      // We use a simple approach: rotate a mask
      opacity: Math.max(0.2, progress.value),
    };
  });

  return (
    <Animated.View style={[styles.container, ringStyle]}>
      <Animated.View style={[styles.ring, fillStyle]} />
      <View style={styles.innerCircle} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_THICKNESS,
    borderColor: colors.desertGold,
  },
  innerCircle: {
    width: RING_SIZE - RING_THICKNESS * 2 - 4,
    height: RING_SIZE - RING_THICKNESS * 2 - 4,
    borderRadius: (RING_SIZE - RING_THICKNESS * 2 - 4) / 2,
    backgroundColor: colors.deepNightBlueOverlay,
  },
});
