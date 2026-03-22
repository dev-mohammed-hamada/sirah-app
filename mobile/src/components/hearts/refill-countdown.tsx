import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';
import { useHeartsStore } from '../../stores/hearts-store';

function toArabicNumeral(n: number): string {
  return String(n).replace(
    /[0-9]/g,
    (d) => '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'[parseInt(d)],
  );
}

function formatCountdown(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${toArabicNumeral(mins)}:${toArabicNumeral(secs).padStart(2, '\u0660')}`;
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
