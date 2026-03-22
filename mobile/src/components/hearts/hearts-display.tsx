import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { spacing } from '../../theme';
import { HeartIcon } from './heart-icon';

interface HeartsDisplayProps {
  hearts: number;
  maxHearts?: number;
  size?: number;
  animate?: boolean;
  style?: ViewStyle;
}

export function HeartsDisplay({
  hearts,
  maxHearts = 5,
  size = 18,
  animate = true,
  style,
}: HeartsDisplayProps) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: maxHearts }).map((_, i) => (
        <HeartIcon key={i} index={i} filled={i < hearts} size={size} animate={animate} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
