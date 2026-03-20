import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../theme';

interface NarratorSilhouetteProps {
  /** Scale multiplier (default 1) */
  scale?: number;
  /** Show waving arm animation (login screen) */
  waving?: boolean;
  /** Override silhouette color */
  color?: string;
}

export function NarratorSilhouette({
  scale = 1,
  waving = false,
  color = colors.deepNightBlue,
}: NarratorSilhouetteProps) {
  const armRotation = useSharedValue(0);

  useEffect(() => {
    if (waving) {
      armRotation.value = withRepeat(
        withSequence(
          withTiming(-20, { duration: 375, easing: Easing.inOut(Easing.ease) }),
          withTiming(10, { duration: 375, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 375, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [waving]);

  const armStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${armRotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      {/* Head */}
      <View style={[styles.head, { backgroundColor: color }]}>
        {/* Headwear / Imamah */}
        <View style={[styles.headwear, { backgroundColor: color }]} />
      </View>
      {/* Body */}
      <View style={[styles.body, { backgroundColor: color }]}>
        {/* Waving arm */}
        {waving && <Animated.View style={[styles.arm, { backgroundColor: color }, armStyle]} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 90,
    alignItems: 'center',
    position: 'relative',
  },
  head: {
    width: 28,
    height: 28,
    borderRadius: 14,
    zIndex: 2,
    marginBottom: -8,
  },
  headwear: {
    position: 'absolute',
    top: -4,
    alignSelf: 'center',
    width: 36,
    height: 12,
    borderRadius: 18,
    start: -4,
  },
  body: {
    width: 44,
    height: 56,
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    position: 'relative',
  },
  arm: {
    position: 'absolute',
    top: 8,
    start: -12,
    width: 16,
    height: 8,
    borderRadius: 4,
  },
});
