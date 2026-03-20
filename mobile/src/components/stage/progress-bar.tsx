import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../theme';

interface ProgressBarProps {
  /** Progress value between 0 and 1 */
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress * 100, {
      duration: 400,
      easing: Easing.out(Easing.ease),
    });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 4,
    backgroundColor: colors.sandTrack,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.desertGold,
    borderRadius: 2,
  },
});
