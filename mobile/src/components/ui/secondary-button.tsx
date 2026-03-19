import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { colors, typography, radius } from '../../theme';
import { AppText } from './app-text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SecondaryButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function SecondaryButton({
  title,
  disabled = false,
  onPress,
  style,
  ...rest
}: SecondaryButtonProps) {
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: `rgba(212, 168, 67, ${bgOpacity.value})`,
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
    bgOpacity.value = withTiming(0.1, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    bgOpacity.value = withTiming(0, { duration: 200 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, animatedStyle, style]}
      {...rest}
    >
      <AppText variant="bodyLarge" color={colors.desertGold} style={styles.text}>
        {title}
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.desertGold,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    ...typography.bodyLarge,
    fontFamily: typography.h2.fontFamily,
  },
});
