import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { colors, radius, spacing, shadows } from '../../theme';

interface CardProps extends ViewProps {
  style?: ViewStyle;
}

export function Card({ style, children, ...rest }: CardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    padding: spacing.lg,
    ...shadows.soft,
  },
});
