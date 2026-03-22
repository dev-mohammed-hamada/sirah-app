import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../ui/app-text';
import { PrimaryButton } from '../ui/primary-button';
import { HeartsDisplay } from '../hearts/hearts-display';
import { RefillCountdown } from '../hearts/refill-countdown';
import { ar } from '../../i18n/ar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.7;
const DISMISS_THRESHOLD = 150;

export interface StageDetailData {
  id: string;
  icon: string;
  label: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  starsEarned: number;
  maxStars: number;
  bestScore: number;
  maxScore: number;
  attempts: number;
}

interface StageDetailSheetProps {
  stage: StageDetailData | null;
  hearts: number;
  onDismiss: () => void;
  onStartStage: (stageId: string) => void;
}

export function StageDetailSheet({
  stage,
  hearts,
  onDismiss,
  onStartStage,
}: StageDetailSheetProps) {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const context = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const isVisible = stage !== null;
  const isCompleted = stage?.status === 'completed';
  const isFirstTime = stage?.attempts === 0;
  const isPerfect = stage?.starsEarned === 3;
  const heartsEmpty = hearts <= 0;

  // Open/close animation
  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(SHEET_HEIGHT, { damping: 20, stiffness: 200 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      // Only allow dragging down
      translateY.value = Math.max(0, context.value + event.translationY);
    })
    .onEnd((event) => {
      if (event.translationY > DISMISS_THRESHOLD || event.velocityY > 500) {
        translateY.value = withSpring(SHEET_HEIGHT, { damping: 20, stiffness: 200 });
        backdropOpacity.value = withTiming(0, { duration: 200 });
        runOnJS(onDismiss)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const heroParallaxStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(translateY.value, [0, SHEET_HEIGHT], [0, -30], Extrapolation.CLAMP),
      },
    ],
  }));

  if (!stage) return null;

  const handleStart = () => {
    onStartStage(stage.id);
  };

  const handleBackdropPress = () => {
    translateY.value = withSpring(SHEET_HEIGHT, { damping: 20, stiffness: 200 });
    backdropOpacity.value = withTiming(0, { duration: 200 });
    onDismiss();
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />
      </Animated.View>

      {/* Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.sheet,
            { height: SHEET_HEIGHT, paddingBottom: insets.bottom + spacing.lg },
            sheetStyle,
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Hero */}
          <Animated.View style={[styles.hero, heroParallaxStyle]}>
            <LinearGradient
              colors={[colors.desertGoldGlow20, colors.royalPurpleGlow]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <AppText style={styles.heroIcon}>{stage.icon}</AppText>
            <LinearGradient colors={['transparent', colors.warmSand]} style={styles.heroFade} />
          </Animated.View>

          {/* Content */}
          <View style={styles.content}>
            <AppText style={styles.title}>{stage.label}</AppText>
            <AppText style={styles.subtitle}>{stage.description}</AppText>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Perfect badge */}
            {isPerfect && (
              <View style={styles.perfectBadge}>
                <AppText style={styles.perfectText}>✨ {ar.home.perfectBadge}</AppText>
              </View>
            )}

            {/* Stats row — hidden for first time */}
            {!isFirstTime && isCompleted && (
              <View style={styles.statsRow}>
                <View style={styles.pill}>
                  <AppText style={styles.pillText}>
                    ⭐ {stage.starsEarned}/{stage.maxStars}
                  </AppText>
                </View>
                <View style={styles.pill}>
                  <AppText style={styles.pillText}>
                    🏆 {stage.bestScore}/{stage.maxScore}
                  </AppText>
                </View>
                <View style={styles.pill}>
                  <AppText style={styles.pillText}>🔄 {stage.attempts}</AppText>
                </View>
              </View>
            )}

            {/* Action button */}
            <View style={styles.actionArea}>
              <PrimaryButton
                title={isFirstTime ? ar.home.startStage : ar.home.retryStage}
                onPress={handleStart}
                disabled={heartsEmpty}
              />
              {!isFirstTime && (
                <AppText style={styles.bestScoreText}>
                  {ar.home.bestScore}: {stage.bestScore}/{stage.maxScore}
                </AppText>
              )}
            </View>

            {/* Hearts indicator */}
            <View style={styles.heartsRow}>
              <HeartsDisplay hearts={hearts} maxHearts={5} size={16} />
              {heartsEmpty ? (
                <RefillCountdown compact />
              ) : (
                <AppText style={styles.heartsText}>{ar.home.heartsReady}</AppText>
              )}
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayHeavy,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    backgroundColor: colors.warmSand,
    borderTopStartRadius: radius.xxl,
    borderTopEndRadius: radius.xxl,
    ...shadows.strong,
    overflow: 'hidden',
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.mutedGrayStrong,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  hero: {
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroIcon: {
    fontSize: 64,
    textAlign: 'center',
  },
  heroFade: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.mutedGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: colors.desertGold,
    opacity: 0.5,
    marginVertical: spacing.xs,
  },
  perfectBadge: {
    backgroundColor: colors.desertGoldGlowSubtle,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.desertGold,
  },
  perfectText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  pill: {
    backgroundColor: colors.starlightWhite,
    borderWidth: 1,
    borderColor: colors.desertGold,
    borderRadius: radius.full,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  actionArea: {
    width: '100%',
    marginTop: spacing.sm,
    alignItems: 'center',
    gap: 6,
  },
  bestScoreText: {
    fontSize: 12,
    color: colors.mutedGray,
    textAlign: 'center',
  },
  heartsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  heartsText: {
    fontSize: 14,
    color: colors.successGreen,
    textAlign: 'center',
  },
});
