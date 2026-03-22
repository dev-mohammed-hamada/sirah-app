import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { colors, spacing, radius, shadows, typography, fontFamily } from '../../theme';
import { AppText } from '../ui/app-text';
import { PrimaryButton } from '../ui/primary-button';
import { RefillCountdown } from './refill-countdown';
import { HeartsDisplay } from './hearts-display';
import { ar } from '../../i18n/ar';

interface HeartsGateModalProps {
  visible: boolean;
  onRetryLater: () => void;
  onBackToMap: () => void;
}

export function HeartsGateModal({ visible, onRetryLater, onBackToMap }: HeartsGateModalProps) {
  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
      <Animated.View
        entering={SlideInDown.springify().damping(18).stiffness(200)}
        style={styles.modal}
      >
        {/* Broken hearts display */}
        <HeartsDisplay hearts={0} maxHearts={5} size={28} animate={false} />

        {/* Title */}
        <AppText style={styles.title}>{ar.quiz.heartsGone}</AppText>
        <AppText style={styles.subtitle}>{ar.quiz.heartsGoneDesc}</AppText>

        {/* Countdown */}
        <RefillCountdown />

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton title={ar.quiz.retryLater} onPress={onRetryLater} />
          <Pressable onPress={onBackToMap} style={styles.linkButton}>
            <AppText style={styles.linkText}>{ar.quiz.backToMap}</AppText>
          </Pressable>
        </View>
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
    ...typography.h2,
    color: colors.errorRed,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.mutedGray,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  linkButton: {
    paddingVertical: spacing.sm,
  },
  linkText: {
    ...typography.body,
    color: colors.mutedGray,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
