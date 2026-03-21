import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../ui/app-text';
import { PrimaryButton } from '../ui/primary-button';
import { ar } from '../../i18n/ar';

interface HeartsDepletionModalProps {
  visible: boolean;
  onRetry: () => void;
  onBackToMap: () => void;
}

const REFILL_SECONDS = 30 * 60; // 30 minutes

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const arabicMins = String(mins).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  const arabicSecs = String(secs)
    .padStart(2, '0')
    .replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  return `${arabicMins}:${arabicSecs}`;
}

export function HeartsDepletionModal({ visible, onRetry, onBackToMap }: HeartsDepletionModalProps) {
  const [countdown, setCountdown] = useState(REFILL_SECONDS);

  useEffect(() => {
    if (!visible) return;
    setCountdown(REFILL_SECONDS);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
      <Animated.View
        entering={SlideInDown.springify().damping(18).stiffness(200)}
        style={styles.modal}
      >
        {/* Hearts cracked display */}
        <View style={styles.heartsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <AppText key={i} style={styles.heartCracked}>
              💔
            </AppText>
          ))}
        </View>

        {/* Title */}
        <AppText style={styles.title}>{ar.quiz.heartsGone}</AppText>
        <AppText style={styles.subtitle}>{ar.quiz.heartsGoneDesc}</AppText>

        {/* Countdown */}
        <View style={styles.countdownContainer}>
          <AppText style={styles.countdownLabel}>{ar.quiz.heartsRefillIn}</AppText>
          <AppText style={styles.countdownTimer}>{formatTime(countdown)}</AppText>
        </View>

        {/* Actions */}
        <PrimaryButton title={ar.quiz.retryLater} onPress={onRetry} />
        <Pressable onPress={onBackToMap} style={styles.linkButton}>
          <AppText style={styles.linkText}>{ar.quiz.backToMap}</AppText>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modal: {
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.lg,
    padding: spacing.xxl,
    marginHorizontal: spacing.xxl,
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.strong,
    width: '85%',
  },
  heartsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  heartCracked: {
    fontSize: 28,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.errorRed,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.mutedGray,
    textAlign: 'center',
  },
  countdownContainer: {
    alignItems: 'center',
    gap: spacing.xs,
    marginVertical: spacing.md,
  },
  countdownLabel: {
    fontSize: 14,
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  countdownTimer: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.sunsetOrange,
    textAlign: 'center',
  },
  linkButton: {
    paddingVertical: spacing.sm,
  },
  linkText: {
    fontSize: 14,
    color: colors.mutedGray,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
