import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../ui/app-text';
import { colors, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.text} color={colors.mutedGray}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xxl,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
  },
});
