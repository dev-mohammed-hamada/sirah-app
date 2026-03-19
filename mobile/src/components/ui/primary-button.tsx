import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, typography, radius } from '../../theme';
import { AppText } from './app-text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PrimaryButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PrimaryButton({
  title,
  disabled = false,
  onPress,
  style,
  ...rest
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
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
      <AppText variant="bodyLarge" color={colors.deepNightBlue} style={styles.text}>
        {title}
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.desertGold,
    height: 48,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    ...typography.bodyLarge,
    fontFamily: typography.h2.fontFamily, // Cairo Bold for buttons
  },
});
