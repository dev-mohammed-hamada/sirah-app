import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { colors, typography, radius, spacing } from '../../theme';
import { AppText } from './app-text';

interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
}

export function InputField({ label, error, value, onFocus, onBlur, ...rest }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useSharedValue(value ? 1 : 0);
  const focusAnim = useSharedValue(0);

  const hasValue = Boolean(value);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    labelAnim.value = withTiming(1, { duration: 150 });
    focusAnim.value = withTiming(1, { duration: 150 });
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!hasValue) {
      labelAnim.value = withTiming(0, { duration: 150 });
    }
    focusAnim.value = withTiming(0, { duration: 150 });
    onBlur?.(e);
  };

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(labelAnim.value, [0, 1], [0, -26]) },
      { scale: interpolate(labelAnim.value, [0, 1], [1, 0.8]) },
    ],
  }));

  const borderStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? colors.errorRed
      : interpolateColor(focusAnim.value, [0, 1], ['#E0D5C5', colors.desertGold]);
    return { borderColor };
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, borderStyle]}>
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            error && { color: colors.errorRed },
            isFocused && !error && { color: colors.desertGold },
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          placeholderTextColor={colors.mutedGray}
          textAlign="right"
          {...rest}
        />
      </Animated.View>
      {error ? (
        <AppText variant="caption" color={colors.errorRed} style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  container: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: radius.sm,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  label: {
    position: 'absolute',
    end: spacing.lg,
    top: 14,
    ...typography.body,
    color: colors.mutedGray,
  },
  input: {
    flex: 1,
    ...typography.bodyLarge,
    color: colors.deepNightBlue,
    paddingTop: spacing.sm,
  },
  error: {
    marginTop: spacing.xs,
    paddingEnd: spacing.xs,
  },
});
