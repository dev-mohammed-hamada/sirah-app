import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';
import { useHeartsStore } from '../../stores/hearts-store';
import { toAr } from '../../utils/arabic-numerals';

function formatCountdown(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${toAr(mins)}:${toAr(secs).padStart(2, '\u0660')}`;
}

interface RefillCountdownProps {
  style?: ViewStyle;
  compact?: boolean;
}

export function RefillCountdown({ style, compact = false }: RefillCountdownProps) {
  const getSecondsUntilRefill = useHeartsStore((s) => s.getSecondsUntilRefill);
  const checkAndRefill = useHeartsStore((s) => s.checkAndRefill);
  const isFull = useHeartsStore((s) => s.isFull);

  const [seconds, setSeconds] = useState(() => getSecondsUntilRefill());

  useEffect(() => {
    if (isFull()) return;

    const interval = setInterval(() => {
      const remaining = getSecondsUntilRefill();
      setSeconds(remaining);

      if (remaining <= 0) {
        checkAndRefill();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getSecondsUntilRefill, checkAndRefill, isFull]);

  if (isFull()) return null;

  if (compact) {
    return (
      <View style={[styles.compactRow, style]}>
        <AppText style={styles.compactTimer}>{formatCountdown(seconds)}</AppText>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.label}>{ar.quiz.heartsRefillIn}</AppText>
      <AppText style={styles.timer}>{formatCountdown(seconds)}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  timer: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.sunsetOrange,
    textAlign: 'center',
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  compactTimer: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.sunsetOrange,
    textAlign: 'center',
  },
});
