import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { ProgressBar } from '../../components/stage/progress-bar';
import { ar } from '../../i18n/ar';

interface StoryPanelScreenProps {
  stageLabel: string;
  stageIcon: string;
  panelText: string;
  panelIndex: number;
  totalSteps: number;
  currentStep: number;
  hearts: number;
  maxHearts: number;
  onNext: () => void;
}

export function StoryPanelScreen({
  stageLabel,
  stageIcon,
  panelText,
  panelIndex,
  totalSteps,
  currentStep,
  hearts,
  maxHearts,
  onNext,
}: StoryPanelScreenProps) {
  const insets = useSafeAreaInsets();
  const progress = totalSteps > 0 ? currentStep / totalSteps : 0;

  return (
    <View style={styles.root}>
      {/* Top bar */}
      <View style={[styles.topArea, { paddingTop: insets.top + spacing.sm }]}>
        <ProgressBar progress={progress} />
        <View style={styles.topBar}>
          <View style={styles.heartsRow}>
            {Array.from({ length: maxHearts }).map((_, i) => (
              <AppText key={i} style={styles.heart}>
                {i < hearts ? '❤️' : '🤍'}
              </AppText>
            ))}
          </View>
          <AppText style={styles.stageLabel}>{stageLabel}</AppText>
        </View>
      </View>

      {/* Illustration */}
      <Animated.View entering={FadeInRight.duration(400)} style={styles.illustration}>
        <LinearGradient
          colors={['#2A3A5C', colors.royalPurple, '#3D2A50']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <AppText style={styles.illustIcon}>{stageIcon}</AppText>
        <LinearGradient colors={['transparent', colors.softCream]} style={styles.illustFade} />
      </Animated.View>

      {/* Text area */}
      <Animated.View entering={FadeInRight.delay(200).duration(400)} style={styles.textArea}>
        <View style={styles.narratorTag}>
          <AppText style={styles.narratorTagText}>{ar.stageFlow.narratorTag}</AppText>
        </View>
        <AppText style={styles.narrationText}>{panelText}</AppText>
      </Animated.View>

      {/* Next button */}
      <View style={[styles.buttonArea, { paddingBottom: insets.bottom + 20 }]}>
        <PrimaryButton title={ar.next} onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  topArea: {
    paddingHorizontal: spacing.lg,
    gap: 6,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  heart: {
    fontSize: 14,
    textAlign: 'center',
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.mutedGray,
    textAlign: 'center',
  },
  illustration: {
    width: '100%',
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: spacing.sm,
  },
  illustIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  illustFade: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    height: 60,
  },
  textArea: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  narratorTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.desertGold,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  narratorTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  narrationText: {
    fontSize: 18,
    color: colors.deepNightBlue,
    lineHeight: 30,
    textAlign: 'right',
  },
  buttonArea: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
});
