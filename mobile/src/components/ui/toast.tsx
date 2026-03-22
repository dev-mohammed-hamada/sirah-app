import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { colors, radius, spacing, shadows } from '../../theme';
import { AppText } from './app-text';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  visible: boolean;
  onDismiss: () => void;
}

export function Toast({
  message,
  type = 'success',
  duration = 3000,
  visible,
  onDismiss,
}: ToastProps) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });

      // Auto-dismiss
      translateY.value = withDelay(duration, withTiming(-100, { duration: 300 }));
      opacity.value = withDelay(
        duration,
        withTiming(0, { duration: 300 }, () => {
          runOnJS(onDismiss)();
        }),
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  const bgColor = type === 'success' ? colors.successGreen : colors.errorRed;

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }, animatedStyle]}>
      <AppText variant="bodyLarge" color={colors.starlightWhite}>
        {message}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    start: spacing.xl,
    end: spacing.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    zIndex: 1000,
    ...shadows.medium,
  },
});
