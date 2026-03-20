import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';

interface DailyBannerProps {
  onPress?: () => void;
}

export function DailyBanner({ onPress }: DailyBannerProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const wobbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.container, wobbleStyle]}>
      <Pressable style={styles.inner} onPress={onPress}>
        <AppText style={styles.text}>⚡ {ar.home.dailyChallengeReady}</AppText>
        <View style={styles.button}>
          <AppText style={styles.buttonText}>{ar.home.start}</AppText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.warmSand,
    borderWidth: 1.5,
    borderColor: colors.desertGold,
    borderRadius: radius.md,
    ...shadows.medium,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'right',
  },
  button: {
    backgroundColor: colors.desertGold,
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
});
