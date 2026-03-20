import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { colors, typography, radius, spacing } from '../../theme';
import { AppText } from './app-text';

interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  valid?: boolean;
  icon?: React.ReactNode;
  onIconPress?: () => void;
}

export function InputField({
  label,
  error,
  valid,
  value,
  icon,
  onIconPress,
  onFocus,
  onBlur,
  ...rest
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 150 });
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 150 });
    onBlur?.(e);
  };

  const borderStyle = useAnimatedStyle(() => {
    if (error) {
      return {
        borderColor: colors.errorRed,
      };
    }
    if (valid) {
      return {
        borderColor: colors.successGreen,
      };
    }
    const borderColor = interpolateColor(focusAnim.value, [0, 1], ['#E0D5C5', colors.desertGold]);
    return { borderColor };
  });

  const getLabelColor = () => {
    if (error) return colors.errorRed;
    if (isFocused) return colors.desertGold;
    return colors.mutedGray;
  };

  return (
    <View style={styles.wrapper}>
      {/* Label above input */}
      <AppText variant="caption" color={getLabelColor()} style={styles.label}>
        {label}
      </AppText>

      {/* Input container */}
      <Animated.View
        style={[
          styles.container,
          borderStyle,
          error && styles.containerError,
          isFocused && !error && styles.containerFocused,
        ]}
      >
        <TextInput
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          placeholderTextColor={`${colors.mutedGray}80`}
          textAlign="right"
          {...rest}
        />
        {icon && (
          <Pressable onPress={onIconPress} style={styles.iconButton}>
            {icon}
          </Pressable>
        )}
      </Animated.View>

      {/* Error text */}
      {error && error.trim() !== '' ? (
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
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  container: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  containerFocused: {
    shadowColor: colors.desertGold,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  containerError: {
    shadowColor: colors.errorRed,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.bodyLarge,
    color: colors.deepNightBlue,
  },
  iconButton: {
    marginStart: spacing.sm,
  },
  error: {
    marginTop: spacing.xs,
    paddingEnd: spacing.xs,
  },
});
