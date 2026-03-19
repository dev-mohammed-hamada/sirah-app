import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';
import { AppText } from './app-text';

interface TextButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function TextButton({ title, disabled = false, onPress, style, ...rest }: TextButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}
    >
      <AppText variant="bodyLarge" color={colors.desertGold} style={styles.text}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontWeight: '700',
  },
});
