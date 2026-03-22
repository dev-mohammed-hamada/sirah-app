import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../ui/app-text';
import { PrimaryButton } from '../ui/primary-button';
import { HeartsDisplay } from '../hearts/hearts-display';
import { RefillCountdown } from '../hearts/refill-countdown';
import { ar } from '../../i18n/ar';

interface HeartsDepletionModalProps {
  visible: boolean;
  onRetry: () => void;
  onBackToMap: () => void;
}

export function HeartsDepletionModal({ visible, onRetry, onBackToMap }: HeartsDepletionModalProps) {
  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
      <Animated.View
        entering={SlideInDown.springify().damping(18).stiffness(200)}
        style={styles.modal}
      >
        {/* Hearts cracked display */}
        <HeartsDisplay hearts={0} maxHearts={5} size={28} animate={false} />

        {/* Title */}
        <AppText style={styles.title}>{ar.quiz.heartsGone}</AppText>
        <AppText style={styles.subtitle}>{ar.quiz.heartsGoneDesc}</AppText>

        {/* Countdown from hearts store */}
        <View style={styles.countdownContainer}>
          <RefillCountdown />
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
    borderRadius: radius.xxl,
    padding: spacing.xxl,
    marginHorizontal: spacing.xxl,
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.strong,
    width: '85%',
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
    marginVertical: spacing.md,
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
